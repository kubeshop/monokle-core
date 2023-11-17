import {ApiHandler} from './handlers/apiHandler.js';
import {DeviceFlowHandler} from './handlers/deviceFlowHandler.js';
import {StorageHandlerAuth} from './handlers/storageHandlerAuth.js';
import {Fetcher} from './utils/fetcher.js';
import {Authenticator} from './utils/authenticator.js';
import {DEFAULT_DEVICE_FLOW_ALG, DEFAULT_DEVICE_FLOW_CLIENT_SECRET, DEFAULT_ORIGIN} from './constants.js';

export async function createMonokleAuthenticatorFromOrigin(origin: string = DEFAULT_ORIGIN) {
  try {
    const originConfig = await Fetcher.getOriginConfig(origin);

    if (!originConfig?.apiOrigin) {
      throw new Error(`No api origin found in origin config from ${origin}.`);
    }

    if (!originConfig?.authOrigin) {
      throw new Error(`No auth origin found in origin config from ${origin}.`);
    }

    if (!originConfig?.clientId) {
      throw new Error(`No auth clientId found in origin config from ${origin}.`);
    }

    return new Authenticator(
      new StorageHandlerAuth(),
      new ApiHandler(originConfig.apiOrigin),
      new DeviceFlowHandler(originConfig.authOrigin, {
        client_id: originConfig.clientId,
        client_secret: DEFAULT_DEVICE_FLOW_CLIENT_SECRET,
        id_token_signed_response_alg: DEFAULT_DEVICE_FLOW_ALG,
      })
    );
  } catch (err: any) {
    throw err;
  }
}
