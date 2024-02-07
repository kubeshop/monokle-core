import normalizeUrl from 'normalize-url';
import fetch from 'node-fetch';
import {SuppressionStatus} from '@monokle/types';
import {DEFAULT_API_URL} from '../constants.js';
import {OriginConfig} from '../handlers/configHandler.js';
import type {TokenInfo} from './storageHandlerAuth.js';

const getUserQuery = `
  query getUser {
    me {
      id
      email
      projects {
        project {
          id
          slug
          name
          repositories {
            id
            projectId
            provider
            owner
            name
            prChecks
            canEnablePrChecks
          }
        }
      }
    }
  }
`;

const getProjectQuery = `
  query getProject($slug: String!) {
    getProject(input: { slug: $slug }) {
      id
      name
      slug
      repositories {
        id
        projectId
        provider
        owner
        name
        prChecks
        canEnablePrChecks
      }
    }
  }
`;

const getProjectPermissionsQuery = `
  query getProjectPermissions($slug: String!) {
    getProject(input: { slug: $slug }) {
      permissions {
        project {
          view
          update
          delete
        }
        members {
          view
          update
          delete
        }
        repositories {
          read
          write
        }
      }
    }
  }
`;

const getProjectDetailsQuery = `
  query getProjectDetails($slug: String!, $owner: String!, $name: String!, $provider: String!) {
    getProject(input: { slug: $slug }) {
      id
      name
      slug
      projectRepository: repository(input: { owner: $owner, name: $name, provider: $provider }) {
        id
        projectId
        provider
        owner
        name
      }
      permissions {
        project {
          view
          update
          delete
        }
        members {
          view
          update
          delete
        }
        repositories {
          read
          write
        }
      }
      policy {
        id
        updatedAt
      }
    }
  }
`;

const getPolicyQuery = `
  query getPolicy($slug: String!) {
    getProject(input: { slug: $slug }) {
      id
      name
      policy {
        id
        json
      }
    }
  }
`;

const getSuppressionsQuery = `
  query getSuppressions(
    $repositoryId: ID!,
    $from: String
  ) {
    getSuppressions(
      input: {
        repositoryId: $repositoryId,
        from: $from
      }
    ) {
      isSnapshot
      data {
        id
        fingerprint
        description
        location
        status
        justification
        expiresAt
        updatedAt
        createdAt
        isUnderReview
        isAccepted
        isRejected
        isExpired
        isDeleted
        repositoryId
      }
    }
  }
`;

const getRepoIdQuery = `
  query getRepoId($projectSlug: String!, $repoName: String!, $repoOwner: String!) {
    getProject(input: { slug: $projectSlug }) {
      repository(input: { name: $repoName, owner: $repoOwner }) {
        id
      }
    }
  }
`;

const toggleSuppressionMutation = `
  mutation toggleSuppression($fingerprint: String!, $repoId: ID!, $description: String!) {
    toggleSuppression(
      input: {fingerprint: $fingerprint, repository: $repoId, description: $description, skipReview: true}
    ) {
      id
      fingerprint
      description
      location
      status
      justification
      expiresAt
      updatedAt
      createdAt
      isUnderReview
      isAccepted
      isRejected
      isExpired
      isDeleted
      repositoryId
    }
  }
`;

export type ApiUserProjectRepo = {
  id: string;
  projectId: number;
  provider: string;
  owner: string;
  name: string;
  prChecks: boolean;
  canEnablePrChecks: boolean;
};

export type ApiUserProject = {
  id: number;
  slug: string;
  name: string;
  repositories: ApiUserProjectRepo[];
};

export type ApiUserData = {
  data: {
    me: {
      id: number;
      email: string;
      projects: [
        {
          project: ApiUserProject;
        }
      ];
    };
  };
};

export type ApiProjectData = {
  data: {
    getProject: ApiUserProject;
  };
};

export type ApiPolicyData = {
  data: {
    getProject: {
      id: number;
      name: string;
      policy: {
        id: string;
        json: any;
      };
    };
  };
};

export type ApiSuppression = {
  id: string;
  fingerprint: string;
  description: string;
  locations: string;
  status: SuppressionStatus;
  justification: string;
  expiresAt: string;
  updatedAt: string;
  createdAt: string;
  isUnderReview: boolean;
  isAccepted: boolean;
  isRejected: boolean;
  isExpired: boolean;
  isDeleted: boolean;
  repositoryId: string;
};

export type ApiSuppressionsData = {
  data: {
    getSuppressions: {
      isSnapshot: boolean;
      data: ApiSuppression[];
    };
  };
};

export type ApiRepoIdData = {
  data: {
    getProject: {
      repository: {
        id: string;
      };
    };
  };
};

export type ClientConfig = {
  name: string;
  version: string;
  os?: string;
  additionalData?: Record<string, string>;
};

export type ApiProjectPermissions = {
  project: {
    view: boolean,
    update: boolean,
    delete: boolean
  },
  members: {
    view: boolean,
    update: boolean,
    delete: boolean
  },
  repositories: {
    read: boolean,
    write: boolean
  }
};

export type ApiProjectPermissionsData = {
  data: {
    getProject: {
      permissions: ApiProjectPermissions
    }
  }
};

export type ApiProjectDetailsData = {
  data: {
    getProject: {
      id: number;
      slug: string;
      name: string;
      projectRepository: ApiUserProjectRepo;
      permissions: ApiProjectPermissions;
      policy: {
        id: string;
        updatedAt: string;
      }
    }
  }
};

export type getProjectDetailsInput = {
  slug: string;
  owner: string;
  name: string;
  provider:string;
}

export class ApiHandler {
  private _apiUrl: string;
  private _clientConfig: ClientConfig;
  private _originConfig?: OriginConfig;

  constructor();
  constructor(_apiUrl: string, clientConfig?: ClientConfig);
  constructor(_originConfig: OriginConfig, clientConfig?: ClientConfig);
  constructor(_apiUrlOrOriginConfig: string | OriginConfig = DEFAULT_API_URL, clientConfig?: ClientConfig) {
    if (typeof _apiUrlOrOriginConfig === 'string') {
      this._apiUrl = _apiUrlOrOriginConfig;
    } else if (
      _apiUrlOrOriginConfig !== null &&
      typeof _apiUrlOrOriginConfig === 'object' &&
      !Array.isArray(_apiUrlOrOriginConfig)
    ) {
      this._originConfig = _apiUrlOrOriginConfig;
      this._apiUrl = _apiUrlOrOriginConfig.apiOrigin;
    } else {
      this._apiUrl = DEFAULT_API_URL;
    }

    if ((this._apiUrl || '').length === 0) {
      this._apiUrl = DEFAULT_API_URL;
    }

    this._clientConfig = {
      name: clientConfig?.name || 'unknown',
      version: clientConfig?.version || 'unknown',
      os: clientConfig?.os || '',
      additionalData: clientConfig?.additionalData || {},
    };
  }

  get apiUrl() {
    return normalizeUrl(this._apiUrl);
  }

  async getUser(tokenInfo: TokenInfo): Promise<ApiUserData | undefined> {
    return this.queryApi(getUserQuery, tokenInfo);
  }

  async getProject(slug: string, tokenInfo: TokenInfo): Promise<ApiProjectData | undefined> {
    return this.queryApi(getProjectQuery, tokenInfo, {slug});
  }

  async getProjectPermissions(slug: string, tokenInfo: TokenInfo): Promise<ApiProjectPermissionsData | undefined> {
    return this.queryApi(getProjectPermissionsQuery, tokenInfo, {slug});
  }

  async getProjectDetails(input: getProjectDetailsInput, tokenInfo: TokenInfo): Promise<ApiProjectDetailsData | undefined>{
    return this.queryApi(getProjectDetailsQuery, tokenInfo, input);
  }

  async getPolicy(slug: string, tokenInfo: TokenInfo): Promise<ApiPolicyData | undefined> {
    return this.queryApi(getPolicyQuery, tokenInfo, {slug});
  }

  async getSuppressions(repositoryId: string, tokenInfo: TokenInfo, from?: string): Promise<ApiSuppressionsData | undefined> {
    return this.queryApi(getSuppressionsQuery, tokenInfo, {repositoryId, from});
  }

  async getRepoId(
    projectSlug: string,
    repoOwner: string,
    repoName: string,
    tokenInfo: TokenInfo
  ): Promise<ApiRepoIdData | undefined> {
    return this.queryApi(getRepoIdQuery, tokenInfo, {projectSlug, repoOwner, repoName});
  }

  async toggleSuppression(fingerprint: string, repoId: string, description: string, tokenInfo: TokenInfo) {
    return this.queryApi<ApiSuppression>(toggleSuppressionMutation, tokenInfo, {fingerprint, repoId, description});
  }

  generateDeepLink(path: string) {
    let appUrl = this._originConfig?.origin;

    if (!appUrl) {
      if (this.apiUrl.includes('staging.monokle.com')) {
        appUrl = 'https://app.staging.monokle.com/';
      } else if (this.apiUrl.includes('.monokle.com')) {
        appUrl = 'https://app.monokle.com/';
      } else {
        appUrl = this.apiUrl;
      }
    }

    return normalizeUrl(`${appUrl}/${path}`);
  }

  async queryApi<OUT>(query: string, tokenInfo: TokenInfo, variables = {}): Promise<OUT | undefined> {
    const apiEndpointUrl = normalizeUrl(`${this.apiUrl}/graphql`);
    const response = await this.sendRequest(apiEndpointUrl, tokenInfo, query, variables);

    if (!response.ok) {
      throw new Error(
        `Connection error. Cannot fetch data from ${apiEndpointUrl}. Error '${response.statusText}' (${response.status}).`
      );
    }

    const responseJson = await response.json();

    if (responseJson?.errors?.length > 0) {
      const error = responseJson.errors[0];
      const msg = error.message;
      const code = error.extensions?.code;

      if (msg === 'Unauthorized' || code === 'UNAUTHENTICATED') {
        throw new Error(
          `Unauthorized error. Make sure that valid auth credentials were used. Cannot fetch data from ${apiEndpointUrl}.`
        );
      }

      throw new Error(`${msg} error (code: ${code}). Cannot fetch data from ${apiEndpointUrl}.`);
    }

    return responseJson as Promise<OUT>;
  }

  private async sendRequest(apiEndpointUrl: string, tokenInfo: TokenInfo, query: string, variables = {}) {
    return fetch(apiEndpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.formatAuthorizationHeader(tokenInfo),
        'User-Agent': this.formatUserAgentHeader(this._clientConfig),
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      timeout: 30 * 1000,
    });
  }

  private formatAuthorizationHeader(tokenInfo: TokenInfo) {
    const tokenType =
      tokenInfo?.tokenType?.toLowerCase() === 'bearer' || tokenInfo?.tokenType?.toLowerCase() === 'apikey'
        ? tokenInfo.tokenType
        : 'Bearer';
    return `${tokenType} ${tokenInfo.accessToken}`;
  }

  private formatUserAgentHeader(clientConfig: ClientConfig) {
    const product = `${clientConfig.name}/${clientConfig.version}`;

    const comment = [];
    if (clientConfig.os) {
      comment.push(clientConfig.os);
    }
    if (clientConfig.additionalData) {
      comment.push(Object.entries(clientConfig.additionalData).map(([key, value]) => `${key}=${value}`));
    }

    return `${product}${comment.length > 0 ? ` (${comment.join('; ')})` : ''}`;
  }
}
