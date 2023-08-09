import {ApiHandler} from './handlers/apiHandler.js';
import {DeviceFlowHandler} from './handlers/deviceFlowHandler.js';
import {StorageHandler} from './handlers/storageHandler.js';
import {Authenticator} from './utils/authenticator.js';

export function createDefaultMonokleAuthenticator(
  storageHandler: StorageHandler = new StorageHandler(),
  apiHandler: ApiHandler = new ApiHandler(),
  deviceFlowHandler: DeviceFlowHandler = new DeviceFlowHandler()
) {
  return new Authenticator(storageHandler, apiHandler, deviceFlowHandler);
}
