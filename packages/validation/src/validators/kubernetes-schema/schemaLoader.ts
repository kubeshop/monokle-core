import { Resource } from "../../common/types.js";
import { isKnownResourceKind } from "../../utils/knownResourceKinds.js";

export type FullSchema = { definitions: Record<string, ResourceSchema> };
export type ResourceSchema = any;

const SCHEMA_BASE =
  "https://raw.githubusercontent.com/yannh/kubernetes-json-schema/master";

export class SchemaLoader {
  private schemaCache = new Map<string, ResourceSchema | undefined>();
  private fetcher: typeof fetch;

  constructor(init?: { fetch?: typeof fetch }) {
    this.fetcher = init?.fetch ?? fetch;
  }

  async getResourceSchema(
    schemaVersion: string,
    resource: Resource | undefined,
    signal?: AbortSignal
  ): Promise<{ url?: string; schema: ResourceSchema } | undefined> {
    if (!resource) return undefined;

    try {
      const cacheKey = `${schemaVersion}-${resource.kind}`;
      const cachedSchema = this.schemaCache.get(cacheKey);
      const schemaUri = `${SCHEMA_BASE}/v${schemaVersion}-standalone/${resource.kind.toLowerCase()}.json`;

      if (cachedSchema) {
        return { schema: cachedSchema, url: schemaUri };
      }

      if (!isKnownResourceKind(resource.kind)) {
        return undefined;
      }

      const response = await this.fetcher(schemaUri, { signal });
      const schema = await response.json();
      return { url: schemaUri, schema };
    } catch {
      return undefined;
    }
  }

  async getFullSchema(
    schemaVersion: string,
    signal?: AbortSignal
  ): Promise<{ url: string; schema: FullSchema } | undefined> {
    try {
      const cacheKey = schemaVersion;
      const cachedSchema = this.schemaCache.get(cacheKey);
      const schemaUri = `${SCHEMA_BASE}/v${schemaVersion}/_definitions.json`;

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

  addCustomSchema(key: string, value: ResourceSchema) {
    this.schemaCache.set(key, value);
  }

  hasSchema(key: string) {
    return this.schemaCache.has(key);
  }

  clear() {
    this.schemaCache.clear();
  }
}
