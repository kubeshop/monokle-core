import {DEFAULT_ORIGIN} from './constants.js';
import {ApiHandler, ClientConfig} from './handlers/apiHandler.js';
import {OriginConfig, fetchOriginConfig} from './handlers/configHandler.js';
import {GitHandler} from './handlers/gitHandler.js';
import {StorageHandlerPolicy} from './handlers/storageHandlerPolicy.js';
import {Synchronizer} from './utils/synchronizer.js';

export async function createMonokleSynchronizerFromOrigin(
  clientConfig: ClientConfig,
  origin: string = DEFAULT_ORIGIN,
  storageHandler: StorageHandlerPolicy = new StorageHandlerPolicy(),
  gitHandler: GitHandler = new GitHandler()
) {
  try {
    const originConfig = await fetchOriginConfig(origin);

    return createMonokleSynchronizerFromConfig(clientConfig, originConfig, storageHandler, gitHandler);
  } catch (err: any) {
    throw err;
  }
}

export function createMonokleSynchronizerFromConfig(
  clientConfig: ClientConfig,
  originConfig: OriginConfig,
  storageHandler: StorageHandlerPolicy = new StorageHandlerPolicy(),
  gitHandler: GitHandler = new GitHandler()
) {
  if (!originConfig?.apiOrigin) {
    throw new Error(`No api origin found in origin config from ${origin}.`);
  }

  return new Synchronizer(storageHandler, new ApiHandler(originConfig, clientConfig), gitHandler);
}
