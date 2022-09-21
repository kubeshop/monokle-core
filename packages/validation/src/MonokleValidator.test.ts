import { it, expect } from "vitest";
import { ResourceParser } from "./common/resourceParser.js";
import { Resource } from "./common/types.js";
import { MonokleValidator } from "./MonokleValidator.js";
import { LabelsValidator } from "./validators/labels/validator.js";
import { OpenPolicyAgentValidator } from "./validators/open-policy-agent/validator.js";
import { FileWasmLoader } from "./validators/open-policy-agent/wasmLoader/FileWasmLoader.js";
import path from "path";
import { YamlValidator } from "./validators/yaml-syntax/validator.js";
import { KubernetesSchemaValidator } from "./validators/kubernetes-schema/validator.js";
import { SchemaLoader } from "./validators/kubernetes-schema/schemaLoader.js";

// Usage note: This library relies on fetch being on global scope!
import "isomorphic-fetch";

it("should be flexible to configure", async () => {
  const customParser = new ResourceParser();
  const labelsValidator = new LabelsValidator(customParser);
  const yamlValidator = new YamlValidator(customParser);

  const wasmLoader = new FileWasmLoader();
  const opaValidator = new OpenPolicyAgentValidator(customParser, wasmLoader);

  const schemaLoader = new SchemaLoader();
  const schemaValidator = new KubernetesSchemaValidator(
    customParser,
    schemaLoader
  );

  const validator = new MonokleValidator(
    [labelsValidator, yamlValidator, schemaValidator, opaValidator],
    {
      debug: true,
    }
  );

  await validator.configure([
    {
      tool: "labels",
      enabled: true,
    },
    {
      tool: "yaml-syntax",
      enabled: true,
    },
    {
      tool: "kubernetes-schema",
      enabled: true,
      schemaVersion: "1.24.2",
    },
    {
      tool: "open-policy-agent",
      enabled: true,
      plugin: {
        id: "trivy",
        enabled: true,
        wasmSrc: path.join(__dirname, "./assets/policies/trivy.wasm"),
      },
    },
  ]);

  const response = await validator.validate([BAD_RESOURCE]);
  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot("13");
});

const BAD_RESOURCE: Resource = {
  fileId: "vanilla-panda-blog/deployment.yaml",
  filePath: "vanilla-panda-blog/deployment.yaml",
  text: "apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: panda-blog\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: panda-blog\n  template:\n    metadata:\n      labels:\n        app: panda-blog\n    spec:\n      containers:\n        - name: panda-blog\n          image: panda-blog:latest\n          ports:\n            - name: 20\n              containerPort: 8080\n",
  name: "panda-blog",
  id: "31fc266e-be6e-527a-8292-469fe956c0d6",
  apiVersion: "apps/v1",
  kind: "Deployment",
  content: {
    apiVersion: "apps/v1",
    kind: "Deployment",
    metadata: {
      name: "panda-blog",
    },
    spec: {
      replicas: 1,
      selector: {
        matchLabels: {
          app: "panda-blog",
        },
      },
      template: {
        metadata: {
          labels: {
            app: "panda-blog",
          },
        },
        spec: {
          containers: [
            {
              name: "panda-blog",
              image: "panda-blog:latest",
              ports: [
                {
                  name: 20, // kubernetes-schema error
                  containerPort: 8080,
                },
              ],
            },
          ],
        },
      },
    },
  },
  // refs: [
  //   {
  //     type: 'outgoing',
  //     name: 'panda-blog',
  //     position: {
  //       line: 11,
  //       column: 12,
  //       length: 10
  //     },
  //     target: {
  //       type: 'resource',
  //       resourceId: '31fc266e-be6e-527a-8292-469fe956c0d6',
  //       resourceKind: 'Deployment',
  //       isOptional: false
  //     }
  //   },
  //   {
  //     type: 'incoming',
  //     name: 'panda-blog',
  //     position: {
  //       line: 15,
  //       column: 14,
  //       length: 10
  //     },
  //     target: {
  //       type: 'resource',
  //       resourceId: '31fc266e-be6e-527a-8292-469fe956c0d6',
  //       resourceKind: 'Deployment',
  //       isOptional: false
  //     }
  //   },
  //   {
  //     type: 'outgoing',
  //     name: 'panda-blog',
  //     position: {
  //       line: 19,
  //       column: 18,
  //       length: 17
  //     },
  //     target: {
  //       type: 'image',
  //       tag: 'latest'
  //     }
  //   },
  //   {
  //     type: 'incoming',
  //     name: 'panda-blog',
  //     position: {
  //       line: 15,
  //       column: 14,
  //       length: 10
  //     },
  //     target: {
  //       type: 'resource',
  //       resourceId: '047aedde-e54d-51fc-9ae7-860ea5c581bc',
  //       resourceKind: 'Service',
  //       isOptional: false
  //     }
  //   }
  // ]
};
