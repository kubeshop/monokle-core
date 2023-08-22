import {Issuer} from 'openid-client';
import {
  DEFAULT_DEVICE_FLOW_IDP_URL,
  DEFAULT_DEVICE_FLOW_CLIENT_ID,
  DEFAULT_DEVICE_FLOW_CLIENT_SECRET,
  DEFAULT_DEVICE_FLOW_ALG,
  DEFAULT_DEVICE_FLOW_CLIENT_SCOPE,
} from '../constants.js';
import type {
  BaseClient,
  ClientMetadata,
  DeviceFlowHandle as DeviceFlowHandleOpenId,
  TokenSet as TokenSetOpenId,
} from 'openid-client';

export type DeviceFlowHandle = DeviceFlowHandleOpenId<BaseClient>;

export type TokenSet = TokenSetOpenId;

export class DeviceFlowHandler {
  private _currentClient: BaseClient | undefined;

  constructor(
    private _idpUrl: string = DEFAULT_DEVICE_FLOW_IDP_URL,
    private _clientMetadata: ClientMetadata = {
      client_id: DEFAULT_DEVICE_FLOW_CLIENT_ID,
      client_secret: DEFAULT_DEVICE_FLOW_CLIENT_SECRET,
      id_token_signed_response_alg: DEFAULT_DEVICE_FLOW_ALG,
    },
    private _clientScope: string = DEFAULT_DEVICE_FLOW_CLIENT_SCOPE
  ) {}

  async initializeAuthFlow(): Promise<DeviceFlowHandle> {
    const client = await this.getClient();

    return client.deviceAuthorization({
      scope: this._clientScope,
    });
  }

  async pollAuthFlow(handle: DeviceFlowHandle) {
    return handle.poll();
  }

  async refreshAuthFlow(refreshToken: string) {
    const client = await this.getClient();
    return client.refresh(refreshToken);
  }

  private async getClient(): Promise<BaseClient> {
    if (!this._currentClient) {
      const monokleIssuer = await Issuer.discover(this._idpUrl);
      this._currentClient = new monokleIssuer.Client(this._clientMetadata);
    }

    return this._currentClient;
  }
}
