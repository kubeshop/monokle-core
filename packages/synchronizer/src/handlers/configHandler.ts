import normalizeUrl from 'normalize-url';
import fetch from 'node-fetch';

export type OriginConfig = {
  origin: string;
  apiOrigin: string;
  authOrigin: string;
  schemasOrigin: string;
  [key: string]: string;
};

export type CachedOriginConfig = {
  config: OriginConfig;
  downloadedAt: number;
  origin: string;
};

let originConfigCache: CachedOriginConfig | undefined = undefined;

export async function fetchOriginConfig(origin: string, timeout = 30 * 1000) {
  if (originConfigCache) {
    // Use recently fetched config if from same origin and it's less than 5 minutes old.
    if (origin === originConfigCache.origin && Date.now() - originConfigCache.downloadedAt < 1000 * 60 * 5) {
      return originConfigCache.config;
    }
  }

  try {
    const configUrl = normalize(`${origin}/config.js`);
    const response = await fetch(configUrl, {timeout});

    if (!response.ok) {
      throw new Error(
        `Failed to fetch config from ${configUrl} with status ${response.status}: ${response.statusText}`
      );
    }

    const responseText = await response.text();

    const values = Array.from(responseText.matchAll(/([A-Z_]+)\s*:\s*"(.*?)"/gm)).reduce(
      (acc: Record<string, string>, match) => {
        if (match[1] && match[2]) {
          acc[match[1]] = match[2];
        }
        return acc;
      },
      {}
    );

    if (values) {
      values.origin = normalize(origin);
      values.apiOrigin = values.API_ORIGIN;
      values.authOrigin = values.OIDC_DISCOVERY_URL;
      values.schemasOrigin = values.SCHEMA_BASE_URL;
    }

    originConfigCache = {
      config: values as OriginConfig,
      downloadedAt: Date.now(),
      origin,
    };

    return values as OriginConfig;
  } catch (error: any) {
    // Rethrow error so integrations can catch it and propagate/react.
    throw error;
  }
}

function normalize(url: string) {
  return normalizeUrl(url, {
    defaultProtocol: 'https:',
    normalizeProtocol: true,
  });
}
