import normalizeUrl from 'normalize-url';
import fetch from 'node-fetch';
import type {ApiPolicyData, ApiUserData} from '../types';

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
      policy {
        id
        json
      }
    }
  }
`;

export async function getUser(accessToken: string, apiUrl: string): Promise<ApiUserData | undefined> {
  return queryApi(getUserQuery, accessToken, apiUrl);
}

export async function getPolicy(slug: string, accessToken: string, apiUrl: string): Promise<ApiPolicyData | undefined> {
  return queryApi(getPolicyQuery, accessToken, apiUrl, {slug});
}

async function queryApi<OUT>(query: string, token: string, apiUrl: string, variables = {}): Promise<OUT | undefined> {
  const apiEndpointUrl = normalizeUrl(`${apiUrl}/graphql`);

  console.log('apiEndpointUrl', apiEndpointUrl);

  try {
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

    console.log('response', response.status, response.statusText);

    if (!response.ok) {
      console.error(
        `Connection error. Cannot fetch data from ${apiEndpointUrl}. Error '${response.statusText}' (${response.status}).`
      );
      return undefined;
    }

    return response.json() as Promise<OUT>;
  } catch (err: any) {
    console.error(`Connection error. Cannot fetch data from ${apiEndpointUrl}. Error '${err.message}.`);
    return undefined;
  }
}
