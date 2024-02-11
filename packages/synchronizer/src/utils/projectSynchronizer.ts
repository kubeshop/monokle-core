import slugify from 'slugify';
import {EventEmitter} from 'events';
import {normalize} from 'path';
import {StorageHandlerPolicy, StoragePolicyFormat} from '../handlers/storageHandlerPolicy.js';
import {StorageHandlerJsonCache} from '../handlers/storageHandlerJsonCache.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {GitHandler} from '../handlers/gitHandler.js';
import type {ApiPolicyData, ApiProjectPermissions, ApiSuppression, ApiSuppressionsData, ApiUserProject, ApiUserProjectRepo} from '../handlers/apiHandler.js';
import type {TokenInfo} from '../handlers/storageHandlerAuth.js';
import type {RepoRemoteInputData} from './synchronizer.js';
import type {ValidationConfig} from '@monokle/types';

export type CacheMetadata = {
  suppressionsLastFetchDate: string;
  policyLastUpdatedAt: string;
  projectSlug: string;
};

export type ProjectDataCache = {
  project: {
    id: number;
    slug: string;
    name: string;
  },
  permissions: ApiProjectPermissions;
  repository: ApiUserProjectRepo;
  suppressions: ApiSuppression[];
  policy: ValidationConfig;
};

export class ProjectSynchronizer extends EventEmitter {
  private _dataCache: Record<string, ProjectDataCache> = {};
  private _pathToRepoMap: Record<string, RepoRemoteInputData> = {};

  constructor(
    private _storageHandlerPolicy: StorageHandlerPolicy,
    private _storageHandlerJsonCache: StorageHandlerJsonCache,
    private _apiHandler: ApiHandler,
    private _gitHandler: GitHandler
  ) {
    super();
  }

  getProjectInfo(rootPath: string, projectSlug?: string) {
    const cached = this._dataCache[this.getCacheId(rootPath, projectSlug)];
    return cached?.project ?? undefined;
  }

  getProjectPermissions(rootPath: string, projectSlug?: string) {
    return this._dataCache[this.getCacheId(rootPath, projectSlug)]?.permissions;
  }

  getProjectPolicy(rootPath: string, projectSlug?: string) {
    const cacheId = this.getCacheId(rootPath, projectSlug);
    const cached = this._dataCache[cacheId];
    const repoData = this._pathToRepoMap[cacheId];

    if (cached && repoData) {
      return {
        valid: true,
        path: this.getPolicyPath(repoData),
        policy: cached.policy,
      };
    }

    return {
      valid: false,
      path: '',
      policy: '',
    };
  }

  getRepositoryData(rootPath: string, projectSlug?: string) {
    return this._dataCache[this.getCacheId(rootPath, projectSlug)]?.repository ?? undefined;
  }

  getRepositorySuppressions(rootPath: string, projectSlug?: string) {
    return this._dataCache[this.getCacheId(rootPath, projectSlug)]?.suppressions ?? [];
  }

  async toggleSuppression(tokenInfo: TokenInfo, fingerprint: string, description: string, location: string | undefined, rootPath: string, projectSlug?: string) {
    if (!tokenInfo?.accessToken?.length) {
      throw new Error('Cannot use suppressions without access token.');
    }

    const repoData = await this.getRootGitData(rootPath, projectSlug);

    let {id} = this.getRepositoryData(rootPath, projectSlug);
    let {slug} = this.getProjectInfo(rootPath, projectSlug);
    if (!id || !slug) {
      const ownerProject = await this.getMatchingProject(repoData, tokenInfo);
      if (!ownerProject) {
        // This error would mostly be caused by incorrect integration. Integrator should
        // make sure that suppressions are only used for repos with owner project.
        throw new Error('Trying to suppress annotation for repo without owner project!');
      }

      const repoIdData = await this._apiHandler.getRepoId(ownerProject.slug, repoData.owner, repoData.name, tokenInfo);

      id = repoIdData?.data.getProject.repository.id ?? '';
      slug = ownerProject.slug;
    }

    if (!id || !slug) {
      throw new Error('Cannot suppress due to missing repository id or project slug!');
    }

    const suppressionResult = await this._apiHandler.toggleSuppression(fingerprint, id, description, location, tokenInfo);
    if (suppressionResult?.data?.toggleSuppression) {
        const existingSuppressions = await this.readSuppressions(repoData);
        const allSuppressions = this.mergeSuppressions(existingSuppressions, [suppressionResult?.data?.toggleSuppression]);
        await this.storeSuppressions(allSuppressions, repoData);

        const cacheId = this.getCacheId(rootPath, projectSlug);
        if (this._dataCache[cacheId]) {
          this._dataCache[cacheId].suppressions = allSuppressions;
        }
    }
  }

  async synchronize(tokenInfo: TokenInfo, rootPath: string, projectSlug?: string): Promise<void> {
    if (!tokenInfo?.accessToken?.length) {
      throw new Error('Cannot fetch data without access token.');
    }

    const repoData = await this.getRootGitData(rootPath, projectSlug);
    const ownerProjectSlug = projectSlug ?? (await this.getMatchingProject(repoData, tokenInfo))?.slug;

    const cacheId = this.getCacheId(rootPath, projectSlug);
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
      const projectDetails = await this.refetchProjectDetails(repoData, ownerProjectSlug, tokenInfo);
      if (!projectDetails?.data?.getProject?.policy) {
        const policyUrl = this._apiHandler.generateDeepLink(`/dashboard/projects/${ownerProjectSlug}/policy`);
        throw new Error(
          `The '${rootPath}' repository project does not have policy defined. Configure it on ${policyUrl}.`
        );
      }

      let resyncDueToError = false;
      let existingSuppressions: ApiSuppression[] = [];
      let existingPolicy = {};
      try {
        existingSuppressions = await this.readSuppressions(repoData);
        existingPolicy = await this.readPolicy(repoData) ?? {}
      } catch (err) {
        resyncDueToError = true;
      }

      const cacheMetadata = await this.readCacheMetadata(repoData);
      const isCachedProjectMatching = ownerProjectSlug === cacheMetadata?.projectSlug;

      if (!isCachedProjectMatching || resyncDueToError) {
        existingSuppressions = [];
        existingPolicy = {};
        await this.dropCache(rootPath, projectSlug)
      }

      const projectValidationData = await this.refetchProjectValidationData(
        repoData,
        projectDetails.data.getProject.projectRepository.id,
        projectDetails.data.getProject.policy.updatedAt,
        ownerProjectSlug,
        tokenInfo
      );

      const dataCache: ProjectDataCache = {
        project: {
          id: projectDetails.data.getProject.id,
          slug: projectDetails.data.getProject.slug,
          name: projectDetails.data.getProject.name,
        },
        permissions: projectDetails.data.getProject.permissions,
        repository: projectDetails.data.getProject.projectRepository,
        suppressions: existingSuppressions,
        policy: existingPolicy
      };

      if (projectValidationData.suppressions.length) {
        const allSuppressions = this.mergeSuppressions(existingSuppressions, projectValidationData.suppressions);
        await this.storeSuppressions(allSuppressions, repoData);
        dataCache.suppressions = allSuppressions;
      }

      if (projectValidationData.policy?.json) {
        const policyContent: StoragePolicyFormat = projectValidationData.policy.json;
        const policyUrl = this._apiHandler.generateDeepLink(`/dashboard/projects/${ownerProjectSlug}/policy`);
        const comment = [
          ` This is remote policy downloaded from ${this._apiHandler.apiUrl}.`,
          ` You can adjust it on ${policyUrl}.`,
        ].join('\n');

        const policyPath = await this.storePolicy(policyContent, this._pathToRepoMap[cacheId], comment);
        if (!policyPath) {
          throw new Error(`Error storing policy in local filesystem.`);
        }

        dataCache.policy = projectValidationData.policy.json;
      }

      this._dataCache[cacheId] = dataCache;

      this.emit('synchronized');
    }
  }

  async forceSynchronize(tokenInfo: TokenInfo, rootPath: string, projectSlug?: string): Promise<void> {
    await this.dropCache(rootPath, projectSlug);
    return this.synchronize(tokenInfo, rootPath, projectSlug);
  }

  private async refetchProjectDetails(repoData: RepoRemoteInputData, ownerProjectSlug: string, tokenInfo: TokenInfo) {
    return this._apiHandler.getProjectDetails({
      slug: ownerProjectSlug,
      owner: repoData.owner,
      name: repoData.name,
      provider: repoData.provider,
    }, tokenInfo);
  }

  private async refetchProjectValidationData(repoData: RepoRemoteInputData, repoId: string, policyUpdatedAt: string, ownerProjectSlug: string, tokenInfo: TokenInfo) {
    const cacheMetadata = await this.readCacheMetadata(repoData);
    const isCachedProjectMatching = ownerProjectSlug === cacheMetadata?.projectSlug;

    const newSuppressionsLastFetchDate = (new Date()).toISOString();
    const fetchSuppressionsFrom = isCachedProjectMatching ? cacheMetadata?.suppressionsLastFetchDate : undefined;

    const dataRefetchQueries: Promise<any>[] = [
      this._apiHandler.getSuppressions(repoId, tokenInfo, fetchSuppressionsFrom)
    ];
    if (!isCachedProjectMatching || !cacheMetadata?.policyLastUpdatedAt || cacheMetadata.policyLastUpdatedAt !== policyUpdatedAt) {
      dataRefetchQueries.push(this._apiHandler.getPolicy(ownerProjectSlug, tokenInfo));
    }

    const newData = await Promise.all(dataRefetchQueries);

    const newCacheMetadata: CacheMetadata = {
      suppressionsLastFetchDate: newSuppressionsLastFetchDate,
      policyLastUpdatedAt: policyUpdatedAt,
      projectSlug: ownerProjectSlug
    };
    this.storeCacheMetadata(newCacheMetadata, repoData);

    return {
      suppressions: (newData[0] as ApiSuppressionsData | undefined)?.data?.getSuppressions?.data ?? [],
      policy: (newData[1] as ApiPolicyData | undefined)?.data?.getProject?.policy,
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

  private async getRootGitData(rootPath: string, projectSlug: string | undefined): Promise<RepoRemoteInputData> {
    const repoData: RepoRemoteInputData | undefined = await this._gitHandler.getRepoRemoteData(rootPath);
    if (!repoData) {
      throw new Error(`The '${rootPath}' is not a git repository or does not have any remotes.`);
    }

    if (projectSlug) {
      repoData.ownerProjectSlug = projectSlug;
    }

    return repoData;
  }

   private getCacheId(rootPath: string, projectSlug?: string) {
    return `${normalize(rootPath)}${projectSlug ? `+${projectSlug}` : ''}`;
  }

  private async storePolicy(
    policyContent: StoragePolicyFormat,
    repoData: RepoRemoteInputData,
    comment: string
  ) {
    return this._storageHandlerPolicy.setStoreData(policyContent, this.getPolicyFileName(repoData), comment);
  }

  private async readPolicy(inputData: RepoRemoteInputData) {
    return this._storageHandlerPolicy.getStoreData(this.getPolicyFileName(inputData));
  }

  private getPolicyPath(inputData: RepoRemoteInputData) {
    return this._storageHandlerPolicy.getStoreDataFilePath(this.getPolicyFileName(inputData));
  }

  private async storeSuppressions(suppressions: ApiSuppression[], repoData: RepoRemoteInputData) {
    return this._storageHandlerJsonCache.setStoreData(suppressions, this.getSuppressionsFileName(repoData));
  }

  private async readSuppressions(repoData: RepoRemoteInputData) {
    return (await this._storageHandlerJsonCache.getStoreData(this.getSuppressionsFileName(repoData)) ?? []) as ApiSuppression[];
  }

  private mergeSuppressions(existing: ApiSuppression[], updated: ApiSuppression[]) {
    const suppressionsMap = existing.reduce((prev: Record<string, ApiSuppression>, curr: ApiSuppression) => {
      prev[curr.id] = curr;
      return prev;
    }, {});

    updated.forEach(suppression => {
      suppressionsMap[suppression.id] = suppression;
    });

    return Object.values(suppressionsMap)
      .filter(suppression => !(suppression.isDeleted || suppression.isRejected));
  }

  private async storeCacheMetadata(cacheMetadata: CacheMetadata, repoData: RepoRemoteInputData) {
    return this._storageHandlerJsonCache.setStoreData(cacheMetadata, this.getMetadataFileName(repoData));
  }

  private async readCacheMetadata(repoData: RepoRemoteInputData) {
    try {
      return (await this._storageHandlerJsonCache.getStoreData(this.getMetadataFileName(repoData)) ?? {}) as CacheMetadata;
    } catch (err) {
      return {} as CacheMetadata;
    }
  }

  private async dropCache(rootPath: string, projectSlug?: string) {
    const cacheId = this.getCacheId(rootPath, projectSlug);
    delete this._dataCache[cacheId];

    const repoData = await this.getRootGitData(rootPath, projectSlug);
    await this._storageHandlerJsonCache.emptyStoreData(this.getMetadataFileName(repoData));
    await this._storageHandlerJsonCache.emptyStoreData(this.getSuppressionsFileName(repoData));
    await this._storageHandlerPolicy.emptyStoreData(this.getPolicyFileName(repoData));
  }

  private getPolicyFileName(repoData: RepoRemoteInputData) {
    return this.getFileName(repoData, 'policy');
  }

  private getSuppressionsFileName(repoData: RepoRemoteInputData) {
    return this.getFileName(repoData, 'suppressions', 'json');
  }

  private getMetadataFileName(repoData: RepoRemoteInputData) {
    return this.getFileName(repoData, 'metadata', 'json');
  }

  private getFileName(repoData: RepoRemoteInputData, suffix: string, ext = 'yaml') {
    const provider = slugify(repoData.provider, {
      replacement: '_',
      lower: true,
      strict: true,
      locale: 'en',
      trim: true,
    });

    let projectSuffix = '';
    if (repoData.ownerProjectSlug) {
      projectSuffix = `.${repoData.ownerProjectSlug}`
    }

    return `${provider}-${repoData.owner}-${repoData.name}${projectSuffix}.${suffix}.${ext}`;
  }
}
