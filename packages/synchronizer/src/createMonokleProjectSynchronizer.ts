import {DEFAULT_ORIGIN} from './constants.js';
import {ApiHandler, ClientConfig} from './handlers/apiHandler.js';
import {OriginConfig, fetchOriginConfig} from './handlers/configHandler.js';
import {GitHandler} from './handlers/gitHandler.js';
import {StorageHandlerPolicy} from './handlers/storageHandlerPolicy.js';
import {ProjectSynchronizer} from './utils/projectSynchronizer.js';

export async function createMonokleProjectSynchronizerFromOrigin(
  clientConfig: ClientConfig,
  origin: string = DEFAULT_ORIGIN,
  storageHandler: StorageHandlerPolicy = new StorageHandlerPolicy(),
  gitHandler: GitHandler = new GitHandler()
) {
  try {
    const originConfig = await fetchOriginConfig(origin);

    return createMonokleProjectSynchronizerFromConfig(clientConfig, originConfig, storageHandler, gitHandler);
  } catch (err: any) {
    throw err;
  }
}

export function createMonokleProjectSynchronizerFromConfig(
  clientConfig: ClientConfig,
  originConfig: OriginConfig,
  storageHandler: StorageHandlerPolicy = new StorageHandlerPolicy(),
  gitHandler: GitHandler = new GitHandler()
) {
  if (!originConfig?.apiOrigin) {
    throw new Error(`No api origin found in origin config from ${origin}.`);
  }

  return new ProjectSynchronizer(storageHandler, new ApiHandler(originConfig, clientConfig), gitHandler);
}
