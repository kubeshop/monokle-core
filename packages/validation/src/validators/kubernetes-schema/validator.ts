import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import { Document, isCollection, ParsedNode } from "yaml";
import { AbstractValidator } from "../../common/AbstractValidator.js";
import { ResourceParser } from "../../common/resourceParser.js";
import { ValidationResult, ValidationRule } from "../../common/sarif.js";
import { Incremental, Resource, ValidatorConfig } from "../../common/types.js";
import { createLocations } from "../../utils/createLocations.js";
import { KNOWN_RESOURCE_KINDS } from "../../utils/knownResourceKinds.js";
import {
  findDefaultVersion,
  extractSchema,
} from "./customResourceDefinitions.js";
import { getResourceSchemaPrefix } from "./resourcePrefixMap.js";
import { KUBERNETES_SCHEMA_RULES } from "./rules.js";
import { SchemaLoader } from "./schemaLoader.js";

export type KubernetesSchemaConfig = ValidatorConfig<"kubernetes-schema"> & {
  schemaVersion: string;
};

export class KubernetesSchemaValidator extends AbstractValidator<KubernetesSchemaConfig> {
  private ajv!: Ajv.Ajv;

  constructor(
    private resourceParser: ResourceParser,
    private schemaLoader: SchemaLoader
  ) {
    super("kubernetes-schema", KUBERNETES_SCHEMA_RULES);
  }

  async doLoad(config: KubernetesSchemaConfig): Promise<void> {
    const version = config.schemaVersion;
    const schema = await this.schemaLoader.getFullSchema(version);

    if (!schema) {
      return;
    }

    this.ajv = new Ajv({
      unknownFormats: "ignore",
      validateSchema: false,
      logger: false,
      jsonPointers: true,
      verbose: true,
      allErrors: true,
      schemas: [schema.schema],
    });

    this.warmup();
  }

  /**
   * Warm-up AJV's internal instance cache.
   *
   * @see https://ajv.js.org/guide/managing-schemas.html#using-ajv-instance-cache
   */
  private warmup() {
    KNOWN_RESOURCE_KINDS.forEach((kind) => this.getResourceValidator(kind));
  }

  async doValidate(
    resources: Resource[],
    incremental?: Incremental
  ): Promise<ValidationResult[]> {
    this.preprocessCustomResourceDefinitions(resources);

    const results: ValidationResult[] = [];
    const dirtyResources = incremental
      ? resources.filter((r) => incremental.resourceIds.includes(r.id))
      : resources;

    for (const resource of dirtyResources) {
      const resourceErrors = await this.validateResource(resource);
      results.push(...resourceErrors);
    }

    return results;
  }

  private preprocessCustomResourceDefinitions(resources: Resource[]) {
    const crds = resources.filter((r) => r.kind === "CustomResourceDefinition");

    for (const crd of crds) {
      const spec = crd.content.spec;
      const kind = spec?.names?.kind;
      const kindVersion = findDefaultVersion(crd.content);

      if (!kindVersion) {
        continue;
      }

      const schema = extractSchema(crd.content, kindVersion);

      if (!schema) {
        continue;
      }

      this.addCustomSchema(kind, schema);
    }
  }

  private addCustomSchema(kind: string, schema: any) {
    if (!this.config?.schemaVersion) {
      return;
    }
    const key = `${this.config.schemaVersion}-${kind}`;

    if (this.schemaLoader.hasSchema(key)) {
      return;
    }

    this.schemaLoader.addCustomSchema(key, schema);
    this.ajv.addSchema(schema, `#/definitions/${key}`);
  }

  private async validateResource(
    resource: Resource
  ): Promise<ValidationResult[]> {
    const validate = await this.getResourceValidator(resource.kind);

    if (!validate) {
      return [];
    }

    validate(resource.content);

    const errors = validate.errors ?? [];
    const results = errors.map((err) => {
      return this.adaptToValidationResult(resource, err);
    });

    return results;
  }

  /**
   * Get a validate function by deriving the fragment from the resource kind.
   *
   * @see https://stackoverflow.com/a/63909042
   */
  private async getResourceValidator(
    kind: string
  ): Promise<ValidateFunction | undefined> {
    const prefix = getResourceSchemaPrefix(kind);

    // could be custom resource
    if (!prefix && this.config?.schemaVersion) {
      const key = `${this.config.schemaVersion}-${kind}`;
      const validate = this.ajv.getSchema(`#/definitions/${key}`);
      return validate;
    }

    if (!prefix) {
      return undefined;
    }

    const keyRef = `#/definitions/${prefix}.${kind}`;
    const validate = this.ajv.getSchema(keyRef);

    return validate;
  }

  private adaptToValidationResult(resource: Resource, err: ErrorObject) {
    const { parsedDoc } = this.resourceParser.parse(resource);

    const valueNode = findJsonPointerNode(
      parsedDoc,
      err.dataPath.substring(1).split("/")
    );

    const region = this.resourceParser.parseErrorRegion(
      resource,
      valueNode.range
    );

    const locations = createLocations(resource, region);

    return this.createValidationResult("K8S001", {
      message: {
        text: err.message ? `Value at ${err.dataPath} ${err.message}` : "",
      },
      locations,
    });
  }
}

function findJsonPointerNode(
  valuesDoc: Document.Parsed<ParsedNode>,
  path: string[]
) {
  if (!valuesDoc.contents) {
    return undefined;
  }

  let valueNode: any = valuesDoc.contents;

  for (let c = 0; valueNode && c < path.length; c += 1) {
    let node = path[c];
    if (isCollection(valueNode)) {
      const nextNode = valueNode.get(node, true);
      if (nextNode) {
        valueNode = nextNode;
      } else {
        return valueNode;
      }
    } else break;
  }

  return valueNode;
}
