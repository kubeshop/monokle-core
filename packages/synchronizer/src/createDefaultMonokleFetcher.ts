import {ApiHandler} from './handlers/apiHandler.js';
import {Fetcher} from './utils/fetcher.js';

/**
 * Creates default Monokle Fetcher instance.
 *
 * @deprecated Use createMonokleFetcherFromOrigin or createMonokleFetcherFromConfig instead which does not rely on hardcoded config.
 *
 * @param apiHandler
 * @returns Fetcher instance
 */
export function createDefaultMonokleFetcher(apiHandler: ApiHandler = new ApiHandler()) {
  return new Fetcher(apiHandler);
}
