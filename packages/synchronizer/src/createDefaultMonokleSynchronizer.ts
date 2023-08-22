import {ApiHandler} from './handlers/apiHandler';
import {GitHandler} from './handlers/gitHandler';
import {StorageHandlerPolicy} from './handlers/storageHandlerPolicy';
import {Synchronizer} from './utils/synchronizer';

export function createDefaultMonokleSynchronizer(
  storageHandler: StorageHandlerPolicy = new StorageHandlerPolicy(),
  apiHandler: ApiHandler = new ApiHandler(),
  gitHandler: GitHandler = new GitHandler()
) {
  return new Synchronizer(storageHandler, apiHandler, gitHandler);
}
