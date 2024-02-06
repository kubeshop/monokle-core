import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import {rm, mkdir, cp} from 'fs/promises';
import sinon from 'sinon';
import {assert} from 'chai';
import {createMonokleProjectSynchronizerFromConfig} from '../createMonokleProjectSynchronizer.js';
import {StorageHandlerPolicy} from '../handlers/storageHandlerPolicy.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('ProjectSynchronizer Tests', () => {
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

  it('returns empty data if not synchronized', async () => {
    const storagePath = await createTmpConfigDir();
    const synchronizer = createSynchronizer(storagePath, stubs);

    const info = synchronizer.getProjectInfo(storagePath);
    assert.isUndefined(info);

    const permissions = synchronizer.getProjectPermissions(storagePath);
    assert.isUndefined(permissions);

    const policy = synchronizer.getProjectPolicy(storagePath);
    assert.isObject(policy);
    assert.isFalse(policy.valid);
    assert.isEmpty(policy.path);
    assert.isEmpty(policy.policy);

    const suppressions = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions);
    assert.isEmpty(suppressions);
  });

  it('throws error when no access token provided for fetch', async () => {
    try {
      const storagePath = await createTmpConfigDir();
      const synchronizer = createSynchronizer(storagePath, stubs);

      await synchronizer.synchronize({} as any, storagePath);

      assert.fail('Should have thrown error.');
    } catch (err: any) {
      assert.match(err.message, /Cannot fetch data without access token/);
    }
  });

  it('returns valid data after synchronization (repo path)', async () => {
    const storagePath = await createTmpConfigDir();
    const synchronizer = createSynchronizer(storagePath, stubs);

    const queryApiStub = sinon.stub((synchronizer as any)._apiHandler, 'queryApi').callsFake(async (...args) => {
      const query = args[0] as string;

      if (query.includes('query getUser')) {
        return {
          data: {
            me: {
              id: 1,
              email: 'user1@kubeshop.io',
              projects: [
                {
                  project: {
                    id: 1000,
                    slug: 'user1-proj',
                    name: 'User1 Project',
                    repositories: [
                      {
                        id: 'user1-proj-policy-id',
                        projectId: 1000,
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

      if (query.includes('query getProject')) {
        return {
          data: {
            getProject: {
              id: 1000,
              slug: 'user1-proj',
              name: 'User1 Project',
              projectRepository: {
                id: 'repo1',
                projectId: 1000,
                provider: 'GITHUB',
                owner: 'kubeshop',
                name: 'monokle-demo',
                suppressions: [{
                  id: 'supp-1',
                  fingerprint: '16587e60761329',
                  description: 'K8S001 - Value at /spec/replicas should be integer',
                  location: 'blue-cms.deployment@bundles/simple.yaml@c9cf721b174f5-0',
                  status: 'ACCEPTED',
                  justification: null,
                  expiresAt: null,
                  updatedAt: '2024-02-01T13:32:10.445Z',
                  createdAt: '2024-02-01T13:32:10.445Z',
                  isUnderReview: false,
                  isAccepted: true,
                  isRejected: false,
                  isExpired: true,
                  isDeleted: false,
                  repositoryId: 'repo1',
                }]
              },
              permissions: {
                project: {
                  view: true,
                  update: true,
                  delete: true
                },
                members: {
                  view: true,
                  update: true,
                  delete: true
                },
                repositories: {
                  read: true,
                  write: true
                }
              },
              policy: {
                id: 'policy1',
                json: {
                  plugins: {
                    "pod-security-standards": false,
                    "yaml-syntax": true,
                    "resource-links": true,
                    "kubernetes-schema": false,
                    "practices": true,
                    "metadata": false
                  },
                  rules: {
                    "pod-security-standards/host-process": false,
                    "pod-security-standards/host-namespaces": false,
                    "pod-security-standards/privileged-containers": false,
                    "pod-security-standards/capabilities": false,
                    "pod-security-standards/host-path-volumes": false,
                  },
                  "settings": {
                    "kubernetes-schema": {
                      "schemaVersion": 'v1.28.0'
                    }
                  }
                }
              }
            }
          }
        };
      }

      return {};
    });
    stubs.push(queryApiStub);

    await synchronizer.synchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath);

    const info = synchronizer.getProjectInfo(storagePath);
    assert.isNotEmpty(info);
    assert.equal(info?.name, 'User1 Project')

    const permissions = synchronizer.getProjectPermissions(storagePath);
    assert.isObject(permissions);
    assert.isTrue(permissions?.repositories.write);

    const policy = synchronizer.getProjectPolicy(storagePath);
    assert.isObject(policy);
    assert.isTrue(policy.valid);
    assert.isNotEmpty(policy.path);
    assert.isNotEmpty(policy.policy);

    const suppressions = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions);
    assert.equal(suppressions.length, 1);
  });
});

async function createTmpConfigDir(copyPolicyFixture = '') {
  const testDir = resolve(__dirname, './');
  const testTmpDir = resolve(testDir, './tmp');
  const fixturesSourceDir = resolve(testDir, '../../../src/__tests__/fixtures');

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

function createSynchronizer(storagePath: string, stubs: sinon.SinonStub[]) {
  const synchronizer = createMonokleProjectSynchronizerFromConfig(
    {
      name: 'Tests',
      version: 'unknown',
    },
    {
      origin: 'https://monokle.com',
      apiOrigin: 'https://api.monokle.com',
      authOrigin: 'https://auth.monokle.com',
      schemasOrigin: 'https://schemas.monokle.com',
    },
    new StorageHandlerPolicy(storagePath)
  );

  const getRootGitDataStub = sinon.stub((synchronizer as any), 'getRootGitData').callsFake(async () => {
    return {
      provider: 'GITHUB',
      remote: 'origin',
      owner: 'kubeshop',
      name: 'monokle-core',
    };
  });

  stubs.push(getRootGitDataStub);

  return synchronizer;
}
