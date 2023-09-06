import {ResourceParser} from './common/resourceParser.js';
import {CustomPluginLoader, MonokleValidator} from './MonokleValidator.js';
import {DEV_MODE_TOKEN} from './validators/custom/constants.js';
import {DevCustomValidator} from './validators/custom/devValidator.js';
import {SimpleCustomValidator} from './validators/custom/simpleValidator.js';
import {SchemaLoader} from './validators/kubernetes-schema/schemaLoader.js';
import {KubernetesSchemaValidator} from './validators/kubernetes-schema/validator.js';
import {RemoteWasmLoader} from './wasmLoader/RemoteWasmLoader.browser.js';
import {OpenPolicyAgentValidator} from './validators/open-policy-agent/validator.js';
import {ResourceLinksValidator} from './validators/resource-links/validator.js';
import {YamlValidator} from './validators/yaml-syntax/validator.js';
import {MetadataValidator} from './validators/metadata/validator.js';
import kbpPlugin from './validators/practices/plugin.js';
import pssPlugin from './validators/pod-security-standards/plugin.js';
import {dynamicImportCustomPluginLoader} from './pluginLoaders/dynamicImportLoader.js';
import {CUSTOM_PLUGINS_URL_BASE} from './constants.js';
import {Suppressor} from './sarif/suppressions/types.js';
import {Fixer} from './sarif/fix/index.js';

/**
 * Creates a Monokle validator that can dynamically fetch custom plugins.
 */
export function createExtensibleMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader(),
  suppressors: Suppressor[] | undefined = undefined,
  fixer?: Fixer,
  customPluginLoader: CustomPluginLoader = dynamicImportCustomPluginLoader
) {
  return new MonokleValidator({
    suppressors,
    fixer,
    parser,
    schemaLoader,
    loader: async (pluginName: string, settings?: Record<string, any>) => {
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
        case DEV_MODE_TOKEN:
          return new DevCustomValidator(parser, fixer);
        default:
          try {
            if (settings?.pluginUrl) {
              const customPlugin = await import(/* @vite-ignore */ settings.pluginUrl);
              return new SimpleCustomValidator(customPlugin.default, parser, fixer);
            }
            if (settings?.ref) {
              const customPlugin = await import(
                /* @vite-ignore */ `${CUSTOM_PLUGINS_URL_BASE}/${settings.ref}/plugin.js`
              );
              return new SimpleCustomValidator(customPlugin.default, parser, fixer);
            }
            const validator = await customPluginLoader(pluginName, parser, fixer);
            return validator;
          } catch (err) {
            throw new Error(
              err instanceof Error ? `plugin_not_found: ${err.message}` : `plugin_not_found: ${String(err)}`
            );
          }
      }
    },
  });
}
