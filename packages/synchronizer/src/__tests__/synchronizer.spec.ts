import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import {rm, mkdir, cp} from 'fs/promises';
import sinon from 'sinon';
import {assert} from 'chai';
import {createDefaultMonokleSynchronizer} from '../createDefaultMonokleSynchronizer';
import {StorageHandlerPolicy} from '../handlers/storageHandlerPolicy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Synchronizer Tests', () => {
  const stubs: sinon.SinonStub[] = [];

  before(async () => {
    await cleanupTmpConfigDir();
  });

  afterEach(async () => {
    if (stubs.length) {
      stubs.forEach(stub => stub.restore());
    }

    await cleanupTmpConfigDir();
  });

  describe('getPolicy', () => {
    it('returns no policy if there is no policy file (from path)', async () => {
      const storagePath = await createTmpConfigDir();
      const synchronizer = createDefaultMonokleSynchronizer(new StorageHandlerPolicy(storagePath));

      const policy = await synchronizer.getPolicy(storagePath);

      assert.isObject(policy);
      assert.isFalse(policy.valid);
      assert.isEmpty(policy.path);
      assert.isEmpty(policy.policy);
    });

    it('returns no policy if there is no policy file (from git data)', async () => {
      const storagePath = await createTmpConfigDir();
      const synchronizer = createDefaultMonokleSynchronizer(new StorageHandlerPolicy(storagePath));

      const policy = await synchronizer.getPolicy({
        provider: 'github',
        remote: 'origin',
        owner: 'kubeshop',
        name: 'monokle-core',
      });

      assert.isObject(policy);
      assert.isFalse(policy.valid);
      assert.isEmpty(policy.path);
      assert.isEmpty(policy.policy);
    });

    it('returns policy if there is policy file (from path)', async () => {
      const storagePath = await createTmpConfigDir('github-kubeshop-monokle-core.policy.yaml');
      const synchronizer = createDefaultMonokleSynchronizer(new StorageHandlerPolicy(storagePath));

      const policy = await synchronizer.getPolicy(storagePath);

      assert.isObject(policy);
      assert.isTrue(policy.valid);
      assert.isNotEmpty(policy.path);
      assert.match(policy.path, /github-kubeshop-monokle-core.policy.yaml$/);
      assert.isNotEmpty(policy.policy);
    });

    it('returns policy if there is policy file (from git data)', async () => {
      const storagePath = await createTmpConfigDir('github-kubeshop-monokle-core.policy.yaml');
      const synchronizer = createDefaultMonokleSynchronizer(new StorageHandlerPolicy(storagePath));

      const policy = await synchronizer.getPolicy({
        provider: 'github',
        remote: 'origin',
        owner: 'kubeshop',
        name: 'monokle-core',
      });

      assert.isObject(policy);
      assert.isTrue(policy.valid);
      assert.isNotEmpty(policy.path);
      assert.match(policy.path, /github-kubeshop-monokle-core.policy.yaml$/);
      assert.isNotEmpty(policy.policy);
      assert.isNotEmpty(policy.policy.plugins);
    });

    it('throws error when no access token provided with forceRefetch set', async () => {
      try {
        const storagePath = await createTmpConfigDir();
        const synchronizer = createDefaultMonokleSynchronizer(new StorageHandlerPolicy(storagePath));

        await synchronizer.getPolicy(storagePath, true);

        assert.fail('Should have thrown error.');
      } catch (err: any) {
        assert.match(err.message, /Cannot force refetch without access token/);
      }
    });

    it('refetches policy when forceRefetch set', async () => {
      const storagePath = await createTmpConfigDir();
      const synchronizer = createDefaultMonokleSynchronizer(new StorageHandlerPolicy(storagePath));

      const queryApiStub = sinon.stub((synchronizer as any)._apiHandler, 'queryApi').callsFake(async (...args) => {
        const query = args[0] as string;

        if (query.includes('query getUser')) {
          return {
            data: {
              me: {
                id: 5,
                email: 'user5@kubeshop.io',
                projects: [
                  {
                    project: {
                      id: 5000,
                      slug: 'user5-proj',
                      name: 'User5 Project',
                      repositories: [
                        {
                          id: 'user5-proj-policy-id',
                          projectId: 5000,
                          provider: 'GITHUB',
                          owner: 'kubeshop',
                          name: 'monokle-core',
                          prChecks: false,
                          canEnablePrChecks: true,
                        },
                      ],
                    },
                  },
                ],
              },
            },
          };
        }

        if (query.includes('query getPolicy')) {
          return {
            data: {
              getProject: {
                id: 5000,
                policy: {
                  id: 'user5-proj-policy-id',
                  json: {
                    plugins: {
                      'pod-security-standards': true,
                      'yaml-syntax': false,
                      'resource-links': false,
                      'kubernetes-schema': false,
                      practices: true,
                    },
                    rules: {
                      'pod-security-standards/host-process': 'err',
                    },
                    settings: {
                      'kubernetes-schema': {
                        schemaVersion: 'v1.27.1',
                      },
                    },
                  },
                },
              },
            },
          };
        }

        return {};
      });
      stubs.push(queryApiStub);

      const repoData = {
        provider: 'github',
        remote: 'origin',
        owner: 'kubeshop',
        name: 'monokle-core',
      };

      const policy = await synchronizer.getPolicy(repoData);

      assert.isFalse(policy.valid);

      const newPolicy = await synchronizer.getPolicy(repoData, true, 'SAMPLE_ACCESS_TOKEN');

      assert.isObject(newPolicy);
      assert.isTrue(newPolicy.valid);
      assert.isNotEmpty(newPolicy.path);
      assert.match(newPolicy.path, /github-kubeshop-monokle-core.policy.yaml$/);
      assert.isNotEmpty(newPolicy.policy);
      assert.isNotEmpty(newPolicy.policy.plugins);
      assert.isNotEmpty(newPolicy.policy.rules);
      assert.isNotEmpty(newPolicy.policy.settings);

      const getPolicyResult = await synchronizer.getPolicy(repoData);

      assert.deepEqual(newPolicy, getPolicyResult);
    });

    it('emits synchronize event after policy is fetched', async () => {
      const storagePath = await createTmpConfigDir();
      const synchronizer = createDefaultMonokleSynchronizer(new StorageHandlerPolicy(storagePath));

      const queryApiStub = sinon.stub((synchronizer as any)._apiHandler, 'queryApi').callsFake(async (...args) => {
        const query = args[0] as string;

        if (query.includes('query getUser')) {
          return {
            data: {
              me: {
                id: 5,
                email: 'user5@kubeshop.io',
                projects: [
                  {
                    project: {
                      id: 5000,
                      slug: 'user5-proj',
                      name: 'User5 Project',
                      repositories: [
                        {
                          id: 'user5-proj-policy-id',
                          projectId: 5000,
                          provider: 'GITHUB',
                          owner: 'kubeshop',
                          name: 'monokle-core',
                          prChecks: false,
                          canEnablePrChecks: true,
                        },
                      ],
                    },
                  },
                ],
              },
            },
          };
        }

        if (query.includes('query getPolicy')) {
          return {
            data: {
              getProject: {
                id: 5000,
                policy: {
                  id: 'user5-proj-policy-id',
                  json: {
                    plugins: {
                      'pod-security-standards': true,
                      'yaml-syntax': false,
                      'resource-links': false,
                      'kubernetes-schema': false,
                      practices: true,
                    },
                    rules: {
                      'pod-security-standards/host-process': 'err',
                    },
                    settings: {
                      'kubernetes-schema': {
                        schemaVersion: 'v1.27.1',
                      },
                    },
                  },
                },
              },
            },
          };
        }

        return {};
      });
      stubs.push(queryApiStub);

      const repoData = {
        provider: 'github',
        remote: 'origin',
        owner: 'kubeshop',
        name: 'monokle-core',
      };

      const result = race(
        new Promise(resolve => {
          synchronizer.on('synchronize', policy => {
            assert.isObject(policy);
            assert.isTrue(policy.valid);
            assert.isNotEmpty(policy.path);
            assert.match(policy.path, /github-kubeshop-monokle-core.policy.yaml$/);
            assert.isNotEmpty(policy.policy);
            assert.isNotEmpty(policy.policy.plugins);
            assert.isNotEmpty(policy.policy.rules);
            assert.isNotEmpty(policy.policy.settings);

            resolve(policy);
          });
        }),
        'Synchronize event not triggered'
      );

      await synchronizer.getPolicy(repoData, true, 'SAMPLE_ACCESS_TOKEN');

      return result;
    });
  });
});

async function createTmpConfigDir(copyPolicyFixture = '') {
  const testDir = resolve(__dirname, './');
  const testTmpDir = resolve(testDir, './tmp');
  const fixturesSourceDir = resolve(testDir, '../../src/__tests__/fixtures');

  await mkdir(testTmpDir, {recursive: true});

  if (copyPolicyFixture) {
    await cp(resolve(fixturesSourceDir, copyPolicyFixture), resolve(testTmpDir, copyPolicyFixture));
  }

  return testTmpDir;
}

async function cleanupTmpConfigDir() {
  const testDir = resolve(__dirname, './');
  const testTmpDir = resolve(testDir, './tmp');

  await rm(testTmpDir, {recursive: true, force: true});
}

async function race(successPromise: Promise<void>, errorMsg: string) {
  let isSuccess = false;

  return Promise.race([
    successPromise.then(() => {
      isSuccess = true;
    }),
    new Promise(() =>
      setTimeout(() => {
        if (!isSuccess) {
          assert.fail(errorMsg);
        }
      }, 250)
    ),
  ]);
}
