import Ajv from "ajv";
import { expect, it } from "vitest";
import { ResourceParser } from "./common/resourceParser.js";
import { Resource } from "./common/types.js";
import {
  createDefaultMonokleValidator,
  MonokleValidator,
} from "./MonokleValidator.js";
import { processRefs } from "./references/process.js";

// Usage note: This library relies on fetch being on global scope!
import "isomorphic-fetch";

it("should be simple to configure", async () => {
  const parser = new ResourceParser();

  const validator = createDefaultMonokleValidator(parser);

  processRefs(RESOURCES, parser);
  const response = await validator.validate({ resources: RESOURCES });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot("14");
});

it("should be abort properly", async () => {
  const parser = new ResourceParser();

  const validator = createDefaultMonokleValidator(parser);

  try {
    processRefs(RESOURCES, parser);
    const validating = validator.validate({ resources: RESOURCES });

    validator.configureArgs({
      plugins: {
        "kubernetes-schema": false,
      },
    });

    await validating;

    expect.fail("expected abort error");
  } catch (err) {
    expect((err as Error).name).toBe("AbortError");
  }
});

it("should be flexible to configure", async () => {
  const parser = new ResourceParser();

  const validator = createDefaultMonokleValidator(parser);
  processRefs(RESOURCES, parser);
  await configureValidator(validator);

  const response = await validator.validate({ resources: RESOURCES });

  // uncomment to debug
  // response.runs.forEach((r) =>
  //   r.results.forEach((result) => {
  //     console.error(result.ruleId, result.message.text);
  //   })
  // );

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot("14");
});

it("should be valid SARIF", async () => {
  const parser = new ResourceParser();
  const resources = [BAD_DEPLOYMENT, BAD_SERVICE];

  const validator = createDefaultMonokleValidator(parser);
  processRefs(resources, parser);
  await configureValidator(validator);
  const response = await validator.validate({ resources });

  const ajv = new Ajv({
    jsonPointers: true,
    verbose: true,
    allErrors: true,
  });

  const res = await fetch("https://json.schemastore.org/sarif-2.1.0.json");
  if (!res.ok) throw new Error("schema_download_failed");
  const schema = await res.json();

  const validateSarif = ajv.compile(schema);
  validateSarif(response);

  // uncomment to debug
  // validateSarif.errors?.map((e) => {
  //   console.error(e.message, e.data, e.dataPath);
  // });

  expect(validateSarif.errors?.length ?? 0).toBe(0);
});

function configureValidator(validator: MonokleValidator) {
  return validator.preload({
    file: {
      plugins: {
        labels: true,
        "yaml-syntax": true,
        "resource-links": true,
        "kubernetes-schema": true,
        "open-policy-agent": true,
      },
      settings: {
        "kubernetes-schema": {
          schemaVersion: "1.24.2",
        },
        debug: true,
      },
    },
  });
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

const RESOURCES = [BAD_DEPLOYMENT, BAD_SERVICE];
