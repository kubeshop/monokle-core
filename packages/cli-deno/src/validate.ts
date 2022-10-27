import {
  Command,
  EnumType,
} from "https://deno.land/x/cliffy@v0.25.2/command/mod.ts";
// import {
//   createDefaultMonokleValidator,
//   createMonokleValidator,
//   LabelsValidator,
//   Resource,
//   ResourceParser,
// } from "https://esm.sh/v96/@monokle/validation@0.4.4";
export * as yaml from "yaml";

const demo = new EnumType(["pretty", "sarif"]);

export const validate = new Command()
  .name("validate")
  .description("Foo sub-command")
  .type("demo", demo)
  .option("-f, --foo", "Foo option.")
  .option("-o, --output [output:demo]", "The output format", {
    default: "pretty",
  })
  .arguments("<path:string>")
  .action(async (options, path) => {
    console.log("isSeq", typeof (yaml as any).isSeq);

    await Promise.resolve(5);
    console.log("validate with", options, path);
    // const validator = createMonokleValidator(async (name) => {
    //   const parser = new ResourceParser();
    //   return new LabelsValidator(parser);
    // });

    // validator.configureFile({
    //   plugins: {
    //     labels: true,
    //     "open-policy-agent": false,
    //     "kubernetes-schema": false,
    //     "yaml-syntax": false,
    //     "resource-links": false,
    //   },
    // });

    // const response = await validator.validate({ resources: RESOURCES });
    // console.log(JSON.stringify(response, null, 2));
  });

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
