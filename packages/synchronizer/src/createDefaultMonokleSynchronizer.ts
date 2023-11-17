import {ApiHandler} from './handlers/apiHandler.js';
import {GitHandler} from './handlers/gitHandler.js';
import {StorageHandlerPolicy} from './handlers/storageHandlerPolicy.js';
import {Synchronizer} from './utils/synchronizer.js';

/**
 * Creates default Monokle Synchronizer instance.
 *
 * @deprecated Use createMonokleSynchronizerFromOrigin or createMonokleSynchronizerFromConfig instead which does not rely on hardcoded config.
 *
 * @param storageHandler
 * @param apiHandler
 * @param gitHandler
 * @returns Synchronizer instance
 */
export function createDefaultMonokleSynchronizer(
  storageHandler: StorageHandlerPolicy = new StorageHandlerPolicy(),
  apiHandler: ApiHandler = new ApiHandler(),
  gitHandler: GitHandler = new GitHandler()
) {
  return new Synchronizer(storageHandler, apiHandler, gitHandler);
}
