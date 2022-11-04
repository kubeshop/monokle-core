import { ResourceParser } from "./common/resourceParser.js";
import { MonokleValidator } from "./MonokleValidator.js";
import { SimpleCustomValidator } from "./validators/custom/simpleValidator.js";
import { SchemaLoader } from "./validators/kubernetes-schema/schemaLoader.js";
import { KubernetesSchemaValidator } from "./validators/kubernetes-schema/validator.js";
import { RemoteWasmLoader } from "./validators/open-policy-agent/index.js";
import { OpenPolicyAgentValidator } from "./validators/open-policy-agent/validator.js";
import { ResourceLinksValidator } from "./validators/resource-links/validator.js";
import { YamlValidator } from "./validators/yaml-syntax/validator.js";

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
          const customPlugin = await importWithDataUrl(
            "http://localhost:4111/plugin.js"
          );
          return new SimpleCustomValidator(customPlugin.default, parser);
        } catch (err) {
          throw new Error("plugin_not_found");
        }
    }
  });
}

async function importWithDataUrl(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }
  const source = await response.text();
  const buff = Buffer.from(source);
  const encodedSource = buff.toString("base64");
  const dataUrl = `data:text/javascript;base64,${encodedSource}`;

  const module = await import(/* @vite-ignore */ dataUrl);
  return module;
}
