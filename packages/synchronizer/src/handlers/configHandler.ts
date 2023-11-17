import normalizeUrl from 'normalize-url';
import fetch from 'node-fetch';

export type OriginConfig = {
  origin: string;
  apiOrigin: string;
  authOrigin: string;
  [key: string]: string;
};

export type CachedOriginConfig = {
  config: OriginConfig;
  downloadedAt: number;
  origin: string;
};

let originConfigCache: CachedOriginConfig | undefined = undefined;

export async function fetchOriginConfig(origin: string) {
  if (originConfigCache) {
    // Use recently fetched config if from same origin and it's less than 5 minutes old.
    if (origin === originConfigCache.origin && Date.now() - originConfigCache.downloadedAt < 1000 * 60 * 5) {
      return originConfigCache.config;
    }
  }

  try {
    const configUrl = normalizeUrl(`${origin}/config.js`);
    const response = await fetch(configUrl);
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
      values.origin = normalizeUrl(origin);
      values.apiOrigin = values.API_ORIGIN;
      values.authOrigin = values.OIDC_DISCOVERY_URL;
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