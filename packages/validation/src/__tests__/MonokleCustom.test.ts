import { expect, it } from "vitest";
import { ResourceParser,createMonokleValidator, SimpleCustomValidator  } from "../index.js";
import vm from "vm";

// Usage note: This library relies on fetch being on global scope!
import "isomorphic-fetch";
import { noop } from "lodash";
import { RESOURCES } from "./badResources.js";

// This will only work if the plugin is served.
it.skip("supports dynamic custom validators", async () => {
  const parser = new ResourceParser();

  const validator = createMonokleValidator(async (pluginName) => {
    if (pluginName !== "annotations") {
      throw new Error("validator_not_found");
    }

    const annotationPlugin = await importWithDataUrl(
      "http://localhost:4111/plugin.js"
    );
    return new SimpleCustomValidator(annotationPlugin.default, parser);
  });

  await validator.preload({
    plugins: { annotations: true },
    settings: {
      debug: true,
      whoosh: {
        teams: ["dreamers", "dancers"],
      },
    },
  });

  const response = await validator.validate({ resources: RESOURCES });
  console.log(JSON.stringify(response, null, 2));
  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot("2");
});

async function importWithDataUrl(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }
  const source = await response.text();
  const buff = Buffer.from(source);
  const encodedSource = buff.toString("base64");
  const dataUrl = `data:text/javascript;base64,${encodedSource}`;

  const module = await import(dataUrl);
  return module;
}

/**
 * This requires the "--experimental-vm-modules" flag to be set.
 *
 * You can do this with an env variable:
 * @config export NODE_OPTIONS="--experimental-vm-modules"
 */
async function importWithVm(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }
  const source = await response.text();
  const context = vm.createContext({});
  const module = new (vm as any).SourceTextModule(source, {
    identifier: url,
    context,
  });
  await module.link(noop);
  await module.evaluate();
  return module.namespace;
}
