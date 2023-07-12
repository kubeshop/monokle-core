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

/**
 * Creates a Monokle validator that can dynamically fetch custom plugins.
 */
export function createExtensibleMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader(),
  customPluginLoader: CustomPluginLoader = dynamicImportCustomPluginLoader
) {
  return new MonokleValidator(async (pluginName: string, settings?: Record<string, any>) => {
    switch (pluginName) {
      case 'pod-security-standards':
        return new SimpleCustomValidator(pssPlugin, parser);
      case 'practices':
        return new SimpleCustomValidator(kbpPlugin, parser);
      case 'open-policy-agent':
        const wasmLoader = new RemoteWasmLoader();
        return new OpenPolicyAgentValidator(parser, wasmLoader);
      case 'resource-links':
        return new ResourceLinksValidator();
      case 'yaml-syntax':
        return new YamlValidator(parser);
      case 'labels':
        const labelPlugin = await import('./validators/labels/plugin.js');
        return new SimpleCustomValidator(labelPlugin.default, parser);
      case 'kubernetes-schema':
        return new KubernetesSchemaValidator(parser, schemaLoader);
      case 'metadata':
        return new MetadataValidator(parser);
      case DEV_MODE_TOKEN:
        return new DevCustomValidator(parser);
      default:
        try {
          if (settings?.pluginUrl) {
            const customPlugin = await import(/* @vite-ignore */ settings.pluginUrl);
            return new SimpleCustomValidator(customPlugin.default, parser);
          }
          if (settings?.ref) {
            const customPlugin = await import(
              /* @vite-ignore */ `${CUSTOM_PLUGINS_URL_BASE}/${settings.ref}/plugin.js`
            );
            return new SimpleCustomValidator(customPlugin.default, parser);
          }
          const validator = await customPluginLoader(pluginName, parser);
          return validator;
        } catch (err) {
          throw new Error(
            err instanceof Error ? `plugin_not_found: ${err.message}` : `plugin_not_found: ${String(err)}`
          );
        }
    }
  });
}
