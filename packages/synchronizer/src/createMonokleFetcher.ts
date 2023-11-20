import {DEFAULT_ORIGIN} from './constants.js';
import {ApiHandler} from './handlers/apiHandler.js';
import {OriginConfig, fetchOriginConfig} from './handlers/configHandler.js';
import {Fetcher} from './utils/fetcher.js';

export async function createMonokleFetcherFromOrigin(origin: string = DEFAULT_ORIGIN) {
  try {
    const originConfig = await fetchOriginConfig(origin);

    return createMonokleFetcherFromConfig(originConfig);
  } catch (err: any) {
    throw err;
  }
}

export function createMonokleFetcherFromConfig(config: OriginConfig) {
  if (!config?.apiOrigin) {
    throw new Error(`No api origin found in origin config from ${origin}.`);
  }

  return new Fetcher(new ApiHandler(config));
}
