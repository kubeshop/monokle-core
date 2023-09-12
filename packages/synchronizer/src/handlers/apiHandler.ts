import normalizeUrl from 'normalize-url';
import fetch from 'node-fetch';
import {SuppressionStatus} from '@monokle/types';
import {DEFAULT_API_URL} from '../constants.js';

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
    $repositoryId: ID!
  ) {
    getSuppressions(
      input: {
        repositoryId: $repositoryId
      }
    ) {
      isSnapshot
      data {
        id
        fingerprint
        status
        isUnderReview
        isAccepted
        isRejected
        isExpired
        isDeleted
      }
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
  status: SuppressionStatus;
  isUnderReview: boolean;
  isAccepted: boolean;
  isRejected: boolean;
  isExpired: boolean;
  isDeleted: boolean;
};

export type ApiSuppressionsData = {
  data: {
    getSuppressions: {
      isSnapshot: boolean;
      data: ApiSuppression[];
    };
  };
};

export class ApiHandler {
  constructor(private _apiUrl: string = DEFAULT_API_URL) {}

  get apiUrl() {
    return normalizeUrl(this._apiUrl);
  }

  async getUser(accessToken: string): Promise<ApiUserData | undefined> {
    return this.queryApi(getUserQuery, accessToken);
  }

  async getProject(slug: string, accessToken: string): Promise<ApiProjectData | undefined> {
    return this.queryApi(getProjectQuery, accessToken, {slug});
  }

  async getPolicy(slug: string, accessToken: string): Promise<ApiPolicyData | undefined> {
    return this.queryApi(getPolicyQuery, accessToken, {slug});
  }

  async getSuppressions(repositoryId: string, accessToken: string): Promise<ApiSuppressionsData | undefined> {
    return this.queryApi(getSuppressionsQuery, accessToken, {repositoryId});
  }

  generateDeepLink(path: string) {
    if (this.apiUrl.includes('.monokle.com')) {
      return normalizeUrl(`https://app.monokle.com/${path}`);
    } else if (this.apiUrl.includes('.monokle.io')) {
      return normalizeUrl(`https://saas.monokle.io/${path}`);
    }

    // For any custom base urls we just append the path.
    // @TODO this might need adjustment in the future for self-hosted solutions.
    return normalizeUrl(`${this.apiUrl}/${path}`);
  }

  private async queryApi<OUT>(query: string, token: string, variables = {}): Promise<OUT | undefined> {
    const apiEndpointUrl = normalizeUrl(`${this.apiUrl}/graphql`);

    const response = await fetch(apiEndpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Connection error. Cannot fetch data from ${apiEndpointUrl}. Error '${response.statusText}' (${response.status}).`
      );
    }

    return response.json() as Promise<OUT>;
  }
}
