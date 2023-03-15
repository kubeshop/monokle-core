import { ResourceParser } from "./common/resourceParser.js";
import { MonokleValidator } from "./MonokleValidator.js";
import { DEV_MODE_TOKEN } from "./validators/custom/constants.js";
import { DevCustomValidator } from "./validators/custom/devValidator.js";
import { SimpleCustomValidator } from "./validators/custom/simpleValidator.js";
import { SchemaLoader } from "./validators/kubernetes-schema/schemaLoader.js";
import { KubernetesSchemaValidator } from "./validators/kubernetes-schema/validator.js";
import { RemoteWasmLoader } from "./wasmLoader/RemoteWasmLoader.browser.js";
import { OpenPolicyAgentValidator } from "./validators/open-policy-agent/validator.js";
import { ResourceLinksValidator } from "./validators/resource-links/validator.js";
import { YamlValidator } from "./validators/yaml-syntax/validator.js";

/**
 * Creates a Monokle validator that can dynamically fetch custom plugins.
 */
export function createExtensibleMonokleValidator(
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
      case DEV_MODE_TOKEN:
        return new DevCustomValidator(parser);
      default:
        try {
          const url = `https://plugins.monokle.com/validation/${pluginName}/latest.js`;
          const customPlugin = await import(/* @vite-ignore */ url);
          return new SimpleCustomValidator(customPlugin.default, parser);
        } catch (err) {
          throw new Error(
            err instanceof Error
              ? `plugin_not_found: ${err.message}`
              : `plugin_not_found: ${String(err)}`
          );
        }
    }
  });
}
