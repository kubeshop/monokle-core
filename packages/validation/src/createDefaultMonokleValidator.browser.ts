import {ResourceParser} from './common/resourceParser.js';
import {SimpleCustomValidator} from './validators/custom/simpleValidator.js';
import {SchemaLoader} from './validators/kubernetes-schema/schemaLoader.js';
import {KubernetesSchemaValidator} from './validators/kubernetes-schema/validator.js';
import {RemoteWasmLoader} from './wasmLoader/RemoteWasmLoader.browser.js';
import {OpenPolicyAgentValidator} from './validators/open-policy-agent/validator.js';
import {ResourceLinksValidator} from './validators/resource-links/validator.js';
import {YamlValidator} from './validators/yaml-syntax/validator.js';
import {MetadataValidator} from './validators/metadata/validator.js';
import {MonokleValidator} from './MonokleValidator.js';
import kbpPlugin from './validators/practices/plugin.js';
import pssPlugin from './validators/pod-security-standards/plugin.js';
import {Suppressor} from './sarif/suppressions/index.js';
import {Fixer} from './sarif/fix/index.js';

export function createDefaultMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader(),
  suppressors?: Suppressor[],
  fixer?: Fixer
) {
  return new MonokleValidator({
    fixer,
    parser,
    schemaLoader,
    suppressors,
    loader: createDefaultPluginLoader(parser, schemaLoader),
  });
}

export function createDefaultPluginLoader(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader(),
  fixer?: Fixer
) {
  return async (pluginName: string) => {
    switch (pluginName) {
      case 'pod-security-standards':
        return new SimpleCustomValidator(pssPlugin, parser, fixer);
      case 'practices':
        return new SimpleCustomValidator(kbpPlugin, parser, fixer);
      case 'open-policy-agent':
        const wasmLoader = new RemoteWasmLoader();
        return new OpenPolicyAgentValidator(parser, wasmLoader);
      case 'resource-links':
        return new ResourceLinksValidator();
      case 'yaml-syntax':
        return new YamlValidator(parser);
      case 'labels':
        const labelPlugin = await import('./validators/labels/plugin.js');
        return new SimpleCustomValidator(labelPlugin.default, parser, fixer);
      case 'kubernetes-schema':
        return new KubernetesSchemaValidator(parser, schemaLoader);
      case 'metadata':
        return new MetadataValidator(parser);
      default:
        throw new Error('plugin_not_found');
    }
  };
}
