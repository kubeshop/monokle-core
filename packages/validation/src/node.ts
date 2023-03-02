
import fs from "fs";
import path from "path";
import fetch from 'node-fetch';
import requireFromString from 'require-from-string';
import virtual from '@rollup/plugin-virtual';
import { rollup } from 'rollup';

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
            const customPlugin = await loadCustomPlugin(pluginName)
            return new SimpleCustomValidator(customPlugin, parser);
          } catch (err) {
            throw new Error(`plugin_not_found: $err`);
          }
      }
    }
  );
}


async function bundlePluginCode(code:string) {
  const bundle = await rollup({
    input: 'pluginCode',
    plugins: [
      virtual({
        pluginCode: code,
      }) as any,
    ],
  });
  const { output } = await bundle.generate({ format: 'commonjs' });
  await bundle.close();
  return output[0].code;
}

async function loadCustomPlugin(pluginName: string) {
  const filePath = path.join(
    process.cwd(),
    '.monokle-plugins',
    `${pluginName}-plugin.js`,
  );

  const pluginCode = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, { encoding: 'utf-8' })
    : await (async () => {
        const url = `https://plugins.monokle.com/validation/${pluginName}/latest.js`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching ${url}: ${response.statusText}`);
        }
        return response.text();
      })();

  const code = await bundlePluginCode(pluginCode);
  const customPlugin = requireFromString(code, filePath);
  return customPlugin
}
