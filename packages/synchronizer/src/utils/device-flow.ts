import {Issuer, DeviceFlowHandle, BaseClient} from 'openid-client';
import {DEVICE_FLOW_CLIENT_ID} from '../constants';

const IDP_URL = 'https://api.dev.monokle.com/identity'; // @TODO Should later use 'globals.remotePolicyUrl'.

export async function initializeAuthFlow(): Promise<DeviceFlowHandle<BaseClient>> {
  const client = await getClient();
  const handle = await client.deviceAuthorization({
    scope: 'openid profile offline_access',
  });

  console.log('DeviceFlow: User Code: ', handle.user_code);
  console.log('DeviceFlow: Verification URI: ', handle.verification_uri);
  console.log('DeviceFlow: Verification URI (complete): ', handle.verification_uri_complete);

  return handle;
}

export async function pollAuthFlow(handle: DeviceFlowHandle<BaseClient>) {
  const token = await handle.poll();

  console.log('DeviceFlow: Token', token);

  return token;
}

export async function refreshAuthFlow(refreshToken: string) {
  const client = await getClient();
  return client.refresh(refreshToken);
}

let currentClient: BaseClient | null = null;

async function getClient(): Promise<BaseClient> {
  if (!currentClient) {
    const monokleIssuer = await Issuer.discover(IDP_URL);

    currentClient = new monokleIssuer.Client({
      client_id: DEVICE_FLOW_CLIENT_ID,
      client_secret: '',
    });
  }

  return currentClient;
}
