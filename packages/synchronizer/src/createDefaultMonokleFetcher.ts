import {ApiHandler} from './handlers/apiHandler.js';
import {Fetcher} from './utils/fetcher.js';

export function createDefaultMonokleFetcher(
  apiHandler: ApiHandler = new ApiHandler()
) {
  return new Fetcher(apiHandler);
}
