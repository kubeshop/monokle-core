import { expect, it } from "vitest";
import { ResourceParser } from "./common/resourceParser.js";
import { Resource } from "./common/types.js";
import { createMonokleValidator } from "./MonokleValidator.js";
import { SimpleCustomValidator } from "./validators/custom/simpleValidator.js";
import vm from "vm";

// Usage note: This library relies on fetch being on global scope!
import "isomorphic-fetch";
import { noop } from "lodash";

it("supports dynamic custom validators", async () => {
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
      labels: {
        "whoosh.io/team": "dreamers",
      },
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
