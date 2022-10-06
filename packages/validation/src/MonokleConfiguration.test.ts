import { JsonObject } from "type-fest";
import { expect, it } from "vitest";
import { ResourceParser } from "./common/resourceParser.js";
import { Resource } from "./common/types.js";
import { adaptConfig, createRuleMap } from "./config/adapt.js";
import { parseConfig } from "./config/parse.js";
import { MonokleValidator } from "./MonokleValidator.js";
import { processRefs } from "./references/process.js";
import { SchemaLoader } from "./validators/kubernetes-schema/schemaLoader.js";
import { KubernetesSchemaValidator } from "./validators/kubernetes-schema/validator.js";
import { LabelsValidator } from "./validators/labels/validator.js";
import { RemoteWasmLoader } from "./validators/open-policy-agent/index.js";
import { OpenPolicyAgentValidator } from "./validators/open-policy-agent/validator.js";
import { ResourceLinksValidator } from "./validators/resource-links/validator.js";
import { YamlValidator } from "./validators/yaml-syntax/validator.js";

// Usage note: This library relies on fetch being on global scope!
import "isomorphic-fetch";

it("should work with monokle.validation.yaml", async () => {
  // Step 1: Create the validator
  const parser = new ResourceParser();
  const validator = createValidator(parser);

  // Step 2: Configure validator with monokle.validation.yaml
  const configJson: JsonObject = {
    plugins: {
      "open-policy-agent": true,
      "yaml-syntax": true,
    },
    rules: {
      KSV005: "warn",
      "open-policy-agent/no-latest-image": "warn",
    },
  };

  const config = parseConfig(configJson);
  const ruleMap = createRuleMap(validator);
  const configuration = adaptConfig(config, ruleMap);
  console.log("CONFIG", configuration);
  await validator.configure(configuration);

  // Step 3: Validate resources
  const resources = [BAD_DEPLOYMENT, BAD_SERVICE];
  processRefs(resources, parser);
  const response = await validator.validate(resources);

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot("10");
});

function createValidator(parser: ResourceParser) {
  const labelsValidator = new LabelsValidator(parser);
  const yamlValidator = new YamlValidator(parser);

  const wasmLoader = new RemoteWasmLoader();
  const opaValidator = new OpenPolicyAgentValidator(parser, wasmLoader);

  const schemaLoader = new SchemaLoader();
  const schemaValidator = new KubernetesSchemaValidator(parser, schemaLoader);

  const resourceLinksValidator = new ResourceLinksValidator();

  const validator = new MonokleValidator(
    [
      labelsValidator,
      yamlValidator,
      schemaValidator,
      opaValidator,
      resourceLinksValidator,
    ],
    {
      debug: true,
    }
  );

  return validator;
}

const BAD_DEPLOYMENT: Resource = {
  fileId: "vanilla-panda-blog/deployment.yaml",
  filePath: "vanilla-panda-blog/deployment.yaml",
  fileOffset: 0,
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
};

const BAD_SERVICE: Resource = {
  fileId: "vanilla-panda-blog/service.yaml",
  filePath: "vanilla-panda-blog/service.yaml",
  fileOffset: 0,
  text: "apiVersion: v1\nkind: Service\nmetadata:\n  name: panda-blog\n  labels:\n    monokle.io/demo: vanilla-panda-blog\nspec:\n  selector:\n    app: panda-boom\n  ports:\n    - name: http-web\n      protocol: TCP\n      port: 80\n      targetPort: 8080\n",
  name: "panda-blog",
  id: "047aedde-e54d-51fc-9ae7-860ea5c581bc",
  apiVersion: "v1",
  kind: "Service",
  content: {
    apiVersion: "v1",
    kind: "Service",
    metadata: {
      name: "panda-blog",
      labels: {
        "monokle.io/demo": "vanilla-panda-blog",
      },
    },
    spec: {
      selector: {
        app: "panda-boom",
      },
      ports: [
        {
          name: "http-web",
          protocol: "TCP",
          port: 80,
          targetPort: 8080,
        },
      ],
    },
  },
};
