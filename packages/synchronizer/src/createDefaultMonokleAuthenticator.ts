import {ApiHandler} from './handlers/apiHandler.js';
import {DeviceFlowHandler} from './handlers/deviceFlowHandler.js';
import {StorageHandlerAuth} from './handlers/storageHandlerAuth.js';
import {Authenticator} from './utils/authenticator.js';

export function createDefaultMonokleAuthenticator(
  storageHandler: StorageHandlerAuth = new StorageHandlerAuth(),
  apiHandler: ApiHandler = new ApiHandler(),
  deviceFlowHandler: DeviceFlowHandler = new DeviceFlowHandler()
) {
  return new Authenticator(storageHandler, apiHandler, deviceFlowHandler);
}
