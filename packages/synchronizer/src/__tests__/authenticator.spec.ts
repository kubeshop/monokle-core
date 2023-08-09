import {dirname,resolve} from 'path';
import {fileURLToPath} from 'url';
import {rm, mkdir, cp} from 'fs/promises';
import {assert} from 'chai';
import {createDefaultMonokleAuthenticator} from '../createDefaultAuthenticator.js';
import { StorageHandler } from '../handlers/storageHandler.js';
import type { AuthenticatorLoginEvent } from '../utils/authenticator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Authenticator Tests', () => {

  before(async () => {
    await cleanupTmpConfigDir();
  });

  afterEach(async () => {
    await cleanupTmpConfigDir();
  });

  it('should return empty user data on init when no auth file present', async () => {
    const storagePath = await createTmpConfigDir();
    const authenticator = createDefaultMonokleAuthenticator(
      new StorageHandler(storagePath)
    );

    const user = authenticator.user;

    assert.isFalse(user.isAuthenticated);
    assert.notExists(user.email);
    assert.notExists(user.token);
  });

  it('should return user data on init when auth file present (token method)', async () => {
    const storagePath = await createTmpConfigDir('token');
    const authenticator = createDefaultMonokleAuthenticator(
      new StorageHandler(storagePath)
    );

    const user = authenticator.user;

    assert.isTrue(user.isAuthenticated);
    assert.equal(user.email, 'user1@kubeshop.io');
    assert.equal(user.token, 'USER1_ACCESS_TOKEN');
    assert.equal(user.data?.auth?.token.token_type, 'access_token');
  });

  it('should return user data on init when auth file present (device code method)', async () => {
    const storagePath = await createTmpConfigDir('deviceflow');
    const authenticator = createDefaultMonokleAuthenticator(
      new StorageHandler(storagePath)
    );

    const user = authenticator.user;

    assert.isTrue(user.isAuthenticated);
    assert.equal(user.email, 'user2@kubeshop.io');
    assert.equal(user.token, 'USER2_ACCESS_TOKEN');
    assert.equal(user.data?.auth?.token.token_type, 'bearer');
  });

  it('should trigger login event on init when auth file present (token method)', async () => {
    const storagePath = await createTmpConfigDir('token');
    const authenticator = createDefaultMonokleAuthenticator(
      new StorageHandler(storagePath)
    );

    return new Promise((resolve) => {
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
    const authenticator = createDefaultMonokleAuthenticator(
      new StorageHandler(storagePath)
    );

    return new Promise((resolve) => {
      authenticator.on('login', (evt: AuthenticatorLoginEvent) => {
        assert.equal(evt.method, 'device code');
        assert.isTrue(evt.user.isAuthenticated);
        assert.equal(evt.user.email, 'user2@kubeshop.io');
        assert.equal(evt.user.token, 'USER2_ACCESS_TOKEN');

        resolve();
      });
    });
  });

  it('should trigger logout event', async () => {
    const storagePath = await createTmpConfigDir('token');
    const authenticator = createDefaultMonokleAuthenticator(
      new StorageHandler(storagePath)
    );

    return new Promise((resolve) => {
      authenticator.on('logout', () => {
        assert.ok(true);

        resolve();
      });

      authenticator.logout();
    });
  });
});

async function createTmpConfigDir(copyAuthFixture = '') {
  const testDir = resolve(__dirname, './');
  const testTmpDir = resolve(testDir, './tmp');
  const fixturesSourceDir = resolve(testDir, '../../src/__tests__/fixtures');

  await mkdir(testTmpDir, { recursive: true });

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
