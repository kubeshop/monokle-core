import { expect, it } from "vitest";
import { ResourceParser } from "../common/resourceParser.js";
import { Resource } from "../common/types.js";
import { createDefaultMonokleValidator } from "../MonokleValidator.js";
import { processRefs } from "../references/process.js";

// Usage note: This library relies on fetch being on global scope!
import "isomorphic-fetch";
import { BAD_DEPLOYMENT, BAD_SERVICE, RESOURCES } from "./badResources.js";

it("should work with monokle.validation.yaml", async () => {
  // Step 1: Create the validator
  const parser = new ResourceParser();
  const validator = createDefaultMonokleValidator(parser);

  // Step 2: Configure validator with monokle.validation.yaml
  await validator.preload({
    // Responsible for validator construction
    plugins: {
      "open-policy-agent": true,
      "yaml-syntax": true,
      labels: false,
      "kubernetes-schema": false,
      "resource-links": false,
    },
    // Responsbility for rules
    rules: {
      KSV005: "warn",
      "open-policy-agent/no-latest-image": "warn",
    },
    // Responsible for validator runtime behavior
    settings: {
      debug: true,
    },
  });

  // Step 3: Validate resources
  const resources = [BAD_DEPLOYMENT, BAD_SERVICE];
  processRefs(resources, parser);
  const response = await validator.validate({ resources });

  // uncomment to debug
  // response.runs.forEach((r) =>
  //   r.results.forEach((result) => {
  //     console.error(result.ruleId, result.message.text);
  //   })
  // );

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot("11");
});

it("should handle race conditions", async () => {
  for (let i = 0; i < 3; i++) {
    const validator = createDefaultMonokleValidator();

    validator.preload({
      plugins: {
        "open-policy-agent": true,
        "yaml-syntax": true,
        labels: true,
        "kubernetes-schema": true,
        "resource-links": true,
      },
      rules: {
        KSV005: false,
        KSV013: true,
      },
    });

    validator.preload({
      plugins: {
        "open-policy-agent": false,
        "yaml-syntax": true,
        labels: false,
        "kubernetes-schema": false,
        "resource-links": false,
      },
      rules: {
        KSV005: false,
        KSV013: true,
      },
    });

    validator.preload({
      // Responsible for validator construction
      plugins: {
        "open-policy-agent": true,
        "yaml-syntax": false,
        labels: false,
        "kubernetes-schema": false,
        "resource-links": false,
      },
      // Responsbility for rules
      rules: {
        KSV005: "warn",
        "open-policy-agent/no-latest-image": "warn",
      },
      // Responsible for validator runtime behavior
      settings: {
        debug: true,
      },
    });

    const response = await validator.validate({ resources: RESOURCES });

    // uncomment to debug
    // response.runs.forEach((r) =>
    //   r.results.forEach((result) => {
    //     console.error(result.ruleId, result.message.text);
    //   })
    // );

    const hasErrors = response.runs.reduce(
      (sum, r) => sum + r.results.length,
      0
    );
    expect(hasErrors).toMatchInlineSnapshot("11");
  }
});
