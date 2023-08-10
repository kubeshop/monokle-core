import {EventEmitter} from 'events';
import {StorageHandlerPolicy} from '../handlers/storageHandlerPolicy.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {GitHandler} from '../handlers/gitHandler.js';

export class Synchronizer extends EventEmitter {
  private _isPulling = false;
  private _pullPromise: Promise<void> | undefined;

  constructor(
    private storageHandler: StorageHandlerPolicy,
    private apiHandler: ApiHandler,
    private gitHandler: GitHandler
  ) {
    super();
  }

  async synchronize(rootPath: string, accessToken: string) {
    if (this._isPulling) {
      return this._pullPromise;
    }

    this._isPulling = true;
    this._pullPromise = this.fetchPolicy(rootPath, accessToken);

    return this._pullPromise;
  }

  private async fetchPolicy(rootPath: string, accessToken: string) {
    const userData = await this.apiHandler.getUser(accessToken);

    console.log('userData', userData);

    if (!userData?.data?.me) {
      console.error('Cannot fetch user data, make sure you are authenticated and have internet access.');
      return;
    }

    const repoData = await this.gitHandler.getRepoRemoteData(rootPath);
    if (!repoData) {
      console.error(`The '${rootPath}' repository does not have any remotes.`);
      return;
    }

    const repoMainProject = userData.data.me.projects.find(project => {
      return project.project.repositories.find(
        repo => repo.owner === repoData.owner && repo.name === repoData.name && repo.prChecks
      );
    });

    const repoFirstProject = userData.data.me.projects.find(project => {
      return project.project.repositories.find(repo => repo.owner === repoData.owner && repo.name === repoData.name);
    });

    const repoProject = repoMainProject ?? repoFirstProject;

    console.log('repoId', rootPath, repoData, repoMainProject, repoFirstProject);

    if (!repoProject) {
      // const projectUrl = getMonokleCloudUrl(globals.remotePolicyUrl, `/dashboard/projects`);
      // raiseCannotGetPolicyError(
      //   `The '${folder.name}' repository does not belong to any project in Monokle Cloud. Configure it and run ''Monokle: Synchronize' command.`,
      //   [{
      //     title: 'Configure project',
      //     callback: () => {
      //       env.openExternal(Uri.parse(projectUrl));
      //     }
      //   }]
      // );
      return;
    }

    const repoPolicy = await this.apiHandler.getPolicy(repoProject.project.slug, accessToken);

    console.log('repoPolicy', repoPolicy);

    const policyUrl = ''; // getMonokleCloudUrl(globals.remotePolicyUrl, `/dashboard/projects/${repoProject.project.slug}/policy`);
    if (!repoPolicy?.data?.getProject?.policy) {
      // raiseCannotGetPolicyError(
      //   `The '${folder.name}' repository project does not have policy defined. Configure it and run ''Monokle: Synchronize' command.`,
      //   [{
      //     title: 'Configure policy',
      //     callback: () => {
      //       env.openExternal(Uri.parse(policyUrl));
      //     }
      //   }]
      // );
      return;
    }

    // const commentBefore = [
    //   ` This is remote policy downloaded from ${globals.remotePolicyUrl}.`,
    //   ` You can adjust it on ${policyUrl}.`,
    // ].join('\n');

    // saveConfig(
    //   repoPolicy.data.getProject.policy.json,
    //   globals.storagePath,
    //   `${folder.id}${REMOTE_POLICY_FILE_SUFFIX}`,
    //   {commentBefore}
    // );

    const fileName = `${repoData.provider}-${repoData.owner}-${repoData.name}.policy.yaml`;
    this.storageHandler.setStoreData(repoPolicy.data.getProject.policy.json, fileName);

    this._isPulling = false;
    this._pullPromise = undefined;
  }
}
