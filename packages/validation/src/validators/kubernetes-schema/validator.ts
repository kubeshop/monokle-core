import Ajv, {ValidateFunction} from 'ajv';
import {z} from 'zod';
import {AbstractPlugin} from '../../common/AbstractPlugin.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {ValidationResult} from '../../common/sarif.js';
import {CustomSchema, Incremental, Resource, ValidateOptions} from '../../common/types.js';
import {createLocations} from '../../utils/createLocations.js';
import {isDefined} from '../../utils/isDefined.js';
import {KNOWN_RESOURCE_KINDS} from '../../utils/knownResourceKinds.js';
import {matchResourceSchema} from './resourcePrefixMap.js';
import {KUBERNETES_SCHEMA_RULES} from './rules.js';
import {SchemaLoader} from './schemaLoader.js';
import {validate} from './deprecation/validator.js';
import {findJsonPointerNode} from '../../utils/findJsonPointerNode.js';

type Settings = z.infer<typeof Settings>;
const Settings = z.object({
  schemaVersion: z.string().default('1.24.2'),
});

export class KubernetesSchemaValidator extends AbstractPlugin {
  private _settings!: Settings;
  private ajv!: Ajv.Ajv;
  private definitions!: string[];

  constructor(private resourceParser: ResourceParser, private schemaLoader: SchemaLoader) {
    super(
      {
        id: 'K8S',
        name: 'kubernetes-schema',
        displayName: 'Kubernetes Schema',
        description: 'Validates that your manifests are well-defined in the schema for their resource kind/version.',
        icon: 'k8s-schema',
        learnMoreUrl: 'https://kubeshop.github.io/monokle/resource-validation/',
      },
      KUBERNETES_SCHEMA_RULES
    );
  }

  protected override async configurePlugin(rawSettings: any = {}): Promise<void> {
    this._settings = Settings.parse(rawSettings['kubernetes-schema'] ?? {});
    const version = this._settings.schemaVersion;
    const schema = await this.schemaLoader.getFullSchema(version);

    if (!schema) {
      return;
    }

    this.definitions = Object.keys(schema.schema.definitions);

    this.ajv = new Ajv({
      unknownFormats: 'ignore',
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
    KNOWN_RESOURCE_KINDS.forEach(kind => this.getResourceValidator(kind));
  }

  async doValidate(resources: Resource[], {incremental}: ValidateOptions): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    const dirtyResources = incremental ? resources.filter(r => incremental.resourceIds.includes(r.id)) : resources;

    for (const resource of dirtyResources) {
      // K8S001
      const resourceErrors = await this.validateResource(resource);
      resourceErrors !== undefined && results.push(...resourceErrors);

      // K8S002 and K8S003
      const deprecationError = validate(resource, this._settings.schemaVersion);
      if (deprecationError) {
        const ruleId = deprecationError.type === 'removal' ? 'K8S003' : 'K8S002';
        const asValidationError = this.adaptToValidationResult(
          resource,
          [deprecationError.path],
          ruleId,
          deprecationError.message
        );
        isDefined(asValidationError) && results.push(asValidationError);
      }

      // K8S004
      const strictError = await this.validateStrictMode(resource, Boolean(deprecationError));
      if (strictError) {
        results.push(strictError);
      }
    }

    return results;
  }

  /**
   * Strict mode ensures that the Kubernetes schema got validated.
   * This prevents surprises when you apply it to the Kubernetes API server.
   *
   * Strict mode might get violated due to typo's in apiVersion/kind or missing schemas for CRDs.
   * Deprecated schemas are taken into account, as those are not _missing_ but _removed_ schemas.
   */
  private async validateStrictMode(resource: Resource, deprecated: boolean): Promise<ValidationResult | undefined> {
    const validate = await this.getResourceValidator(resource);
    const hasSchema = Boolean(validate);

    if (hasSchema || deprecated) {
      return;
    }

    return this.adaptToValidationResult(
      resource,
      ['apiVersion'],
      'K8S004',
      `The schema for ${resource.apiVersion}/${resource.kind} is not found and cannot be checked.`
    );
  }

  override registerCustomSchema({kind, apiVersion, schema}: CustomSchema): void | Promise<void> {
    const key = `${apiVersion}-${kind}`;

    if (this.schemaLoader.hasSchema(key)) {
      return;
    }

    this.schemaLoader.registerCustomSchema(key, schema);
    this.ajv.addSchema(schema, `#/definitions/${key}`);
  }

  unregisterCustomSchema(schema: Omit<CustomSchema, 'schema'>): void | Promise<void> {
    const key = `${schema.apiVersion}-${schema.kind}`;
    this.schemaLoader.unregisterCustomSchema(key);
    this.ajv.removeSchema(`#/definitions/${key}`);
  }

  private async validateResource(resource: Resource): Promise<ValidationResult[] | undefined> {
    const validate = await this.getResourceValidator(resource);

    if (!validate) {
      return undefined;
    }

    if (!resource.content) {
      // This happens when the YAML has invalid syntax and the parser fails.
      return undefined;
    }

    validate(resource.content);

    const errors = validate.errors ?? [];
    const results = errors
      .map(err =>
        this.adaptToValidationResult(
          resource,
          err.dataPath.substring(1).split('/'),
          'K8S001',
          err.message ? `Value at ${err.dataPath} ${err.message}` : ''
        )
      )
      .filter(isDefined);

    return results;
  }

  /**
   * Get a validate function by deriving the fragment from the resource kind.
   *
   * @see https://stackoverflow.com/a/63909042
   */
  private async getResourceValidator(
    resourceOrResourceKind: Resource | Resource['kind']
  ): Promise<ValidateFunction | undefined> {
    const apiVersion = (typeof resourceOrResourceKind === 'string' ? '' : resourceOrResourceKind.apiVersion) ?? '';
    const kind = typeof resourceOrResourceKind === 'string' ? resourceOrResourceKind : resourceOrResourceKind.kind;
    const key =
      matchResourceSchema(kind, apiVersion, this.definitions || []) ??
      `${(resourceOrResourceKind as Resource).apiVersion}-${kind}`;
    const keyRef = `#/definitions/${key}`;

    try {
      const validate = this.ajv.getSchema(keyRef);
      return validate;
    } catch (err) {
      return undefined;
    }
  }

  private adaptToValidationResult(resource: Resource, path: string[], ruleId: string, errText: string) {
    const {parsedDoc} = this.resourceParser.parse(resource);

    const valueNode = findJsonPointerNode(parsedDoc, path);

    const region = this.resourceParser.parseErrorRegion(resource, valueNode.range);

    const locations = createLocations(resource, region);

    return this.createValidationResult(ruleId, {
      message: {
        text: errText,
      },
      locations,
    });
  }
}
