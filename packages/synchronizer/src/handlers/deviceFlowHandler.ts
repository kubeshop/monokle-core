import {
  Issuer,
  DeviceFlowHandle as DeviceFlowHandleOpenId,
  TokenSet as TokenSetOpenId,
  BaseClient,
} from 'openid-client';
import {DEFAULT_DEVICE_FLOW_IDP_URL, DEFAULT_DEVICE_FLOW_CLIENT_ID} from '../constants.js';

export type DeviceFlowHandle = DeviceFlowHandleOpenId<BaseClient>;

export type TokenSet = TokenSetOpenId;

export class DeviceFlowHandler {
  private _currentClient: BaseClient | undefined;

  constructor(
    private idpUrl: string = DEFAULT_DEVICE_FLOW_IDP_URL,
    private clientId: string = DEFAULT_DEVICE_FLOW_CLIENT_ID,
  ) {}

  async initializeAuthFlow(): Promise<DeviceFlowHandle> {
    const client = await this.getClient();
    const handle = await client.deviceAuthorization({
      scope: 'openid profile offline_access',
    });

    console.log('DeviceFlow: User Code: ', handle.user_code);
    console.log('DeviceFlow: Verification URI: ', handle.verification_uri);
    console.log('DeviceFlow: Verification URI (complete): ', handle.verification_uri_complete);

    return handle;
  }

  async pollAuthFlow(handle: DeviceFlowHandle) {
    const token = await handle.poll();

    console.log('DeviceFlow: Token', token);

    return token;
  }

  async refreshAuthFlow(refreshToken: string) {
    const client = await this.getClient();
    return client.refresh(refreshToken);
  }

  private async getClient(): Promise<BaseClient> {
    if (!this._currentClient) {
      const monokleIssuer = await Issuer.discover(this.idpUrl);

      this._currentClient = new monokleIssuer.Client({
        client_id: this.clientId,
        client_secret: '',
      });
    }

    return this._currentClient;
  }
}
