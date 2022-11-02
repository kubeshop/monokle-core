import fse from "fs-extra";
import { parseAllDocuments } from "yaml";
import { compile } from "json-schema-to-typescript";

const crds = await fse.readFile("./crds/prometheus.yaml", "utf8");
const docs = parseAllDocuments(crds);
for (const doc of docs) {
  const resource = doc.toJS();

  if (resource.kind !== "CustomResourceDefinition") {
    continue;
  }

  const version = resource.spec.versions[0];
  const kind = resource.spec.names.kind;
  const apiVersion = `${resource.spec.group}/${version.name}`;
  const name = `${resource.spec.names.singular}.${resource.spec.group}.${version.name}`;
  const types = await compile(version.schema.openAPIV3Schema, kind, {
    bannerComment: "",
    additionalProperties: false,
  });

  const code = `${types}
  
export function is${kind}(resource: unknown): resource is ${kind} {
  return typeof resource === "object" && (resource as any)?.apiVersion === "${apiVersion}" && (resource as any)?.kind === "${kind}";
}

`;

  await fse.outputFile(`src/__generated__/${name}.ts`, code);
}
