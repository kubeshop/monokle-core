import { Resource } from "../../common/types.js";
import { isKnownResourceKind } from "../../utils/knownResourceKinds.js";

export type FullSchema = { definitions: Record<string, ResourceSchema> };
export type ResourceSchema = any;

const SCHEMA_BASE =
  "https://raw.githubusercontent.com/yannh/kubernetes-json-schema/master";

const CORE_SCHEMA_BASE = "https://plugins.monokle.com/schemas";

const CRD_SCHEMA_BASE = "https://plugins.monokle.com/schemas";

export class SchemaLoader {
  private schemaCache = new Map<string, ResourceSchema | undefined>();

  async getResourceSchema(
    schemaVersion: string,
    resource: Resource | undefined,
    signal?: AbortSignal
  ): Promise<{ url?: string; schema: ResourceSchema } | undefined> {
    if (!resource) return undefined;

    try {
      const kubernetesVersion = this.getKubernetesVersion(schemaVersion);
      const cacheKey = `${kubernetesVersion}-${resource.kind}`;
      const cachedSchema = this.schemaCache.get(cacheKey);
      const schemaUri = this.getUrl(resource, kubernetesVersion);

      if (cachedSchema) {
        return { schema: cachedSchema, url: schemaUri };
      }

      const response = await fetch(schemaUri, { signal });
      const schema = await response.json();

      this.schemaCache.set(cacheKey, schema);

      return { url: schemaUri, schema };
    } catch {
      return undefined;
    }
  }

  private getKubernetesVersion(version: string): string {
    // Support both with and without v-prefix to avoid mistakes.
    // example: you easily enter `v1.24.2` while we expect `1.24.2`.
    return version.startsWith("v") ? version : `v${version}`;
  }

  private getUrl(resource: Resource, kubernetesVersion: string) {
    if (!isKnownResourceKind(resource.kind)) {
      const kind = resource.kind.toLowerCase();
      const [group, apiVersion] = resource.apiVersion.split("/");
      // e.g. https://plugins.monokle.com/schemas/crds/argoproj.io/v1alpha1/application.json
      return `${CRD_SCHEMA_BASE}/crds/${group}/${apiVersion}/${kind}.json`;
    } else {
      const kind = resource.kind.toLowerCase();
      // e.g. https://plugins.monokle.com/schemas/v1.24.2-standalone/service.json
      return `${CORE_SCHEMA_BASE}/${kubernetesVersion}-standalone/${kind}.json`;
    }
  }

  async getFullSchema(
    schemaVersion: string,
    signal?: AbortSignal
  ): Promise<{ url: string; schema: FullSchema } | undefined> {
    try {
      const cacheKey = schemaVersion;
      const cachedSchema = this.schemaCache.get(cacheKey);
      const kubernetesVersion = this.getKubernetesVersion(schemaVersion);
      const schemaUri = `${SCHEMA_BASE}/${kubernetesVersion}/_definitions.json`;

      if (cachedSchema) {
        return { schema: cachedSchema, url: schemaUri };
      }

      const response = await fetch(schemaUri, { signal });
      const schema = await response.json();

      this.schemaCache.set(cacheKey, schema);

      return { url: schemaUri, schema };
    } catch {
      return undefined;
    }
  }

  registerCustomSchema(key: string, value: ResourceSchema) {
    this.schemaCache.set(key, value);
  }

  unregisterCustomSchema(key: string) {
    this.schemaCache.delete(key);
  }

  hasSchema(key: string) {
    return this.schemaCache.has(key);
  }

  clear() {
    this.schemaCache.clear();
  }
}
