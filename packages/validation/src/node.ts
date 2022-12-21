import { ResourceParser } from "./common/resourceParser.js";
import { loadExternalPlugin, MonokleValidator } from "./MonokleValidator.js";
import { SimpleCustomValidator } from "./validators/custom/simpleValidator.js";
import { SchemaLoader } from "./validators/kubernetes-schema/schemaLoader.js";
import { KubernetesSchemaValidator } from "./validators/kubernetes-schema/validator.js";
import { RemoteWasmLoader } from "./validators/open-policy-agent/index.js";
import { OpenPolicyAgentValidator } from "./validators/open-policy-agent/validator.js";
import { ResourceLinksValidator } from "./validators/resource-links/validator.js";
import { YamlValidator } from "./validators/yaml-syntax/validator.js";
import fs from "fs";
import * as path from "path";


export function createExtensibleNodeMonokleValidator(
  parser: ResourceParser = new ResourceParser(),
  schemaLoader: SchemaLoader = new SchemaLoader()
) {
  return new MonokleValidator(async (pluginName: string) => {
      switch (pluginName) {
        case "open-policy-agent":
          const wasmLoader = new RemoteWasmLoader();
          return new OpenPolicyAgentValidator(parser, wasmLoader);
        case "resource-links":
          return new ResourceLinksValidator();
        case "yaml-syntax":
          return new YamlValidator(parser);
        case "labels":
          const labelPlugin = await import("./validators/labels/plugin.js");
          return new SimpleCustomValidator(labelPlugin.default, parser);
        case "kubernetes-schema":
          return new KubernetesSchemaValidator(parser, schemaLoader);
        default:
          try {
            return await loadExternalPlugin(pluginName, parser);
          } catch (err) {
            throw new Error(`plugin_not_found: $err`);
          }
      }
    }
  );
}
