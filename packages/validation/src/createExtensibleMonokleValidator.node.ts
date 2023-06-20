import fs from 'fs';
import requireFromString from 'require-from-string';

import {ResourceParser} from './common/resourceParser.js';
import {CustomPluginLoader, MonokleValidator} from './MonokleValidator.js';
import {SimpleCustomValidator} from './validators/custom/simpleValidator.js';
import {SchemaLoader} from './validators/kubernetes-schema/schemaLoader.js';
import {KubernetesSchemaValidator} from './validators/kubernetes-schema/validator.js';
import {RemoteWasmLoader} from './wasmLoader/RemoteWasmLoader.node.js';
import {OpenPolicyAgentValidator} from './validators/open-policy-agent/validator.js';
import {ResourceLinksValidator} from './validators/resource-links/validator.js';
import {YamlValidator} from './validators/yaml-syntax/validator.js';
import {MetadataValidator} from './validators/metadata/validator.js';
import {bundlePluginCode} from './utils/loadCustomPlugin.node.js';
import kbpPlugin from './validators/practices/plugin.js';
import pssPlugin from './validators/pod-security-standards/plugin.js';
import {requireFromStringCustomPluginLoader} from './pluginLoaders/requireFromStringLoader.node.js';

/**
 * Creates a Monokle validator that can dynamically fetch custom plugins.
 */
export function createExtensibleMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader(),
  customPluginLoader: CustomPluginLoader = requireFromStringCustomPluginLoader
) {
  return new MonokleValidator(async (pluginName: string) => {
    switch (pluginName) {
      case 'pod-security-standards':
        return new SimpleCustomValidator(pssPlugin, parser);
      case 'practices':
        return new SimpleCustomValidator(kbpPlugin, parser);
      case 'labels':
        const lblPlugin = await getPlugin('./validators/labels/plugin.js');
        return new SimpleCustomValidator(lblPlugin, parser);
      case 'open-policy-agent':
        const wasmLoader = new RemoteWasmLoader();
        return new OpenPolicyAgentValidator(parser, wasmLoader);
      case 'resource-links':
        return new ResourceLinksValidator();
      case 'yaml-syntax':
        return new YamlValidator(parser);
      case 'kubernetes-schema':
        return new KubernetesSchemaValidator(parser, schemaLoader);
      case 'metadata':
        return new MetadataValidator(parser);
      default:
        return await customPluginLoader(pluginName, parser);
    }
  });
}

async function getPlugin(path: string) {
  try {
    const code = fs.readFileSync(path, {encoding: 'utf-8'});
    const bundle = await bundlePluginCode(code);
    const plugin = requireFromString(bundle, path);
    return plugin;
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'reason unknown';
    throw new Error(`plugin_not_found: ${msg}`);
  }
}
