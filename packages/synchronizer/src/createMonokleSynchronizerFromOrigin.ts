import {ApiHandler} from './handlers/apiHandler.js';
import {GitHandler} from './handlers/gitHandler.js';
import {StorageHandlerPolicy} from './handlers/storageHandlerPolicy.js';
import {Fetcher} from './utils/fetcher.js';
import {Synchronizer} from './utils/synchronizer.js';

export async function createMonokleSynchronizerFromOrigin(origin: string) {
  try {
    const originConfig = await Fetcher.getOriginConfig(origin);

    if (!originConfig?.apiOrigin) {
      throw new Error(`No api origin found in origin config from ${origin}.`);
    }

    return new Synchronizer(new StorageHandlerPolicy(), new ApiHandler(originConfig.apiOrigin), new GitHandler());
  } catch (err: any) {
    throw err;
  }
}
