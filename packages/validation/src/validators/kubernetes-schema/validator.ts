import Ajv, { ErrorObject, ValidateFunction } from "ajv";
import { JsonObject } from "type-fest";
import { Document, isCollection, ParsedNode } from "yaml";
import { z } from "zod";
import { AbstractPlugin } from "../../common/AbstractPlugin.js";
import { ResourceParser } from "../../common/resourceParser.js";
import { ValidationResult } from "../../common/sarif.js";
import { CustomSchema, Incremental, Resource } from "../../common/types.js";
import { createLocations } from "../../utils/createLocations.js";
import { isDefined } from "../../utils/isDefined.js";
import { KNOWN_RESOURCE_KINDS } from "../../utils/knownResourceKinds.js";
import { getResourceSchemaPrefix } from "./resourcePrefixMap.js";
import { KUBERNETES_SCHEMA_RULES } from "./rules.js";
import { SchemaLoader } from "./schemaLoader.js";

type Settings = z.infer<typeof Settings>;
const Settings = z.object({
  schemaVersion: z.string().default("1.24.2"),
});

export class KubernetesSchemaValidator extends AbstractPlugin {
  private _settings!: Settings;
  private ajv!: Ajv.Ajv;

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

  override registerCustomSchema({
    kind,
    apiVersion,
    schema,
  }: CustomSchema): void | Promise<void> {
    const key = `${apiVersion}-${kind}`;

    if (this.schemaLoader.hasSchema(key)) {
      return;
    }

    this.schemaLoader.registerCustomSchema(key, schema);
    this.ajv.addSchema(schema, `#/definitions/${key}`);
  }

  unregisterCustomSchema(
    schema: Omit<CustomSchema, "schema">
  ): void | Promise<void> {
    const key = `${schema.apiVersion}-${schema.kind}`;
    this.schemaLoader.unregisterCustomSchema(key);
    this.ajv.removeSchema(`#/definitions/${key}`);
  }

  private async validateResource(
    resource: Resource
  ): Promise<ValidationResult[]> {
    const validate = await this.getResourceValidator(resource);

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
    resource: Resource
  ): Promise<ValidateFunction | undefined> {
    const prefix = getResourceSchemaPrefix(resource.kind);
    const key = prefix
      ? `${prefix}.${resource.kind}` // known resource
      : `${resource.apiVersion}-${resource.kind}`; // custom resource

    const keyRef = `#/definitions/${key}`;
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
