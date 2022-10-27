import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import { JsonObject } from "type-fest";
import { Document, isCollection, ParsedNode } from "yaml";
import { z } from "zod";
import { AbstractPlugin } from "../../common/AbstractPlugin.js";
import { ResourceParser } from "../../common/resourceParser.js";
import { ValidationResult } from "../../common/sarif.js";
import { Incremental, Resource } from "../../common/types.js";
import { createLocations } from "../../utils/createLocations.js";
import { isDefined } from "../../utils/isDefined.js";
import { KNOWN_RESOURCE_KINDS } from "../../utils/knownResourceKinds.js";
import {
  extractSchema,
  findDefaultVersion,
} from "./customResourceDefinitions.js";
import { getResourceSchemaPrefix } from "./resourcePrefixMap.js";
import { KUBERNETES_SCHEMA_RULES } from "./rules.js";
import { SchemaLoader } from "./schemaLoader.js";

type Settings = z.infer<typeof Settings>;
const Settings = z.object({
  schemaVersion: z.string().default("1.24.2"),
});

export class KubernetesSchemaValidator extends AbstractPlugin {
  private _settings!: Settings;
  private ajv!: Ajv;

  constructor(
    private resourceParser: ResourceParser,
    private schemaLoader: SchemaLoader
  ) {
    super(
      {
        id: "K8S",
        name: "kubernetes-schema",
        displayName: "Kubernetes Schema",
        description:
          "Validates that your manifests are well-defined in the schema for their resource kind/version.",
        icon: "k8s-schema",
        learnMoreUrl: "https://kubeshop.github.io/monokle/resource-validation/",
      },
      KUBERNETES_SCHEMA_RULES
    );
  }

  protected override async configurePlugin(
    rawSettings: JsonObject = {}
  ): Promise<void> {
    this._settings = Settings.parse(rawSettings["kubernetes-schema"] ?? {});
    const version = this._settings.schemaVersion;
    const schema = await this.schemaLoader.getFullSchema(version);

    if (!schema) {
      return;
    }

    this.ajv = new Ajv({
      validateSchema: false,
      logger: false,
      verbose: true,
      allErrors: true,
      schemas: [schema.schema],
      code: { esm: true },
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
    const version = this._settings.schemaVersion;
    if (!version) {
      return;
    }
    const key = `${version}-${kind}`;

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
    const results = errors
      .map((err) => this.adaptToValidationResult(resource, err))
      .filter(isDefined);

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
    const version = this._settings.schemaVersion;
    if (!prefix && version) {
      const key = `${version}-${kind}`;
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
      err.instancePath.substring(1).split("/")
    );

    const region = this.resourceParser.parseErrorRegion(
      resource,
      valueNode.range
    );

    const locations = createLocations(resource, region);

    return this.createValidationResult("K8S001", {
      message: {
        text: err.message ? `Value at ${err.instancePath} ${err.message}` : "",
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
