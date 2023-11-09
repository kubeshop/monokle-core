import slugify from 'slugify';
import {EventEmitter} from 'events';
import {StorageHandlerPolicy} from '../handlers/storageHandlerPolicy.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {GitHandler} from '../handlers/gitHandler.js';
import type {StoragePolicyFormat} from '../handlers/storageHandlerPolicy.js';
import type {RepoRemoteData} from '../handlers/gitHandler.js';
import type {ApiSuppression, ApiUserProject} from '../handlers/apiHandler.js';
import type {TokenInfo} from '../handlers/storageHandlerAuth.js';

export type RepoRemoteInputData = RepoRemoteData & {
  ownerProjectSlug?: string;
};

export type RepoPathInputData = {
  path: string;
  ownerProjectSlug?: string;
};

export type ProjectInputData = {
  slug: string;
};

export type PolicyData = {
  valid: boolean;
  path: string;
  policy: StoragePolicyFormat;
};

export type ProjectInfo = {
  id: number;
  name: string;
  slug: string;
};

export class Synchronizer extends EventEmitter {
  private _pullPromise: Promise<PolicyData> | undefined;
  private _projectDataCache: Record<string, ApiUserProject> = {};

  constructor(
    private _storageHandler: StorageHandlerPolicy,
    private _apiHandler: ApiHandler,
    private _gitHandler: GitHandler
  ) {
    super();
  }

  async getProjectInfo(rootPath: string, tokenInfo: TokenInfo, forceRefetch?: boolean): Promise<ProjectInfo | null>;
  async getProjectInfo(
    rootPathWithProject: RepoPathInputData,
    tokenInfo: TokenInfo,
    forceRefetch?: boolean
  ): Promise<ProjectInfo | null>;
  async getProjectInfo(
    repoData: RepoRemoteInputData,
    tokenInfo: TokenInfo,
    forceRefetch?: boolean
  ): Promise<ProjectInfo | null>;
  async getProjectInfo(
    projectData: ProjectInputData,
    tokenInfo: TokenInfo,
    forceRefetch?: boolean
  ): Promise<ProjectInfo | null>;
  async getProjectInfo(
    rootPathOrRepoDataOrProjectData: string | RepoPathInputData | RepoRemoteInputData | ProjectInputData,
    tokenInfo: TokenInfo,
    forceRefetch = false
  ): Promise<ProjectInfo | null> {
    const inputData = await this.getRepoOrProjectData(rootPathOrRepoDataOrProjectData);
    const cacheId = this.getRepoCacheId(inputData, tokenInfo.accessToken);
    const cachedProjectInfo = this._projectDataCache[cacheId];
    if (cachedProjectInfo && !forceRefetch) {
      return {
        id: cachedProjectInfo.id,
        name: cachedProjectInfo.name,
        slug: cachedProjectInfo.slug,
      };
    }

    const freshProjectInfo = this.isProjectData(inputData)
      ? await this.getProject(inputData as ProjectInputData, tokenInfo)
      : await this.getMatchingProject(inputData as RepoRemoteInputData, tokenInfo);

    return !freshProjectInfo
      ? null
      : {
          id: freshProjectInfo.id,
          name: freshProjectInfo.name,
          slug: freshProjectInfo.slug,
        };
  }

  async getPolicy(rootPath: string, forceRefetch?: boolean, tokenInfo?: TokenInfo): Promise<PolicyData>;
  async getPolicy(rootPathWithProject: RepoPathInputData, forceRefetch?: boolean, tokenInfo?: TokenInfo): Promise<PolicyData>;
  async getPolicy(repoData: RepoRemoteInputData, forceRefetch?: boolean, tokenInfo?: TokenInfo): Promise<PolicyData>;
  async getPolicy(projectData: ProjectInputData, forceRefetch?: boolean, tokenInfo?: TokenInfo): Promise<PolicyData>;
  async getPolicy(
    rootPathOrRepoDataOrProjectData: string | RepoPathInputData | RepoRemoteInputData | ProjectInputData,
    forceRefetch: boolean | undefined = false,
    tokenInfo: TokenInfo | undefined = undefined
  ): Promise<PolicyData> {
    if (forceRefetch && (!tokenInfo || tokenInfo?.accessToken?.length === 0)) {
      throw new Error('Cannot force refetch without access token.');
    }

    const inputData = await this.getRepoOrProjectData(rootPathOrRepoDataOrProjectData);

    if (forceRefetch) {
      await this.synchronize(inputData as any, tokenInfo!);
    }

    const policyContent = (await this.readPolicy(inputData)) ?? {};
    const isValidPolicy = Object.keys(policyContent).length > 0;

    return {
      valid: isValidPolicy,
      path: isValidPolicy ? this.getPolicyPath(inputData) : '',
      policy: policyContent,
    };
  }

  async getSuppressions(rootPath: string, tokenInfo: TokenInfo): Promise<ApiSuppression[]>;
  async getSuppressions(rootPathWithProject: RepoPathInputData, tokenInfo: TokenInfo): Promise<ApiSuppression[]>;
  async getSuppressions(repoData: RepoRemoteInputData, tokenInfo: TokenInfo): Promise<ApiSuppression[]>;
  async getSuppressions(projectData: ProjectInputData, tokenInfo: TokenInfo): Promise<ApiSuppression[]>;
  async getSuppressions(
    rootPathOrRepoDataOrProjectData: string | RepoPathInputData | RepoRemoteInputData | ProjectInputData,
    tokenInfo: TokenInfo
  ) {
    if (!tokenInfo || tokenInfo?.accessToken?.length === 0) {
      throw new Error('Cannot fetch without access token.');
    }
    const inputData = await this.getRepoOrProjectData(rootPathOrRepoDataOrProjectData);
    const suppressions = await this.fetchSuppressionsForRepo(inputData as any, tokenInfo);
    return suppressions;
  }

  async synchronize(rootPath: string, tokenInfo: TokenInfo): Promise<PolicyData>;
  async synchronize(rootPathWithProject: RepoPathInputData, tokenInfo: TokenInfo): Promise<PolicyData>;
  async synchronize(repoData: RepoRemoteInputData, tokenInfo: TokenInfo): Promise<PolicyData>;
  async synchronize(projectData: ProjectInputData, tokenInfo: TokenInfo): Promise<PolicyData>;
  async synchronize(
    rootPathOrRepoDataOrProjectData: string | RepoPathInputData | RepoRemoteInputData | ProjectInputData,
    tokenInfo: TokenInfo
  ): Promise<PolicyData> {
    if (this._pullPromise) {
      return this._pullPromise;
    }

    const projectSlugFromInput = this.getProjectSlug(rootPathOrRepoDataOrProjectData);
    if (projectSlugFromInput) {
      this._pullPromise = this.fetchPolicyForProject({ slug: projectSlugFromInput }, tokenInfo);
      return this._pullPromise;
    }

    const repoDataOrRootPath = rootPathOrRepoDataOrProjectData as RepoRemoteInputData | string;
    const repoData =
      typeof repoDataOrRootPath === 'string' ? await this.getRootGitData(repoDataOrRootPath) : repoDataOrRootPath;
    this._pullPromise = this.fetchPolicyForRepo(repoData, tokenInfo);

    return this._pullPromise;
  }

  generateDeepLinkProjectList() {
    return this.generateDeepLink(`/dashboard/projects`);
  }

  generateDeepLinkProject(projectSlug: string) {
    return this.generateDeepLink(`/dashboard/projects/${projectSlug}`);
  }

  generateDeepLinkProjectPolicy(projectSlug: string) {
    return this.generateDeepLink(`/dashboard/projects/${projectSlug}/policy`);
  }

  generateDeepLink(path: string) {
    return this._apiHandler.generateDeepLink(path);
  }

  private async fetchPolicyForProject(projectData: ProjectInputData, tokenInfo: TokenInfo) {
    const policyData = {
      valid: false,
      path: '',
      policy: {},
    };

    try {
      const repoPolicy = await this._apiHandler.getPolicy(projectData.slug, tokenInfo);

      const policyUrl = this.generateDeepLinkProjectPolicy(projectData.slug);
      if (!repoPolicy?.data?.getProject?.policy) {
        throw new Error(
          `The '${
            repoPolicy?.data?.getProject?.name ?? projectData.slug
          }' project does not have policy defined. Configure it on ${policyUrl}.`
        );
      }

      const cacheId = this.getRepoCacheId(projectData, tokenInfo.accessToken);
      this._projectDataCache[cacheId] = {
        id: repoPolicy.data.getProject.id,
        slug: projectData.slug,
        name: repoPolicy.data.getProject.name,
        repositories: [],
      };

      const policyContent: StoragePolicyFormat = repoPolicy.data.getProject.policy.json;

      const comment = [
        ` This is remote policy downloaded from ${this._apiHandler.apiUrl}.`,
        ` You can adjust it on ${policyUrl}.`,
      ].join('\n');

      const policyPath = await this.storePolicy(policyContent, projectData, comment);
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

  private async fetchSuppressionsForRepo(repoData: RepoRemoteInputData, tokenInfo: TokenInfo) {
    try {
      const repoId = await this.getRepoId(repoData, tokenInfo);
      const {data} = (await this._apiHandler.getSuppressions(repoId, tokenInfo)) ?? {};
      return data?.getSuppressions?.data ?? [];
    } catch (error) {
      throw error;
    }
  }

  private async getRepoId(repoData: RepoRemoteInputData, tokenInfo: TokenInfo) {
    if (repoData.ownerProjectSlug) {
      const repoIdData = await this._apiHandler.getRepoId(repoData.ownerProjectSlug, repoData.owner, repoData.name, tokenInfo);

      if (!repoIdData?.data?.getProject?.repository?.id) {
        throw new Error(`The '${repoData.owner}/${repoData.name}' repository does not belong to a '${repoData.ownerProjectSlug}' project.`);
      }

      return repoIdData.data.getProject.repository.id;
    }

    const repoPath = `${repoData.provider}:${repoData.owner}/${repoData.name}`;
    const project = await this.getMatchingProject(repoData, tokenInfo);
    if (!project) {
      const projectUrl = this.generateDeepLinkProjectList();
      throw new Error(
        `The '${repoPath}' repository does not belong to any project in Monokle Cloud. Configure it on ${projectUrl}.`
      );
    }
    const projectRepo = project.repositories.find(r => r.owner === repoData.owner && r.name === repoData.name);
    if (!projectRepo) {
      throw new Error(`The '${repoPath}' repository does not belong to any project ${project.name} in Monokle Cloud.`);
    }

    return projectRepo.id;
  }

  private async fetchPolicyForRepo(repoData: RepoRemoteInputData, tokenInfo: TokenInfo) {
    const policyData = {
      valid: false,
      path: '',
      policy: {},
    };

    try {
      const repoPath = `${repoData.provider}:${repoData.owner}/${repoData.name}`;

      let repoProjectSlug = repoData.ownerProjectSlug;
      if (!repoProjectSlug) {
        const repoProject = await this.getMatchingProject(repoData, tokenInfo);

        if (!repoProject) {
          const projectUrl = this.generateDeepLinkProjectList();
          throw new Error(
            `The '${repoPath}' repository does not belong to any project in Monokle Cloud. Configure it on ${projectUrl}.`
          );
        }

        repoProjectSlug = repoProject.slug;
      }

      const repoPolicy = await this._apiHandler.getPolicy(repoProjectSlug, tokenInfo);

      const policyUrl = this.generateDeepLinkProjectPolicy(repoProjectSlug);
      if (!repoPolicy?.data?.getProject?.policy) {
        throw new Error(
          `The '${repoPath}' repository project does not have policy defined. Configure it on ${policyUrl}.`
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

  private async getMatchingProject(repoData: RepoRemoteInputData, tokenInfo: TokenInfo): Promise<ApiUserProject | null> {
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

    const repoMainProject = userData.data.me.projects.find(project => {
      return project.project.repositories.find(
        repo => repo.owner === repoData.owner && repo.name === repoData.name && repo.prChecks
      );
    });

    const repoFirstProject = userData.data.me.projects.find(project => {
      return project.project.repositories.find(repo => repo.owner === repoData.owner && repo.name === repoData.name);
    });

    const matchingProject = repoMatchingProjectBySlug ?? repoMainProject ?? repoFirstProject;

    if (matchingProject?.project) {
      const cacheId = this.getRepoCacheId(repoData, tokenInfo.accessToken);
      this._projectDataCache[cacheId] = matchingProject.project;
    }

    return matchingProject?.project ?? null;
  }

  private async getProject(projectData: ProjectInputData, tokenInfo: TokenInfo): Promise<ApiUserProject | null> {
    const projectInfo = await this._apiHandler.getProject(projectData.slug, tokenInfo);

    if (projectInfo?.data?.getProject?.id) {
      const cacheId = this.getRepoCacheId(projectData, tokenInfo.accessToken);
      this._projectDataCache[cacheId] = projectInfo.data.getProject;
    }

    return !projectInfo?.data?.getProject?.id ? null : projectInfo.data.getProject;
  }

  private async getRootGitData(rootPath: string) {
    const repoData = await this._gitHandler.getRepoRemoteData(rootPath);
    if (!repoData) {
      throw new Error(`The '${rootPath}' is not a git repository or does not have any remotes.`);
    }

    return repoData;
  }

  private getPolicyPath(inputData: RepoRemoteInputData | ProjectInputData) {
    return this._storageHandler.getStoreDataFilePath(this.getPolicyFileName(inputData));
  }

  private async storePolicy(
    policyContent: StoragePolicyFormat,
    inputData: RepoRemoteInputData | ProjectInputData,
    comment: string
  ) {
    return this._storageHandler.setStoreData(policyContent, this.getPolicyFileName(inputData), comment);
  }

  private async readPolicy(inputData: RepoRemoteInputData | ProjectInputData) {
    return this._storageHandler.getStoreData(this.getPolicyFileName(inputData));
  }

  private getPolicyFileName(inputData: RepoRemoteInputData | ProjectInputData) {
    if (this.isProjectData(inputData)) {
      return `${(inputData as ProjectInputData).slug}.policy.yaml`;
    }

    const repoData = inputData as RepoRemoteInputData;
    const provider = slugify(repoData.provider, {
      replacement: '_',
      lower: true,
      strict: true,
      locale: 'en',
      trim: true,
    });

    return `${provider}-${repoData.owner}-${repoData.name}.policy.yaml`;
  }

  private getRepoCacheId(inputData: RepoRemoteInputData | ProjectInputData, prefix: string) {
    if (this.isProjectData(inputData)) {
      return `${prefix}-${(inputData as ProjectInputData).slug}`;
    }

    const repoData = inputData as RepoRemoteInputData;
    return `${prefix}-${repoData.provider}-${repoData.owner}-${repoData.name}`;
  }

  private async getRepoOrProjectData(inputData: string | RepoPathInputData | RepoRemoteInputData | ProjectInputData): Promise<ProjectInputData | RepoRemoteInputData> {
    if (this.isProjectData(inputData)) {
      return inputData as ProjectInputData;
    }

    if (this.isRepoPathData(inputData)) {
      const gitData = await this.getRootGitData((inputData as RepoPathInputData).path);
      return {
        ...gitData,
        ownerProjectSlug: (inputData as RepoPathInputData).ownerProjectSlug,
      };
    }

    return typeof inputData === 'string' ? await this.getRootGitData(inputData) : inputData as RepoRemoteData;
  }

  private isProjectData(projectData: any) {
    return Object.keys(projectData).length === 1 && projectData.slug;
  }

  private isRepoPathData(repoData: any) {
    return (Object.keys(repoData).length === 1 || Object.keys(repoData).length === 2) && repoData.path;
  }

  private getProjectSlug(input: any) {
    return this.isProjectData(input) || input.ownerProjectSlug?.length > 0 ?
      input.slug ?? input.ownerProjectSlug :
      undefined;
  }
}
