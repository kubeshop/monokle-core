import {ApiHandler} from './handlers/apiHandler';
import {DeviceFlowHandler} from './handlers/deviceFlowHandler';
import {StorageHandlerAuth} from './handlers/storageHandlerAuth';
import {Authenticator} from './utils/authenticator';

export function createDefaultMonokleAuthenticator(
  storageHandler: StorageHandlerAuth = new StorageHandlerAuth(),
  apiHandler: ApiHandler = new ApiHandler(),
  deviceFlowHandler: DeviceFlowHandler = new DeviceFlowHandler()
) {
  return new Authenticator(storageHandler, apiHandler, deviceFlowHandler);
}
