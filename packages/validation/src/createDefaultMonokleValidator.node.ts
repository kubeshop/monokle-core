import fs from 'fs'
import requireFromString from 'require-from-string';

import { ResourceParser } from "./common/resourceParser.js";
import { SimpleCustomValidator } from "./validators/custom/simpleValidator.js";
import { SchemaLoader } from "./validators/kubernetes-schema/schemaLoader.js";
import { KubernetesSchemaValidator } from "./validators/kubernetes-schema/validator.js";
import { RemoteWasmLoader } from "./wasmLoader/RemoteWasmLoader.browser.js";
import { OpenPolicyAgentValidator } from "./validators/open-policy-agent/validator.js";
import { ResourceLinksValidator } from "./validators/resource-links/validator.js";
import { YamlValidator } from "./validators/yaml-syntax/validator.js";
import { MonokleValidator } from "./MonokleValidator.js";
import { bundlePluginCode } from './utils/loadCustomPlugin.node.js';

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
      case "open-policy-agent":
        const wasmLoader = new RemoteWasmLoader();
        return new OpenPolicyAgentValidator(parser, wasmLoader);
      case "resource-links":
        return new ResourceLinksValidator();
      case "yaml-syntax":
        return new YamlValidator(parser);
      case "labels":
         try {
            const filePath = './validators/labels/plugin.js'
            const pluginCode = fs.readFileSync(filePath, { encoding: 'utf-8' })
            const code = await bundlePluginCode(pluginCode);
            const labelPlugin = requireFromString(code, filePath);
            return new SimpleCustomValidator(labelPlugin, parser);
          } catch (err) {
            throw new Error(`plugin_not_found`);
          }
      case "kubernetes-schema":
        return new KubernetesSchemaValidator(parser, schemaLoader);
      default:
        throw new Error("plugin_not_found");
    }
  };
}