import slugify from 'slugify';
import {EventEmitter} from 'events';
import {normalize} from 'path';
import {StorageHandlerPolicy, StoragePolicyFormat} from '../handlers/storageHandlerPolicy.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {GitHandler} from '../handlers/gitHandler.js';
import type {ApiProjectDetailsData, ApiProjectPermissions, ApiUserProject} from '../handlers/apiHandler.js';
import type {TokenInfo} from '../handlers/storageHandlerAuth.js';
import type {ProjectInfo, RepoRemoteInputData} from './synchronizer.js';

export class ProjectSynchronizer extends EventEmitter {
  private _dataCache: Record<string, ApiProjectDetailsData['data']['getProject']> = {};
  private _pathToRepoMap: Record<string, RepoRemoteInputData> = {};

  constructor(
    private _storageHandler: StorageHandlerPolicy,
    private _apiHandler: ApiHandler,
    private _gitHandler: GitHandler
  ) {
    super();
  }

  getProjectInfo(rootPath: string, projectSlug?: string): ProjectInfo | undefined {
    const cached = this._dataCache[this.getCacheId(rootPath, projectSlug)];

    return cached ? {
      slug: cached.slug,
      name: cached.name,
      id: cached.id,
    } : undefined;
  }

  getProjectPermissions(rootPath: string, projectSlug?: string): ApiProjectPermissions | undefined {
    return this._dataCache[this.getCacheId(rootPath, projectSlug)]?.permissions;
  }

  getProjectPolicy(rootPath: string, projectSlug?: string) {
    const cacheId = this.getCacheId(rootPath, projectSlug);
    const cached = this._dataCache[cacheId];
    const repoData = this._pathToRepoMap[cacheId];
    const policyPath = this.getPolicyPath(repoData);

    if (cached) {
      return {
        valid: true,
        path: policyPath,
        policy: cached.policy.json,
      };
    }

    const stored = this.readPolicy(repoData);
    if (stored) {
      return {
        valid: true,
        path: policyPath,
        policy: stored,
      };
    }

    return {
      valid: false,
      path: '',
      policy: undefined,
    };
  }

  getRepositorySuppressions(rootPath: string, projectSlug?: string) {
    return this._dataCache[this.getCacheId(rootPath, projectSlug)]?.projectRepository.suppressions ?? [];
  }

  async synchronize(tokenInfo: TokenInfo, rootPath: string, projectSlug?: string): Promise<void> {
    if (!tokenInfo || tokenInfo?.accessToken?.length === 0) {
      throw new Error('Cannot fetch without access token.');
    }

    const cacheId = this.getCacheId(rootPath, projectSlug);
    const repoData = await this.getRootGitData(rootPath);
    const ownerProjectSlug = projectSlug ?? (await this.getMatchingProject(repoData, tokenInfo))?.slug;

    this._pathToRepoMap[cacheId] = {
      ...repoData,
      ownerProjectSlug: projectSlug,
    };

    if (!ownerProjectSlug) {
      const projectUrl = this._apiHandler.generateDeepLink(`/dashboard/projects`);
      throw new Error(
        `The '${rootPath}' repository does not belong to any project in Monokle Cloud. Configure it on ${projectUrl}.`
      );
    }

    if (ownerProjectSlug && repoData?.owner && repoData?.name && repoData?.provider) {
      const projectDetails = await this._apiHandler.getProjectDetails({
        slug: ownerProjectSlug,
        owner: repoData.owner,
        name: repoData.name,
        provider: repoData.provider,
      }, tokenInfo);

      const policyUrl = this._apiHandler.generateDeepLink(`/dashboard/projects/${ownerProjectSlug}/policy`);
      if (!projectDetails?.data?.getProject?.policy) {
        throw new Error(
          `The '${rootPath}' repository project does not have policy defined. Configure it on ${policyUrl}.`
        );
      }

      this._dataCache[cacheId] = projectDetails?.data?.getProject;

      const policyContent: StoragePolicyFormat = projectDetails.data.getProject.policy.json;
      const comment = [
        ` This is remote policy downloaded from ${this._apiHandler.apiUrl}.`,
        ` You can adjust it on ${policyUrl}.`,
      ].join('\n');

      const policyPath = await this.storePolicy(policyContent, this._pathToRepoMap[cacheId], comment);
      if (!policyPath) {
        throw new Error(`Error storing policy in local filesystem.`);
      }

      this.emit('synchronized');
    }
  }

  private async getMatchingProject(
    repoData: RepoRemoteInputData,
    tokenInfo: TokenInfo
  ): Promise<ApiUserProject | null> {
    const userData = await this._apiHandler.getUser(tokenInfo);
    if (!userData?.data?.me) {
      throw new Error('Cannot fetch user data, make sure you are authenticated and have internet access.');
    }

    if (!repoData?.provider || !repoData?.owner || !repoData?.name) {
      throw new Error(`Provided invalid git repository data: '${JSON.stringify(repoData)}'.`);
    }

    const repoMatchingProjectBySlug = userData.data.me.projects.find(project => {
      return project.project.slug === repoData.ownerProjectSlug;
    });

    const repoFirstProject = userData.data.me.projects.find(project => {
      return project.project.repositories.find(
        repo =>
          repo.owner.toLowerCase() === repoData.owner.toLowerCase() &&
          repo.name.toLowerCase() === repoData.name.toLowerCase() &&
          repo.provider.toLowerCase() === repoData.provider.toLowerCase()
      );
    });

    return (repoMatchingProjectBySlug ?? repoFirstProject)?.project ?? null;
  }

  private getPolicyPath(repoData: RepoRemoteInputData) {
    return this._storageHandler.getStoreDataFilePath(this.getPolicyFileName(repoData));
  }

  private async storePolicy(
    policyContent: StoragePolicyFormat,
    repoData: RepoRemoteInputData,
    comment: string
  ) {
    return this._storageHandler.setStoreData(policyContent, this.getPolicyFileName(repoData), comment);
  }

  private async readPolicy(inputData: RepoRemoteInputData) {
    return this._storageHandler.getStoreData(this.getPolicyFileName(inputData));
  }

  private async getRootGitData(rootPath: string) {
    const repoData = await this._gitHandler.getRepoRemoteData(rootPath);
    if (!repoData) {
      throw new Error(`The '${rootPath}' is not a git repository or does not have any remotes.`);
    }

    return repoData;
  }

   private getCacheId(rootPath: string, projectSlug?: string) {
    return `${normalize(rootPath)}${projectSlug ? `+${projectSlug}` : ''}`;
  }

  private getPolicyFileName(repoData: RepoRemoteInputData) {
    const provider = slugify(repoData.provider, {
      replacement: '_',
      lower: true,
      strict: true,
      locale: 'en',
      trim: true,
    });

    return `${provider}-${repoData.owner}-${repoData.name}.policy.yaml`;
  }
}
