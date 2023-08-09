import {Issuer, DeviceFlowHandle, BaseClient} from 'openid-client';
import {DEVICE_FLOW_CLIENT_ID} from '../constants';

const IDP_URL = 'https://api.dev.monokle.com/identity'; // @TODO Should later use 'globals.remotePolicyUrl'.

export class DeviceFlowHandler {
  private _currentClient: BaseClient | undefined;

  constructor() {}

  async initializeAuthFlow(): Promise<DeviceFlowHandle<BaseClient>> {
    const client = await this.getClient();
    const handle = await client.deviceAuthorization({
      scope: 'openid profile offline_access',
    });

    console.log('DeviceFlow: User Code: ', handle.user_code);
    console.log('DeviceFlow: Verification URI: ', handle.verification_uri);
    console.log('DeviceFlow: Verification URI (complete): ', handle.verification_uri_complete);

    return handle;
  }

  async pollAuthFlow(handle: DeviceFlowHandle<BaseClient>) {
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
      const monokleIssuer = await Issuer.discover(IDP_URL);

      this._currentClient = new monokleIssuer.Client({
        client_id: DEVICE_FLOW_CLIENT_ID,
        client_secret: '',
      });
    }

    return this._currentClient;
  }
}
