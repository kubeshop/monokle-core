import {ApiHandler} from './handlers/apiHandler';
import {DeviceFlowHandler} from './handlers/deviceFlowHandler';
import {StorageHandler} from './handlers/storageHandler';
import {Authenticator} from './utils/authenticator';

export function createDefaultMonokleAuthenticator(
  storageHandler: StorageHandler = new StorageHandler(),
  apiHandler: ApiHandler = new ApiHandler('@TODO url'),
  deviceFlowHandler: DeviceFlowHandler = new DeviceFlowHandler()
) {
  return new Authenticator(storageHandler, apiHandler, deviceFlowHandler);
}
