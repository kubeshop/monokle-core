import {ApiHandler} from './handlers/apiHandler.js';
import {DeviceFlowHandler} from './handlers/deviceFlowHandler.js';
import {StorageHandlerAuth} from './handlers/storageHandlerAuth.js';
import {Authenticator} from './utils/authenticator.js';
import {DEFAULT_DEVICE_FLOW_ALG, DEFAULT_DEVICE_FLOW_CLIENT_SECRET, DEFAULT_ORIGIN} from './constants.js';
import {OriginConfig, fetchOriginConfig} from './handlers/configHandler.js';

export async function createMonokleAuthenticatorFromOrigin(
  authClientId: string,
  origin: string = DEFAULT_ORIGIN,
  storageHandler: StorageHandlerAuth = new StorageHandlerAuth()
) {
  try {
    const originConfig = await fetchOriginConfig(origin);

    return createMonokleAuthenticatorFromConfig(authClientId, originConfig, storageHandler);
  } catch (err: any) {
    throw err;
  }
}

export function createMonokleAuthenticatorFromConfig(
  authClientId: string,
  config: OriginConfig,
  storageHandler: StorageHandlerAuth = new StorageHandlerAuth()
) {
  if (!authClientId) {
    throw new Error(`No auth clientId provided.`);
  }

  if (!config?.apiOrigin) {
    throw new Error(`No api origin found in origin config from ${origin}.`);
  }

  if (!config?.authOrigin) {
    throw new Error(`No auth origin found in origin config from ${origin}.`);
  }

  return new Authenticator(
    storageHandler,
    new ApiHandler(config),
    new DeviceFlowHandler(config.authOrigin, {
      client_id: authClientId,
      client_secret: DEFAULT_DEVICE_FLOW_CLIENT_SECRET,
      id_token_signed_response_alg: DEFAULT_DEVICE_FLOW_ALG,
    })
  );
}
