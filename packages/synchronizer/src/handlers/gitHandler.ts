import gitUrlParse from 'git-url-parse';
import {simpleGit} from 'simple-git';
import type {RemoteWithRefs} from 'simple-git';

export type RepoRemoteData = {
  provider: string;
  remote: string;
  owner: string;
  name: string;
  details?: gitUrlParse.GitUrl;
};

export const KNOWN_GIT_PROVIDERS: Record<string, string> = {
  'github.com': 'GITHUB',
};

export const GENERIC_GIT_PROVIDER = 'HTTPS';

export class GitHandler {
  async getRepoRemoteData(folderPath: string): Promise<RepoRemoteData | undefined> {
    if (!(await this.isGitRepo(folderPath))) {
      return undefined;
    }

    const remote = await this.getMainRemote(folderPath);
    if (!remote) {
      return undefined;
    }

    const url = remote.refs.push;
    try {
      const urlParts = gitUrlParse(url);

      return {
        provider: this.matchProvider(urlParts),
        remote: remote.name,
        owner: urlParts.owner,
        name: urlParts.name,
        details: urlParts,
      };
    } catch (err: any) {
      return undefined;
    }
  }

  async isGitRepo(folderPath: string) {
    try {
      await simpleGit(folderPath).status();
      return true;
    } catch (err: any) {
      return false;
    }
  }

  async getMainRemote(folderPath: string): Promise<RemoteWithRefs | undefined> {
    const remotes = await this.getRemotes(folderPath);
    return remotes.find(remote => remote.name === 'origin') ?? remotes[0];
  }

  async getRemotes(folderPath: string): Promise<RemoteWithRefs[]> {
    try {
      const git = simpleGit(folderPath);
      return await git.getRemotes(true);
    } catch (err: any) {
      if (err.message.toLowerCase().includes('not a git repository')) {
        return [];
      } else {
        throw err;
      }
    }
  }

  // Sample `gitUrlParse.GitUrl` object (as it's not fully consistent with TS typings):
  // {
  //   protocols: [ 'ssh' ],
  //   protocol: 'ssh',
  //   port: '',
  //   resource: 'github.com',
  //   host: 'github.com',
  //   user: 'git',
  //   password: '',
  //   pathname: '/kubeshop/monokle-demo.git',
  //   hash: '',
  //   search: '',
  //   href: 'git@github.com:kubeshop/monokle-demo.git',
  //   query: {},
  //   parse_failed: false,
  //   token: '',
  //   toString: [Function (anonymous)],
  //   source: 'github.com',
  //   git_suffix: true,
  //   name: 'monokle-demo',
  //   owner: 'kubeshop',
  //   commit: undefined,
  //   ref: '',
  //   filepathtype: '',
  //   filepath: '',
  //   organization: 'kubeshop',
  //   full_name: 'kubeshop/monokle-demo'
  // }
  private matchProvider(repoMetadata: gitUrlParse.GitUrl) {
    return (
      KNOWN_GIT_PROVIDERS[repoMetadata.source] ||
      KNOWN_GIT_PROVIDERS[repoMetadata.resource] ||
      KNOWN_GIT_PROVIDERS[(repoMetadata as any).host] ||
      GENERIC_GIT_PROVIDER
    );
  }
}
