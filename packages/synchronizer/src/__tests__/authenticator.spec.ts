import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import {rm, mkdir, cp} from 'fs/promises';
import sinon from 'sinon';
import {assert} from 'chai';
import {createDefaultMonokleAuthenticator} from '../createDefaultMonokleAuthenticator.js';
import {StorageHandlerAuth} from '../handlers/storageHandlerAuth.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {DeviceFlowHandler} from '../handlers/deviceFlowHandler.js';
import type {AuthenticatorLoginEvent} from '../utils/authenticator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Authenticator Tests', () => {
  before(async () => {
    await cleanupTmpConfigDir();
  });

  afterEach(async () => {
    await cleanupTmpConfigDir();
  });

  describe('Initialization', () => {
    it('should return empty user data on init when no auth file present', async () => {
      const storagePath = await createTmpConfigDir();
      const authenticator = createDefaultMonokleAuthenticator(new StorageHandlerAuth(storagePath));

      const user = authenticator.user;

      assert.isFalse(user.isAuthenticated);
      assert.notExists(user.email);
      assert.notExists(user.token);
    });

    it('should return user data on init when auth file present (token method)', async () => {
      const storagePath = await createTmpConfigDir('token');
      const authenticator = createDefaultMonokleAuthenticator(new StorageHandlerAuth(storagePath));

      const user = authenticator.user;

      assert.isTrue(user.isAuthenticated);
      assert.equal(user.email, 'user1@kubeshop.io');
      assert.equal(user.token, 'USER1_ACCESS_TOKEN');
      assert.equal(user.data?.auth?.token.token_type, 'access_token');
    });

    it('should return user data on init when auth file present (device code method)', async () => {
      const storagePath = await createTmpConfigDir('deviceflow');
      const authenticator = createDefaultMonokleAuthenticator(new StorageHandlerAuth(storagePath));

      const user = authenticator.user;

      assert.isTrue(user.isAuthenticated);
      assert.equal(user.email, 'user2@kubeshop.io');
      assert.equal(user.token, 'USER2_ACCESS_TOKEN');
      assert.equal(user.data?.auth?.token.token_type, 'bearer');
    });

    it('should trigger login event on init when auth file present (token method)', async () => {
      const storagePath = await createTmpConfigDir('token');
      const authenticator = createDefaultMonokleAuthenticator(new StorageHandlerAuth(storagePath));

      return new Promise(resolve => {
        authenticator.on('login', (evt: AuthenticatorLoginEvent) => {
          assert.equal(evt.method, 'token');
          assert.isTrue(evt.user.isAuthenticated);
          assert.equal(evt.user.email, 'user1@kubeshop.io');
          assert.equal(evt.user.token, 'USER1_ACCESS_TOKEN');

          resolve();
        });
      });
    });

    it('should trigger login event on init when auth file present (device code method)', async () => {
      const storagePath = await createTmpConfigDir('deviceflow');
      const authenticator = createDefaultMonokleAuthenticator(new StorageHandlerAuth(storagePath));

      return new Promise(resolve => {
        authenticator.on('login', (evt: AuthenticatorLoginEvent) => {
          assert.equal(evt.method, 'device code');
          assert.isTrue(evt.user.isAuthenticated);
          assert.equal(evt.user.email, 'user2@kubeshop.io');
          assert.equal(evt.user.token, 'USER2_ACCESS_TOKEN');

          resolve();
        });
      });
    });
  });

  describe('Login', () => {
    const stubs: sinon.SinonStub[] = [];

    afterEach(async () => {
      if (stubs.length) {
        stubs.forEach(stub => stub.restore());
      }
    });

    it('should login with token', async () => {
      const apiHandler = new ApiHandler();
      const getUserStub = sinon.stub(apiHandler as any, 'queryApi').resolves({
        data: {
          me: {
            id: 123,
            email: 'user3@kubeshop.io',
            projects: [
              {
                project: {
                  id: 1230,
                  slug: 'user3-proj',
                  name: 'User3 Project',
                  repositories: [],
                },
              },
            ],
          },
        },
      });
      stubs.push(getUserStub);

      const storagePath = await createTmpConfigDir();
      const authenticator = createDefaultMonokleAuthenticator(new StorageHandlerAuth(storagePath), apiHandler);

      const loginResponse = await authenticator.login('token', 'USER3_ACCESS_TOKEN');
      const user = await loginResponse.onDone;

      assert.isTrue(user.isAuthenticated);
      assert.equal(user.email, 'user3@kubeshop.io');
      assert.equal(user.token, 'USER3_ACCESS_TOKEN');
      assert.equal(user.data?.auth?.token.token_type, 'access_token');
    });

    it('should login with device code', async () => {
      const apiHandler = new ApiHandler();
      const getUserStub = sinon.stub(apiHandler as any, 'queryApi').resolves({
        data: {
          me: {
            id: 124,
            email: 'user4@kubeshop.io',
            projects: [
              {
                project: {
                  id: 1240,
                  slug: 'user4-proj',
                  name: 'User4 Project',
                  repositories: [],
                },
              },
            ],
          },
        },
      });
      stubs.push(getUserStub);

      const deviceFlowHandler = new DeviceFlowHandler();
      const deviceFlowClientStub = sinon.stub(deviceFlowHandler as any, 'getClient').resolves({
        deviceAuthorization: async () => {
          return {
            user_code: 'FOO-BAR',
            verification_uri: 'https://app.monokle.com/device',
            verification_uri_complete: 'https://app.monokle.com/device?code=FOO-BAR',
            poll: () =>
              Promise.resolve({
                access_token: 'USER4_ACCESS_TOKEN',
                token_type: 'bearer',
                expires_at: 1691579288,
                id_token: 'USER4_ID_TOKEN',
                refresh_token: 'USER4_REFRESH_TOKEN',
              }),
          };
        },
      });
      stubs.push(deviceFlowClientStub);

      const storagePath = await createTmpConfigDir();
      const authenticator = createDefaultMonokleAuthenticator(
        new StorageHandlerAuth(storagePath),
        apiHandler,
        deviceFlowHandler
      );

      const loginResponse = await authenticator.login('device code');

      assert.equal(loginResponse.handle!.user_code, 'FOO-BAR');

      const user = await loginResponse.onDone;

      assert.isTrue(user.isAuthenticated);
      assert.equal(user.email, 'user4@kubeshop.io');
      assert.equal(user.token, 'USER4_ACCESS_TOKEN');
      assert.equal(user.data?.auth?.token.token_type, 'bearer');
    });
  });

  describe('Logout', () => {
    it('should logout ', async () => {
      const storagePath = await createTmpConfigDir('token');
      const authenticator = createDefaultMonokleAuthenticator(new StorageHandlerAuth(storagePath));

      await authenticator.logout();

      const user = authenticator.user;

      assert.isFalse(user.isAuthenticated);
      assert.notExists(user.email);
      assert.notExists(user.token);
    });

    it('should trigger logout event on logout', async () => {
      const storagePath = await createTmpConfigDir('token');
      const authenticator = createDefaultMonokleAuthenticator(new StorageHandlerAuth(storagePath));

      return new Promise(resolve => {
        authenticator.on('logout', () => {
          assert.ok(true);

          resolve();
        });

        authenticator.logout();
      });
    });
  });
});

async function createTmpConfigDir(copyAuthFixture = '') {
  const testDir = resolve(__dirname, './');
  const testTmpDir = resolve(testDir, './tmp');
  const fixturesSourceDir = resolve(testDir, '../../src/__tests__/fixtures');

  await mkdir(testTmpDir, {recursive: true});

  if (copyAuthFixture === 'token') {
    await cp(resolve(fixturesSourceDir, './auth.token.yaml'), resolve(testTmpDir, './auth.yaml'));
  }

  if (copyAuthFixture === 'deviceflow') {
    await cp(resolve(fixturesSourceDir, './auth.deviceflow.yaml'), resolve(testTmpDir, './auth.yaml'));
  }

  return testTmpDir;
}

async function cleanupTmpConfigDir() {
  const testDir = resolve(__dirname, './');
  const testTmpDir = resolve(testDir, './tmp');

  await rm(testTmpDir, {recursive: true, force: true});
}
