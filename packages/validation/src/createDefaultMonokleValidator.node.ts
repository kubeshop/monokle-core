import fs from 'fs';
import requireFromString from 'require-from-string';

import {ResourceParser} from './common/resourceParser.js';
import {SimpleCustomValidator} from './validators/custom/simpleValidator.js';
import {SchemaLoader} from './validators/kubernetes-schema/schemaLoader.js';
import {KubernetesSchemaValidator} from './validators/kubernetes-schema/validator.js';
import {RemoteWasmLoader} from './wasmLoader/RemoteWasmLoader.browser.js';
import {OpenPolicyAgentValidator} from './validators/open-policy-agent/validator.js';
import {ResourceLinksValidator} from './validators/resource-links/validator.js';
import {YamlValidator} from './validators/yaml-syntax/validator.js';
import {MonokleValidator} from './MonokleValidator.js';
import {bundlePluginCode} from './utils/loadCustomPlugin.node.js';

export function createDefaultMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader()
) {
  return new MonokleValidator(createDefaultPluginLoader(parser, schemaLoader));
}

export function createDefaultPluginLoader(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader()
) {
  return async (pluginName: string) => {
    switch (pluginName) {
      case 'pod-security-standards':
        const pssPlugin = await getPlugin('./validators/pod-security-standards/plugin.js');
        return new SimpleCustomValidator(pssPlugin, parser);
      case 'practices':
        const kbpPlugin = await getPlugin('./validators/practices/plugin.js');
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
      default:
        throw new Error('plugin_not_found');
    }
  };
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
