import gitUrlParse from 'git-url-parse';
import {simpleGit} from 'simple-git';
import type {RemoteWithRefs} from 'simple-git';

export type RepoRemoteData = {
  provider: string;
  remote: string;
  owner: string;
  name: string;
};

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
        provider: urlParts.source,
        remote: remote.name,
        owner: urlParts.owner,
        name: urlParts.name,
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
}
