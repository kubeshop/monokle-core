import {dirname, resolve} from 'path';
import {fileURLToPath} from 'url';
import {rm, mkdir, cp} from 'fs/promises';
import sinon, { SinonStub } from 'sinon';
import {assert} from 'chai';
import {createMonokleProjectSynchronizerFromConfig} from '../createMonokleProjectSynchronizer.js';
import {StorageHandlerPolicy} from '../handlers/storageHandlerPolicy.js';
import {StorageHandlerJsonCache} from '../handlers/storageHandlerJsonCache.js';

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

  it('refetches whole data when force synchronization used', async () => {
    const storagePath = await createTmpConfigDir();
    const synchronizer = createSynchronizer(storagePath, stubs);

    const callsCounter = stubApi(synchronizer, stubs);

    await synchronizer.synchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath);

    assert.equal(callsCounter.getUser, 1);
    assert.equal(callsCounter.getProject, 1);
    assert.equal(callsCounter.getPolicy, 1);
    assert.equal(callsCounter.getSuppression, 1);

    const suppressions1 = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions1);
    assert.equal(suppressions1.length, 1);

    await synchronizer.synchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath);

    assert.equal(callsCounter.getUser, 2);
    assert.equal(callsCounter.getProject, 2);
    assert.equal(callsCounter.getPolicy, 1);
    assert.equal(callsCounter.getSuppression, 2);

    const suppressions2 = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions2);
    assert.equal(suppressions2.length, 2);

    await synchronizer.forceSynchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath);

    assert.equal(callsCounter.getUser, 3);
    assert.equal(callsCounter.getProject, 3);
    assert.equal(callsCounter.getPolicy, 2);
    assert.equal(callsCounter.getSuppression, 3);

    // We force sync and 3rd stubbed getSuppressions call returns no suppressions.
    // This checks if memory and file cache was purged properly.
    const suppressions3 = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions3);
    assert.equal(suppressions3.length, 0);
  });

  it('refetches whole data when repo owner project changes', async () => {
    const storagePath = await createTmpConfigDir();
    const synchronizer = createSynchronizer(storagePath, stubs);

    const callsCounter = stubApi(synchronizer, stubs);

    await synchronizer.synchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath);

    assert.equal(callsCounter.getUser, 1);
    assert.equal(callsCounter.getProject, 1);
    assert.equal(callsCounter.getPolicy, 1);
    assert.equal(callsCounter.getSuppression, 1);

    const suppressions1 = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions1);
    assert.equal(suppressions1.length, 1);
    assert.isTrue(suppressions1[0].isAccepted);

    await synchronizer.synchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath, 'new-project');

    assert.equal(callsCounter.getUser, 1); // Since we pass project slug.
    assert.equal(callsCounter.getProject, 2);
    assert.equal(callsCounter.getPolicy, 2);
    assert.equal(callsCounter.getSuppression, 2);

    const suppressions2 = synchronizer.getRepositorySuppressions(storagePath, 'new-project');
    assert.isArray(suppressions2);
    assert.equal(suppressions2.length, 2);
    assert.isTrue(suppressions2[0].isAccepted);
    assert.isTrue(suppressions2[1].isUnderReview);
  });

  it('synchronizes correctly', async () => {
    const storagePath = await createTmpConfigDir();
    const synchronizer = createSynchronizer(storagePath, stubs);

    const callsCounter = stubApi(synchronizer, stubs);

    await synchronizer.synchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath);

    const info1 = synchronizer.getProjectInfo(storagePath);
    assert.isNotEmpty(info1);
    assert.equal(info1?.name, 'User1 Project')

    const permissions1 = synchronizer.getProjectPermissions(storagePath);
    assert.isObject(permissions1);
    assert.isTrue(permissions1?.repositories.write);

    const policy1 = synchronizer.getProjectPolicy(storagePath);
    assert.isObject(policy1);
    assert.isTrue(policy1.valid);
    assert.isNotEmpty(policy1.path);
    assert.isNotEmpty(policy1.policy);

    const suppressions1 = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions1);
    assert.equal(suppressions1.length, 1);
    assert.isTrue(suppressions1[0].isAccepted);

    await synchronizer.synchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath);

    const info2 = synchronizer.getProjectInfo(storagePath);
    assert.isNotEmpty(info2);
    assert.equal(info2?.name, 'User1 Project')

    const permissions2 = synchronizer.getProjectPermissions(storagePath);
    assert.isObject(permissions2);
    assert.isTrue(permissions2?.repositories.write);

    const policy2 = synchronizer.getProjectPolicy(storagePath);
    assert.isObject(policy2);
    assert.isTrue(policy2.valid);
    assert.isNotEmpty(policy2.path);
    assert.isNotEmpty(policy2.policy);

    const suppressions2 = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions2);
    assert.equal(suppressions2.length, 2);
    assert.isTrue(suppressions2[0].isAccepted);
    assert.isTrue(suppressions2[1].isUnderReview);

    await synchronizer.synchronize({
      accessToken: 'SAMPLE_TOKEN'
    } as any, storagePath);

    const info3 = synchronizer.getProjectInfo(storagePath);
    assert.isNotEmpty(info3);
    assert.equal(info3?.name, 'User1 Project')

    const permissions3 = synchronizer.getProjectPermissions(storagePath);
    assert.isObject(permissions3);
    assert.isTrue(permissions3?.repositories.write);

    const policy3 = synchronizer.getProjectPolicy(storagePath);
    assert.isObject(policy3);
    assert.isTrue(policy3.valid);
    assert.isNotEmpty(policy3.path);
    assert.isNotEmpty(policy3.policy);

    const suppressions3 = synchronizer.getRepositorySuppressions(storagePath);
    assert.isArray(suppressions3);
    assert.equal(suppressions3.length, 2);
    assert.isTrue(suppressions3[0].isAccepted);
    assert.isTrue(suppressions3[1].isUnderReview);

    assert.equal(callsCounter.getUser, 3);
    assert.equal(callsCounter.getProject, 3);
    assert.equal(callsCounter.getPolicy, 1);
    assert.equal(callsCounter.getSuppression, 3);
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
    new StorageHandlerPolicy(storagePath),
    new StorageHandlerJsonCache(storagePath),
  );

  const getRootGitDataStub = sinon.stub((synchronizer as any), 'getRootGitData').callsFake(async () => {
    return {
      provider: 'GITHUB',
      remote: 'origin',
      owner: 'kubeshop',
      name: 'monokle-demo',
    };
  });

  stubs.push(getRootGitDataStub);

  return synchronizer;
}

function stubApi(synchronizer: any, stubs: SinonStub[]) {
  const calls = {
    getUser: 0,
    getPolicy: 0,
    getProject: 0,
    getSuppression: 0,
  }

  const queryApiStub = sinon.stub(synchronizer._apiHandler, 'queryApi').callsFake(async (...args) => {
    const query = args[0] as string;

    if (query.includes('query getUser')) {
      calls.getUser++;
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
                      name: 'monokle-demo',
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
      calls.getPolicy++;
      return {
        data: {
          getProject: {
            id: 1000,
            name: 'User1 Project',
            policy: {
              id: 'policy1',
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
          }
        }
      }
    }

    if (query.includes('query getProject')) {
      calls.getProject++;
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
              updatedAt: '2024-02-08T12:15:10.298Z',
            }
          }
        }
      };
    }

    if (query.includes('query getSuppressions')) {
      calls.getSuppression++;

      if (calls.getSuppression === 1) {
        return {
          data: {
            getSuppressions: {
              data: [{
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
            }
          }
        }
      } else if (calls.getSuppression === 2) {
        return {
          data: {
            getSuppressions: {
              data: [{
                id: 'supp-1',
                fingerprint: '16587e60761329',
                description: 'K8S001 - Value at /spec/replicas should be integer',
                location: 'blue-cms.deployment@bundles/simple.yaml@c9cf721b174f5-0',
                status: 'REJECTED',
                justification: null,
                expiresAt: null,
                updatedAt: '2024-02-01T13:32:10.445Z',
                createdAt: '2024-02-01T13:32:10.445Z',
                isUnderReview: false,
                isAccepted: false,
                isRejected: true,
                isExpired: true,
                isDeleted: true,
                repositoryId: 'repo1',
              }, {
                id: 'supp-2',
                fingerprint: '16587e607613292',
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
              }, {
                id: 'supp-3',
                fingerprint: '16587e607613292',
                description: 'K8S001 - Value at /spec/replicas should be integer',
                location: 'blue-cms.deployment@bundles/simple.yaml@c9cf721b174f5-0',
                status: 'UNDER_REVIEW',
                justification: null,
                expiresAt: null,
                updatedAt: '2024-02-01T13:32:10.445Z',
                createdAt: '2024-02-01T13:32:10.445Z',
                isUnderReview: true,
                isAccepted: false,
                isRejected: false,
                isExpired: true,
                isDeleted: false,
                repositoryId: 'repo1',
              }]
            }
          }
        }
      } else {
        return {
          data: {
            getSuppressions: {
              data: []
            }
          }
        }
      }
    }

    return {};
  });
  stubs.push(queryApiStub);

  return calls;
}