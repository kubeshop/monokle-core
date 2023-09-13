import slugify from 'slugify';
import {EventEmitter} from 'events';
import {StorageHandlerPolicy} from '../handlers/storageHandlerPolicy.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {GitHandler} from '../handlers/gitHandler.js';
import type {StoragePolicyFormat} from '../handlers/storageHandlerPolicy.js';
import type {RepoRemoteData} from '../handlers/gitHandler.js';
import type {ApiSuppression, ApiUserProject} from '../handlers/apiHandler.js';

export type RepoRemoteInputData = {
  provider: string;
  owner: string;
  name: string;
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

  async getProjectInfo(rootPath: string, accessToken: string, forceRefetch?: boolean): Promise<ProjectInfo | null>;
  async getProjectInfo(
    repoData: RepoRemoteData,
    accessToken: string,
    forceRefetch?: boolean
  ): Promise<ProjectInfo | null>;
  async getProjectInfo(
    projectData: ProjectInputData,
    accessToken: string,
    forceRefetch?: boolean
  ): Promise<ProjectInfo | null>;
  async getProjectInfo(
    rootPathOrRepoDataOrProjectData: string | RepoRemoteData | ProjectInputData,
    accessToken: string,
    forceRefetch = false
  ): Promise<ProjectInfo | null> {
    const inputData = await this.getRepoOrProjectData(rootPathOrRepoDataOrProjectData);
    const cacheId = this.getRepoCacheId(inputData, accessToken);
    const cachedProjectInfo = this._projectDataCache[cacheId];
    if (cachedProjectInfo && !forceRefetch) {
      return {
        id: cachedProjectInfo.id,
        name: cachedProjectInfo.name,
        slug: cachedProjectInfo.slug,
      };
    }

    const freshProjectInfo = this.isProjectData(inputData)
      ? await this.getProject(inputData as ProjectInputData, accessToken)
      : await this.getMatchingProject(inputData as RepoRemoteData, accessToken);

    return !freshProjectInfo
      ? null
      : {
          id: freshProjectInfo.id,
          name: freshProjectInfo.name,
          slug: freshProjectInfo.slug,
        };
  }

  async getPolicy(rootPath: string, forceRefetch?: boolean, accessToken?: string): Promise<PolicyData>;
  async getPolicy(repoData: RepoRemoteData, forceRefetch?: boolean, accessToken?: string): Promise<PolicyData>;
  async getPolicy(projectData: ProjectInputData, forceRefetch?: boolean, accessToken?: string): Promise<PolicyData>;
  async getPolicy(
    rootPathOrRepoDataOrProjectData: string | RepoRemoteData | ProjectInputData,
    forceRefetch = false,
    accessToken = ''
  ): Promise<PolicyData> {
    if (forceRefetch && (!accessToken || accessToken?.length === 0)) {
      throw new Error('Cannot force refetch without access token.');
    }

    const inputData = await this.getRepoOrProjectData(rootPathOrRepoDataOrProjectData);

    if (forceRefetch) {
      await this.synchronize(inputData as any, accessToken);
    }

    const policyContent = (await this.readPolicy(inputData)) ?? {};
    const isValidPolicy = Object.keys(policyContent).length > 0;

    return {
      valid: isValidPolicy,
      path: isValidPolicy ? this.getPolicyPath(inputData) : '',
      policy: policyContent,
    };
  }

  async getSuppressions(rootPath: string, accessToken: string): Promise<ApiSuppression[]>;
  async getSuppressions(repoData: RepoRemoteData, accessToken: string): Promise<ApiSuppression[]>;
  async getSuppressions(projectData: ProjectInputData, accessToken: string): Promise<ApiSuppression[]>;
  async getSuppressions(
    rootPathOrRepoDataOrProjectData: string | RepoRemoteData | ProjectInputData,
    accessToken: string
  ) {
    if (!accessToken || accessToken?.length === 0) {
      throw new Error('Cannot fetch without access token.');
    }
    const inputData = await this.getRepoOrProjectData(rootPathOrRepoDataOrProjectData);
    const suppressions = await this.fetchSuppressionsForRepo(inputData as any, accessToken);
    return suppressions;
  }

  async synchronize(rootPath: string, accessToken: string): Promise<PolicyData>;
  async synchronize(repoData: RepoRemoteData, accessToken: string): Promise<PolicyData>;
  async synchronize(projectData: ProjectInputData, accessToken: string): Promise<PolicyData>;
  async synchronize(
    rootPathOrRepoDataOrProjectData: string | RepoRemoteData | ProjectInputData,
    accessToken: string
  ): Promise<PolicyData> {
    if (this._pullPromise) {
      return this._pullPromise;
    }

    if (this.isProjectData(rootPathOrRepoDataOrProjectData)) {
      const projectData: ProjectInputData = rootPathOrRepoDataOrProjectData as ProjectInputData;
      this._pullPromise = this.fetchPolicyForProject(projectData, accessToken);

      return this._pullPromise;
    }

    const repoDataOrRootPath = rootPathOrRepoDataOrProjectData as RepoRemoteData | string;
    const repoData =
      typeof repoDataOrRootPath === 'string' ? await this.getRootGitData(repoDataOrRootPath) : repoDataOrRootPath;
    this._pullPromise = this.fetchPolicyForRepo(repoData, accessToken);

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

  private async fetchPolicyForProject(projectData: ProjectInputData, accessToken: string) {
    const policyData = {
      valid: false,
      path: '',
      policy: {},
    };

    try {
      const repoPolicy = await this._apiHandler.getPolicy(projectData.slug, accessToken);

      const policyUrl = this.generateDeepLinkProjectPolicy(projectData.slug);
      if (!repoPolicy?.data?.getProject?.policy) {
        throw new Error(
          `The '${
            repoPolicy?.data?.getProject?.name ?? projectData.slug
          }' project does not have policy defined. Configure it on ${policyUrl}.`
        );
      }

      const cacheId = this.getRepoCacheId(projectData, accessToken);
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

  private async fetchSuppressionsForRepo(repoData: RepoRemoteData, accessToken: string) {
    try {
      const repoId = `${repoData.provider}:${repoData.owner}/${repoData.name}`;
      const project = await this.getMatchingProject(repoData, accessToken);
      if (!project) {
        const projectUrl = this.generateDeepLinkProjectList();
        throw new Error(
          `The '${repoId}' repository does not belong to any project in Monokle Cloud. Configure it on ${projectUrl}.`
        );
      }
      const projectRepo = project.repositories.find(r => r.owner === repoData.owner && r.name === repoData.name);
      if (!projectRepo) {
        throw new Error(`The '${repoId}' repository does not belong to any project ${project.name} in Monokle Cloud.`);
      }

      const {data} = (await this._apiHandler.getSuppressions(projectRepo.id, accessToken)) ?? {};
      return data?.getSuppressions?.data ?? [];
    } catch (error) {
      throw error;
    }
  }

  private async fetchPolicyForRepo(repoData: RepoRemoteData, accessToken: string) {
    const policyData = {
      valid: false,
      path: '',
      policy: {},
    };

    try {
      const repoProject = await this.getMatchingProject(repoData, accessToken);
      const repoId = `${repoData.provider}:${repoData.owner}/${repoData.name}`;

      if (!repoProject) {
        const projectUrl = this.generateDeepLinkProjectList();
        throw new Error(
          `The '${repoId}' repository does not belong to any project in Monokle Cloud. Configure it on ${projectUrl}.`
        );
      }

      const repoPolicy = await this._apiHandler.getPolicy(repoProject.slug, accessToken);

      const policyUrl = this.generateDeepLinkProjectPolicy(repoProject.slug);
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

  private async getMatchingProject(repoData: RepoRemoteData, accessToken: string): Promise<ApiUserProject | null> {
    const userData = await this._apiHandler.getUser(accessToken);
    if (!userData?.data?.me) {
      throw new Error('Cannot fetch user data, make sure you are authenticated and have internet access.');
    }

    if (!repoData?.provider || !repoData?.owner || !repoData?.name) {
      throw new Error(`Provided invalid git repository data: '${JSON.stringify(repoData)}'.`);
    }

    const repoMainProject = userData.data.me.projects.find(project => {
      return project.project.repositories.find(
        repo => repo.owner === repoData.owner && repo.name === repoData.name && repo.prChecks
      );
    });

    const repoFirstProject = userData.data.me.projects.find(project => {
      return project.project.repositories.find(repo => repo.owner === repoData.owner && repo.name === repoData.name);
    });

    const matchingProject = repoMainProject ?? repoFirstProject;

    if (matchingProject?.project) {
      const cacheId = this.getRepoCacheId(repoData, accessToken);
      this._projectDataCache[cacheId] = matchingProject.project;
    }

    return matchingProject?.project ?? null;
  }

  private async getProject(projectData: ProjectInputData, accessToken: string): Promise<ApiUserProject | null> {
    const projectInfo = await this._apiHandler.getProject(projectData.slug, accessToken);

    if (projectInfo?.data?.getProject?.id) {
      const cacheId = this.getRepoCacheId(projectData, accessToken);
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

  private getPolicyPath(inputData: RepoRemoteData | ProjectInputData) {
    return this._storageHandler.getStoreDataFilePath(this.getPolicyFileName(inputData));
  }

  private async storePolicy(
    policyContent: StoragePolicyFormat,
    inputData: RepoRemoteData | ProjectInputData,
    comment: string
  ) {
    return this._storageHandler.setStoreData(policyContent, this.getPolicyFileName(inputData), comment);
  }

  private async readPolicy(inputData: RepoRemoteData | ProjectInputData) {
    return this._storageHandler.getStoreData(this.getPolicyFileName(inputData));
  }

  private getPolicyFileName(inputData: RepoRemoteData | ProjectInputData) {
    if (this.isProjectData(inputData)) {
      return `${(inputData as ProjectInputData).slug}.policy.yaml`;
    }

    const repoData = inputData as RepoRemoteData;
    const provider = slugify(repoData.provider, {
      replacement: '_',
      lower: true,
      strict: true,
      locale: 'en',
      trim: true,
    });

    return `${provider}-${repoData.owner}-${repoData.name}.policy.yaml`;
  }

  private getRepoCacheId(inputData: RepoRemoteData | ProjectInputData, prefix: string) {
    if (this.isProjectData(inputData)) {
      return `${prefix}-${(inputData as ProjectInputData).slug}`;
    }

    const repoData = inputData as RepoRemoteData;
    return `${prefix}-${repoData.provider}-${repoData.owner}-${repoData.name}`;
  }

  private async getRepoOrProjectData(inputData: string | RepoRemoteData | ProjectInputData) {
    if (this.isProjectData(inputData)) {
      return inputData as ProjectInputData;
    }

    return typeof inputData === 'string' ? await this.getRootGitData(inputData) : inputData;
  }

  private isProjectData(projectData: any) {
    return Object.keys(projectData).length === 1 && projectData.slug;
  }
}
