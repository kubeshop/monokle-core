import {EventEmitter} from 'events';
import {StorageHandlerPolicy} from '../handlers/storageHandlerPolicy.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {GitHandler} from '../handlers/gitHandler.js';
import type {StoragePolicyFormat} from '../handlers/storageHandlerPolicy.js';
import type {RepoRemoteData} from '../handlers/gitHandler.js';

export type RepoRemoteInputData = {
  provider: string;
  owner: string;
  name: string;
};

export type PolicyData = {
  valid: boolean;
  path: string;
  policy: StoragePolicyFormat;
};

export class Synchronizer extends EventEmitter {
  private _pullPromise: Promise<PolicyData> | undefined;

  constructor(
    private _storageHandler: StorageHandlerPolicy,
    private _apiHandler: ApiHandler,
    private _gitHandler: GitHandler
  ) {
    super();
  }

  async getPolicy(rootPath: string, forceRefetch?: boolean, accessToken?: string): Promise<PolicyData>;
  async getPolicy(repoData: RepoRemoteData, forceRefetch?: boolean, accessToken?: string): Promise<PolicyData>;
  async getPolicy(
    repoDataOrRootPath: RepoRemoteData | string,
    forceRefetch = false,
    accessToken = ''
  ): Promise<PolicyData> {
    if (forceRefetch && (!accessToken || accessToken?.length === 0)) {
      throw new Error('Cannot force refetch without access token.');
    }

    const repoData =
      typeof repoDataOrRootPath === 'string' ? await this.getRootGitData(repoDataOrRootPath) : repoDataOrRootPath;

    if (forceRefetch) {
      await this.synchronize(repoData, accessToken);
    }

    const policyContent = (await this.readPolicy(repoData)) ?? {};
    const isValidPolicy = Object.keys(policyContent).length > 0;

    return {
      valid: isValidPolicy,
      path: isValidPolicy ? this.getPolicyPath(repoData) : '',
      policy: policyContent,
    };
  }

  async synchronize(rootPath: string, accessToken: string): Promise<PolicyData>;
  async synchronize(repoData: RepoRemoteData, accessToken: string): Promise<PolicyData>;
  async synchronize(repoDataOrRootPath: RepoRemoteData | string, accessToken: string): Promise<PolicyData> {
    if (this._pullPromise) {
      return this._pullPromise;
    }

    const repoData =
      typeof repoDataOrRootPath === 'string' ? await this.getRootGitData(repoDataOrRootPath) : repoDataOrRootPath;
    this._pullPromise = this.fetchPolicy(repoData, accessToken);

    return this._pullPromise;
  }

  generateDeepLink(path: string) {
    return this._apiHandler.generateDeepLink(path)
  }

  private async fetchPolicy(repoData: RepoRemoteData, accessToken: string) {
    const policyData = {
      valid: false,
      path: '',
      policy: {},
    };

    try {
      const userData = await this._apiHandler.getUser(accessToken);
      if (!userData?.data?.me) {
        throw new Error('Cannot fetch user data, make sure you are authenticated and have internet access.');
      }

      if (!repoData?.provider || !repoData?.owner || !repoData?.name) {
        throw new Error(`Provided invalid git repository data: '${JSON.stringify(repoData)}'.`);
      }

      const repoId = `${repoData.provider}:${repoData.owner}/${repoData.name}`;

      const repoMainProject = userData.data.me.projects.find(project => {
        return project.project.repositories.find(
          repo => repo.owner === repoData.owner && repo.name === repoData.name && repo.prChecks
        );
      });

      const repoFirstProject = userData.data.me.projects.find(project => {
        return project.project.repositories.find(repo => repo.owner === repoData.owner && repo.name === repoData.name);
      });

      const repoProject = repoMainProject ?? repoFirstProject;
      if (!repoProject) {
        const projectUrl = this.generateDeepLink(`/dashboard/projects`);
        throw new Error(
          `The '${repoId}' repository does not belong to any project in Monokle Cloud. Configure it on ${projectUrl}.`
        );
      }

      const repoPolicy = await this._apiHandler.getPolicy(repoProject.project.slug, accessToken);

      const policyUrl = this.generateDeepLink(`/dashboard/projects/${repoProject.project.slug}/policy`);
      if (!repoPolicy?.data?.getProject?.policy) {
        throw new Error(
          `The '${repoId}' repository project does not have policy defined. Configure it on ${policyUrl}.`
        );
      }

      const policyContent: StoragePolicyFormat = repoPolicy.data.getProject.policy.json;

      const comment = [
        ` This is remote policy downloaded from ${this._apiHandler.apiUrl}.`,
        ` You can adjust it on ${policyUrl}.`,
      ].join('\n');

      const policyPath = await this.storePolicy(policyContent, repoData, comment);
      if (!policyPath) {
        throw new Error(`Error storing policy in local filesystem.`);
      }

      policyData.valid = true;
      policyData.path = policyPath;
      policyData.policy = policyContent;

      return policyData;
    } catch (error) {
      throw error;
    } finally {
      this._pullPromise = undefined;
      this.emit('synchronize', policyData);
    }
  }

  private async getRootGitData(rootPath: string) {
    const repoData = await this._gitHandler.getRepoRemoteData(rootPath);
    if (!repoData) {
      throw new Error(`The '${rootPath}' is not a git repository or does not have any remotes.`);
    }

    return repoData;
  }

  private getPolicyPath(repoData: RepoRemoteData) {
    const fileName = `${repoData.provider}-${repoData.owner}-${repoData.name}.policy.yaml`;
    return this._storageHandler.getStoreDataFilePath(fileName);
  }

  private async storePolicy(policyContent: StoragePolicyFormat, repoData: RepoRemoteData, comment: string) {
    const fileName = `${repoData.provider}-${repoData.owner}-${repoData.name}.policy.yaml`;
    return this._storageHandler.setStoreData(policyContent, fileName, comment);
  }

  private async readPolicy(repoData: RepoRemoteData) {
    const fileName = `${repoData.provider}-${repoData.owner}-${repoData.name}.policy.yaml`;
    return this._storageHandler.getStoreData(fileName);
  }
}
