import {ApiHandler} from './handlers/apiHandler.js';
import {GitHandler} from './handlers/gitHandler.js';
import {StorageHandlerPolicy} from './handlers/storageHandlerPolicy.js';
import {Synchronizer} from './utils/synchronizer.js';

export function createDefaultMonokleSynchronizer(
  storageHandler: StorageHandlerPolicy = new StorageHandlerPolicy(),
  apiHandler: ApiHandler = new ApiHandler(),
  gitHandler: GitHandler = new GitHandler()
) {
  return new Synchronizer(storageHandler, apiHandler, gitHandler);
}
