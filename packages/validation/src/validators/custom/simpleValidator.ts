import {paramCase, sentenceCase} from 'change-case';
import keyBy from 'lodash/keyBy.js';
import set from 'lodash/set.js';
import get from 'lodash/get.js';
import unset from 'lodash/unset.js';
import {Document, Node, ParsedNode, isNode, isMap, isScalar, isPair} from 'yaml';
import {AbstractPlugin} from '../../common/AbstractPlugin.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {RuleMetadata, ValidationResult} from '../../common/sarif.js';
import {PluginMetadata, Resource, ValidateOptions} from '../../common/types.js';
import {Fixer} from '../../sarif/fix/index.js';
import {createLocations} from '../../utils/createLocations.js';
import {isDefined} from '../../utils/isDefined.js';
import {Resource as PlainResource, PluginInit, ReportArgs, RuleInit} from './config.js';
import {isContainerPrefix, isPodPrefix} from './utils.js';

type Runtime = {
  validate: RuleInit['validate'];
  fix: RuleInit['fix'];
};

type PlainResourceWithId = PlainResource & {_id: string};

/**
 * Validator for simple custom policies.
 */
export class SimpleCustomValidator extends AbstractPlugin {
  private _parser: ResourceParser;
  private _settings: any = {};
  private _ruleRuntime: Record<string, Runtime>;
  private _fixer: Fixer | undefined;

  constructor(plugin: PluginInit, parser: ResourceParser, fixer: Fixer | undefined) {
    super(toPluginMetadata(plugin), toSarifRules(plugin));
    this._parser = parser;
    this._fixer = fixer;
    this._ruleRuntime = toRuntime(plugin);
  }

  protected override async configurePlugin(rawSettings: any = {}): Promise<void> {
    this._settings = rawSettings;
  }

  async doValidate(resources: Resource[], options: ValidateOptions): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];

    const clonedResources: PlainResourceWithId[] = resources.map(r =>
      JSON.parse(JSON.stringify({...r.content, _id: r.id}))
    );
    const dirtyResources = options.incremental
      ? clonedResources.filter(r => options.incremental?.resourceIds.includes(r._id))
      : clonedResources;

    const resourceMap = keyBy(resources, r => r.id);
    const clonedResourceMap = keyBy(resources, r => r.id);

    for (const rule of this.rules) {
      const ruleConfig = this.getRuleConfig(rule.id);

      if (!ruleConfig.enabled) {
        continue;
      }

      const {validate} = this._ruleRuntime[rule.id];

      try {
        await validate(
          {
            resources: dirtyResources,
            allResources: clonedResources,
            settings: this._settings,
            params: rule.properties?.configMetadata ? ruleConfig.parameters?.configValue : undefined,
          },
          {
            parse: res => {
              const resource = resourceMap[(res as PlainResourceWithId)._id];
              return this._parser.parse(resource).parsedDoc;
            },
            report: (res, args) => {
              const resource = clonedResourceMap[(res as PlainResourceWithId)._id];
              const result = this.adaptToValidationResult(rule, resource, args, options);
              if (!result) return;
              results.push(result);
            },
            getRelated: (res: PlainResource): PlainResource[] => {
              const resource = resourceMap[(res as PlainResourceWithId)._id];

              if (!resource) return [];

              const relatedResources = (resource?.refs ?? [])
                .map(ref => (ref.target?.type === 'resource' ? ref.target.resourceId : undefined))
                .filter(isDefined)
                .map(relatedId => resourceMap[relatedId])
                .filter(isDefined);

              const result = relatedResources.map(r => {
                return JSON.parse(JSON.stringify({...r.content, _id: r.id}));
              });

              return result;
            },
          }
        );
      } catch (err) {
        if (this._settings.debug) {
          console.error('rule_failed', {rule: rule.name, error: err});
        }
      }
    }

    return results;
  }

  private adaptToValidationResult(
    rule: RuleMetadata,
    resource: Resource,
    args: ReportArgs,
    options: ValidateOptions
  ): ValidationResult | undefined {
    const {parsedDoc} = this._parser.parse(resource);

    const path = args.path.split('.');
    const node = determineClosestNodeForPath(parsedDoc, path, resource.kind);
    const region = node?.range ? this._parser.parseErrorRegion(resource, node.range) : undefined;

    const locations = createLocations(resource, region, path);

    const result = this.createValidationResult(rule.id, {
      message: {
        text: args.message ?? rule.shortDescription.text,
      },
      locations,
    });

    if (result && this._fixer) {
      const {fix} = this._ruleRuntime[rule.id];

      const fixedResource = JSON.parse(JSON.stringify(resource.content));

      const fixMetadata =
        fix?.(
          {
            resource: fixedResource,
            problem: result,
            path: args.path,
          },
          {
            get: (resource: Resource['content'], path: string) => {
              return get(resource, path.split('.'));
            },
            set: (resource: Resource['content'], path: string, value: any) => {
              set(resource, path.split('.'), value);
            },
            unset: (resource: Resource['content'], path: string) => {
              unset(resource, path.split('.'));
            },
          }
        ) ?? undefined;

      delete fixedResource['_id'];
      result.fixes = this._fixer?.createFix(resource, fixedResource, fixMetadata, this._parser);
    }

    return result;
  }
}

type YamlPath = Array<string | number>;

/**
 * Use a path hint to determine the node of the error or closest parent.
 *
 * Example:
 * - Hint: $container.securityContext.readOnlyRootFilesystem and desired value is `true`.
 * - When $container specifies `securityContext.readOnlyRootFilesystem` then it underlines the incorrect `false` value.
 * - When $container specifies `securityContext` then it underlines whole context object.
 * - When $container does not specify `securityContext` then it falls back to the container name.
 *   - Note: Container objects are quite big and otherwise the whole screen turns yellow/red.
 * - When the property does not relate to a container and name cannot be used, it falls back to the whole object.
 */
function determineClosestNodeForPath(
  resource: Document.Parsed<ParsedNode>,
  path: YamlPath,
  resourceKind: string
): Node | undefined {
  const currentPath = [...path];

  while (currentPath.length > 0) {
    const node = resource.getIn(currentPath, true);

    if (isNode(node)) {
      // Less aggressive error highlighting for missing properties
      // Pod objects now fall back to the parent's spec.
      // Container objects now fall back to the container's name.
      if (isPodPrefix(currentPath, resourceKind)) {
        const podPath = currentPath.slice(0, -1);
        const parent = resource.getIn(podPath, true);
        const spec = isMap(parent)
          ? parent.items.find(i => (isScalar(i.key) ? i.key.value === 'spec' : false))
          : undefined;
        if (isPair(spec) && isNode(spec.key)) {
          return spec.key;
        }
      }
      if (isContainerPrefix(currentPath)) {
        const nameNode = resource.getIn([...currentPath, 'name'], true);
        if (isNode(nameNode)) {
          return nameNode;
        }
      }

      return node;
    }

    currentPath.pop();
  }

  return undefined;
}

function toPluginMetadata(plugin: PluginInit): PluginMetadata {
  return {
    id: plugin.id,
    name: plugin.name,
    description: plugin.description,
    icon: plugin.icon,
    learnMoreUrl: plugin.learnMoreUrl,
    displayName: plugin.displayName ?? sentenceCase(plugin.name),
  };
}

function toSarifRules(plugin: PluginInit): RuleMetadata[] {
  return Object.entries(plugin.rules).map(([name, r]) => {
    return {
      id: toRuleId(plugin.id, r.id),
      name: paramCase(name),
      shortDescription: {
        text: r.description,
      },
      fullDescription: r.fullDescription
        ? {
            text: r.fullDescription,
          }
        : undefined,
      help: {
        text: r.help ?? 'No help available.',
      },
      defaultConfiguration: {
        enabled: r.advanced?.enabled,
        level: r.advanced?.level,
        parameters: {
          configValue: r.advanced?.configMetadata?.defaultValue,
        },
      },
      properties: {
        'security-severity': r.advanced?.severity,
        configMetadata: r.advanced?.configMetadata
          ? {
              type: r.advanced.configMetadata.type,
              name: r.advanced.configMetadata.name,
            }
          : undefined,
      },
      relationships: r.advanced?.relationships,
    };
  });
}

function toRuntime(plugin: PluginInit): Record<string, Runtime> {
  const entries = Object.entries(plugin.rules).map(([_, rule]) => {
    return [toRuleId(plugin.id, rule.id), {validate: rule.validate, fix: rule.fix}];
  });

  return Object.fromEntries(entries);
}

function toRuleId(pluginId: string, ruleId: number) {
  return `${pluginId}${ruleId.toString().padStart(3, '0')}`;
}
