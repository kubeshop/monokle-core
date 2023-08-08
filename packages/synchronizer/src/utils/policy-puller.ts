// @TODO this needs bigger rework to make it generic and configurable.

// import normalizeUrl from 'normalize-url';
// import { env, Uri } from 'vscode';
// import { getWorkspaceFolders } from './workspace';
// import { getRepoRemoteData, isGitRepo } from './git';
// import { getPolicy, getUser } from './api';
// import { removeConfig, saveConfig } from './validation';
// import { REMOTE_POLICY_FILE_SUFFIX } from '../constants';
// import { raiseCannotGetPolicyError, raiseError } from './errors';
// import logger from './logger';
// import globals from './globals';
// import type { Folder } from './workspace';

// const REFETCH_POLICY_INTERVAL_MS = 1000 * 30;

// export class PolicyPuller {

//   private _isPulling = false;
//   private _pullPromise: Promise<void> | undefined;
//   private _policyFetcherId: NodeJS.Timer | undefined;

//   async refresh() {
//     if (!globals.user.isAuthenticated) {
//       return this.dispose();
//     }

//     await this.pull();
//     return this.initializePolicyFetcher();
//   }

//   async dispose() {
//     if (this._isPulling) {
//       await this._pullPromise;
//     }

//     if (this._policyFetcherId) {
//       clearInterval(this._policyFetcherId);
//       this._policyFetcherId = undefined;
//     }

//     const roots = getWorkspaceFolders();
//     for (const folder of roots) {
//       await removeConfig(
//         globals.storagePath,
//         `${folder.id}${REMOTE_POLICY_FILE_SUFFIX}`,
//       );
//     }
//   }

//   private async pull() {
//     if (this._isPulling) {
//       return this._pullPromise;
//     }

//     this._isPulling = true;
//     this._pullPromise = this.fetchPolicyFiles(getWorkspaceFolders());

//     return this._pullPromise;
//   }

//   private async fetchPolicyFiles(roots: Folder[]) {
//     await globals.refreshUserToken();

//     const userData = await getUser(globals.user.accessToken);

//     logger.log('userData', userData);

//     if (!userData?.data?.me) {
//       raiseError(
//         'Cannot fetch user data, make sure you are authenticated and have internet access.'
//       );
//       return;
//     }

//     for (const folder of roots) {
//       const gitRepo = await isGitRepo(folder.uri.fsPath);
//       if (!gitRepo) {
//         // Skip if folder is not a git repo. Warning will be shown by 'workspace.getWorkspaceConfig()' call.
//         continue;
//       }

//       const repoData = await getRepoRemoteData(folder.uri.fsPath);
//       if (!repoData) {
//         raiseCannotGetPolicyError(`The '${folder.name}' repository does not have any remotes.`);
//         continue;
//       }

//       const repoMainProject = userData.data.me.projects.find(project => {
//         return project.project.repositories.find(repo => repo.owner === repoData.owner && repo.name === repoData.name && repo.prChecks);
//       });

//       const repoFirstProject = userData.data.me.projects.find(project => {
//         return project.project.repositories.find(repo => repo.owner === repoData.owner && repo.name === repoData.name);
//       });

//       const repoProject = repoMainProject ?? repoFirstProject;

//       logger.log('repoId', folder.name, repoData, repoMainProject, repoFirstProject);

//       if (!repoProject) {
//         const projectUrl = getMonokleCloudUrl(globals.remotePolicyUrl, `/dashboard/projects`);
//         raiseCannotGetPolicyError(
//           `The '${folder.name}' repository does not belong to any project in Monokle Cloud. Configure it and run ''Monokle: Synchronize' command.`,
//           [{
//             title: 'Configure project',
//             callback: () => {
//               env.openExternal(Uri.parse(projectUrl));
//             }
//           }]
//         );
//         continue;
//       }

//       const repoPolicy = await getPolicy(repoProject.project.slug, globals.user.accessToken);

//       logger.log('repoPolicy', repoPolicy);

//       const policyUrl = getMonokleCloudUrl(globals.remotePolicyUrl, `/dashboard/projects/${repoProject.project.slug}/policy`);
//       if (!repoPolicy?.data?.getProject?.policy) {
//         raiseCannotGetPolicyError(
//           `The '${folder.name}' repository project does not have policy defined. Configure it and run ''Monokle: Synchronize' command.`,
//           [{
//             title: 'Configure policy',
//             callback: () => {
//               env.openExternal(Uri.parse(policyUrl));
//             }
//           }]
//         );
//         continue;
//       }

//       const commentBefore = [
//         ` This is remote policy downloaded from ${globals.remotePolicyUrl}.`,
//         ` You can adjust it on ${policyUrl}.`,
//       ].join('\n');

//       saveConfig(
//         repoPolicy.data.getProject.policy.json,
//         globals.storagePath,
//         `${folder.id}${REMOTE_POLICY_FILE_SUFFIX}`,
//         {commentBefore}
//       );
//     }

//     this._isPulling = false;
//     this._pullPromise = undefined;
//   }

//   private async initializePolicyFetcher() {
//     if (this._isPulling) {
//       await this._pullPromise;
//     }

//     if (this._policyFetcherId) {
//       clearInterval(this._policyFetcherId);
//       this._policyFetcherId = undefined;
//     }

//     this._policyFetcherId = setInterval(async () => {
//       this.pull();
//     }, REFETCH_POLICY_INTERVAL_MS);
//   }
// }

// function getMonokleCloudUrl(urlBase: string, urlPath: string) {
//   if (urlBase.includes('.monokle.com')) {
//     return normalizeUrl(`https://app.monokle.com/${urlPath}`);
//   } else if (urlBase.includes('.monokle.io')) {
//     return normalizeUrl(`https://saas.monokle.io/${urlPath}`);
//   }

//   // For any custom base urls we just append the path.
//   // @TODO this might need adjustment in the future for self-hosted solutions.
//   return normalizeUrl(`${urlBase}/${urlPath}`);
// }
