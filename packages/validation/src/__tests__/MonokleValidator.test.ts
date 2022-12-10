import Ajv from "ajv";
import { expect, it } from "vitest";
import { ResourceParser } from "../common/resourceParser.js";
import {
  createDefaultMonokleValidator,
  MonokleValidator,
} from "../MonokleValidator.js";
import { processRefs } from "../references/process.js";

// Usage note: This library relies on fetch being on global scope!
import "isomorphic-fetch";
import { RESOURCES } from "./badResources.js";
import { extractK8sResources, readDirectory } from "./testUtils";

it("should be simple to configure", async () => {
  const parser = new ResourceParser();

  const validator = createDefaultMonokleValidator(parser);

  processRefs(RESOURCES, parser);
  const response = await validator.validate({ resources: RESOURCES });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot("13");
});

it("should fail if optional refs are not allowed", async () => {
  const parser = new ResourceParser();

  const validator = createDefaultMonokleValidator(parser);

  processRefs(RESOURCES, parser);
  await configureOptionalResourceLinksValidator(validator);
  const response = await validator.validate({ resources: RESOURCES });

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot("2");
});

async function processResourcesInFolder(path: string) {
  const files = await readDirectory(
    path
  );
  const resources = extractK8sResources(files);

  const parser = new ResourceParser();
  const validator = createDefaultMonokleValidator(parser);

  processRefs(
    resources,
    parser,
    undefined,
    files.map((f) => f.path)
  );
  const response = await validator.validate({ resources });
  return {response,resources};
}

it("should allow external patch refs and find relative patches that are not resources", async () => {
  const {response} = await processResourcesInFolder("src/__tests__/resources/kustomize-with-relative-patch");

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(0);
});

it("should support relative folder paths in kustomizations", async () => {
  const {response} = await processResourcesInFolder("src/__tests__/resources/kustomize-with-relative-path-resources");

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toBe(16);
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
  const resources = RESOURCES;

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
  validateSarif.errors?.map((e) => {
    console.error(e.message, e.data, e.dataPath);
  });

  expect(validateSarif.errors?.length ?? 0).toBe(0);
});

function configureValidator(validator: MonokleValidator) {
  return validator.preload({
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
  });
}

function configureOptionalResourceLinksValidator(validator: MonokleValidator) {
  return validator.preload({
    plugins: {
      "resource-links": true,
    },
    rules: {
      "resource-links/no-missing-optional-links": "warn"
    }
  });
}
