import {DEFAULT_ORIGIN} from './constants.js';
import {ApiHandler, ClientConfig} from './handlers/apiHandler.js';
import {OriginConfig, fetchOriginConfig} from './handlers/configHandler.js';
import {Fetcher} from './utils/fetcher.js';

export async function createMonokleFetcherFromOrigin(clientConfig: ClientConfig, origin: string = DEFAULT_ORIGIN) {
  try {
    const originConfig = await fetchOriginConfig(origin);

    return createMonokleFetcherFromConfig(clientConfig, originConfig);
  } catch (err: any) {
    throw err;
  }
}

export function createMonokleFetcherFromConfig(clientConfig: ClientConfig, originConfig: OriginConfig) {
  if (!originConfig?.apiOrigin) {
    throw new Error(`No api origin found in origin config from ${origin}.`);
  }

  return new Fetcher(new ApiHandler(originConfig, clientConfig));
}
