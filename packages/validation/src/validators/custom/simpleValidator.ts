import {paramCase, sentenceCase} from 'change-case';
import keyBy from 'lodash/keyBy.js';
import {Document, isNode, Node, ParsedNode} from 'yaml';
import {AbstractPlugin} from '../../common/AbstractPlugin.js';
import {ResourceParser} from '../../common/resourceParser.js';
import {ValidationResult, RuleMetadata} from '../../common/sarif.js';
import {Incremental, PluginMetadata, Resource} from '../../common/types.js';
import {createLocations} from '../../utils/createLocations.js';
import {isDefined} from '../../utils/isDefined.js';
import {PluginInit, ReportArgs, Resource as PlainResource, RuleInit} from './config.js';

type Runtime = {
  validate: RuleInit['validate'];
};

type PlainResourceWithId = PlainResource & {_id: string};

/**
 * Validator for simple custom policies.
 */
export class SimpleCustomValidator extends AbstractPlugin {
  private _parser: ResourceParser;
  private _settings: any = {};
  private _ruleRuntime: Record<string, Runtime>;

  constructor(plugin: PluginInit, parser: ResourceParser) {
    super(toPluginMetadata(plugin), toSarifRules(plugin));
    this._parser = parser;
    this._ruleRuntime = toRuntime(plugin);
  }

  protected override async configurePlugin(rawSettings: any = {}): Promise<void> {
    this._settings = rawSettings;
  }

  async doValidate(resources: Resource[], incremental?: Incremental): Promise<ValidationResult[]> {
    const results: ValidationResult[] = [];
    const resourceMap = keyBy(resources, r => r.id);

    const clonedResources: PlainResourceWithId[] = resources.map(r =>
      JSON.parse(JSON.stringify({...r.content, _id: r.id}))
    );
    const dirtyResources = incremental
      ? clonedResources.filter(r => incremental.resourceIds.includes(r._id))
      : clonedResources;

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
            allResources: resources,
            settings: this._settings,
            params: ruleConfig.parameters,
          },
          {
            parse: res => {
              const resource = resourceMap[(res as PlainResourceWithId)._id];
              return this._parser.parse(resource).parsedDoc;
            },
            report: (res, args) => {
              const resource = resourceMap[(res as PlainResourceWithId)._id];
              const result = this.adaptToValidationResult(rule, resource, args);
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
    args: ReportArgs
  ): ValidationResult | undefined {
    const {parsedDoc} = this._parser.parse(resource);

    const path = args.path.split('.');
    const node = determineClosestNodeForPath(parsedDoc, path);
    const region = node?.range ? this._parser.parseErrorRegion(resource, node.range) : undefined;

    const locations = createLocations(resource, region);

    return this.createValidationResult(rule.id, {
      message: {
        text: args.message ?? rule.shortDescription.text,
      },
      locations,
    });
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
 * - When $container does not specify `securityContext` then it underlines whole container object.
 */
function determineClosestNodeForPath(
  resource: Document.Parsed<ParsedNode>,
  path: YamlPath,
  prefix: YamlPath = []
): Node | undefined {
  const currentPath = prefix.concat(path);

  while (currentPath.length > prefix.length) {
    const node = resource.getIn(currentPath, true);

    if (isNode(node)) {
      return node;
    }

    currentPath.pop();
  }

  const node = resource.getIn(currentPath, true);
  return isNode(node) ? node : undefined;
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
      },
      properties: {
        'security-severity': r.advanced?.severity,
      },
      relationships: r.advanced?.relationships,
    };
  });
}

function toRuntime(plugin: PluginInit): Record<string, Runtime> {
  const entries = Object.entries(plugin.rules).map(([_, rule]) => {
    return [toRuleId(plugin.id, rule.id), {validate: rule.validate}];
  });

  return Object.fromEntries(entries);
}

function toRuleId(pluginId: string, ruleId: number) {
  return `${pluginId}${ruleId.toString().padStart(3, '0')}`;
}
