import fse from "fs-extra";
import { parseAllDocuments } from "yaml";
import { compile } from "json-schema-to-typescript";
import klaw from "klaw-sync";

export type CodegenArgs = {
  outDir?: string;
  crdDir?: string;
};

export async function codegen({
  outDir = "./src/schemas/__generated__",
  crdDir = "./src/schemas/crds",
}: CodegenArgs = {}) {
  await generateKnownCoreResourceTypes(outDir);
  await generateCustomResourceTypes(outDir, crdDir);
}

async function generateCustomResourceTypes(outDir: string, crdDir: string) {
  if (!fse.existsSync(crdDir)) {
    return;
  }

  const files = klaw(crdDir, { nodir: true, depthLimit: 0 });

  for (const file of files) {
    const crds = await fse.readFile(file.path, "utf8");
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

      await fse.outputFile(`${outDir}/${name}.ts`, code);
    }
  }
}

async function generateKnownCoreResourceTypes(outDir: string) {
  const KNOWN_KINDS = [
    ["ClusterRole", "rbac/v1", "rbac.authorization.k8s.io/v1"],
    ["ClusterRoleBinding", "rbac/v1", "rbac.authorization.k8s.io/v1"],
    ["CronJob", "batch/v1", "batch/v1"],
    ["ConfigMap", "core/v1", "v1"],
    ["CustomResourceDefinition", "apiextensions/v1", "apiextensions.k8s.io/v1"],
    ["DaemonSet", "apps/v1", "apps/v1"],
    ["Deployment", "apps/v1", "apps/v1"],
    ["Endpoints", "core/v1", "v1"],
    ["EndpointSlice", "discovery/v1", "discovery.k8s.io/v1"],
    ["HorizontalPodAutoscaler", "autoscaling/v2", "autoscaling/v2"],
    ["Ingress", "networking/v1", "networking.k8s.io/v1"],
    ["Job", "batch/v1", "batch/v1"],
    ["LimitRange", "core/v1", "v1"],
    ["Namespace", "core/v1", "v1"],
    ["NetworkPolicy", "networking/v1", "networking.k8s.io/v1"],
    ["PersistentVolume", "core/v1", "v1"],
    ["PersistentVolumeClaim", "core/v1", "v1"],
    ["Pod", "core/v1", "v1"],
    ["ReplicaSet", "apps/v1", "apps/v1"],
    ["ReplicationController", "core/v1", "v1"],
    ["ResourceQuota", "core/v1", "v1"],
    ["Role", "rbac/v1", "rbac.authorization.k8s.io/v1"],
    ["RoleBinding", "rbac/v1", "rbac.authorization.k8s.io/v1"],
    ["Secret", "core/v1", "v1"],
    ["Service", "core/v1", "v1"],
    ["ServiceAccount", "core/v1", "v1"],
    ["StatefulSet", "apps/v1", "apps/v1"],
    ["StorageClass", "storage/v1", "storage.k8s.io/v1"],
    ["VolumeAttachment", "storage/v1", "storage.k8s.io/v1"],
  ];

  for (const [kind, importVersion, apiVersion] of KNOWN_KINDS) {
    const code = `import type { ${kind} } from "kubernetes-types/${importVersion}.d.js";
export type { ${kind} } from "kubernetes-types/${importVersion}.d.js";
  
export function is${kind}(resource: unknown): resource is ${kind} {
  return typeof resource === "object" && (resource as any)?.apiVersion === "${apiVersion}" && (resource as any)?.kind === "${kind}";
}

`;

    const name = `${kind.toLowerCase()}.${apiVersion.replace("/", ".")}`;
    await fse.outputFile(`${outDir}/${name}.ts`, code);
  }
}
