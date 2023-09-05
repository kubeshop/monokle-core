import normalizeUrl from 'normalize-url';
import fetch from 'node-fetch';
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

export class ApiHandler {
  constructor(private _apiUrl: string = DEFAULT_API_URL) {}

  get apiUrl() {
    return normalizeUrl(this._apiUrl);
  }

  async getUser(accessToken: string): Promise<ApiUserData | undefined> {
    return this.queryApi(getUserQuery, accessToken);
  }

  async getPolicy(slug: string, accessToken: string): Promise<ApiPolicyData | undefined> {
    return this.queryApi(getPolicyQuery, accessToken, {slug});
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
