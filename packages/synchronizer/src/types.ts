import type {TokenSet} from 'openid-client';

export type AccessToken = {
  access_token: string;
  token_type: 'access_token';
};

export type Token = AccessToken | TokenSet;

export type StoreAuth = {
  auth?: {
    email: string;
    token: Token;
  };
};

export type AuthMethod = 'device code' | 'token';

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
      policy: {
        id: string;
        json: any;
      };
    };
  };
};
