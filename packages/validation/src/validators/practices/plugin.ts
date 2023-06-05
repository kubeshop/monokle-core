import {definePlugin} from '../custom/config.js';
import {dropCapabilities} from './rules/KBP103-drop-capabilities.js';
import {noSysAdmin} from './rules/KBP100-no-sys-admin.js';
import {noMountedDockerSock} from './rules/KBP101-no-mounted-docker-sock.js';
import {cpuLimit} from './rules/KBP003-cpu-limit.js';
import {noLatestImage} from './rules/KBP001-no-latest-image.js';
import {noWritableFs} from './rules/KBP102-no-writable-fs.js';
import {cpuRequest} from './rules/KBP002-cpu-request.js';
import {memoryRequest} from './rules/KBP004-memory-request.js';
import {memoryLimit} from './rules/KBP005-memory-limit.js';
import {noLowUserId} from './rules/KBP104-no-low-user-id.js';
import {noLowGroupId} from './rules/KBP105-no-low-group-id.js';
import {noRootGroup} from './rules/KBP109-no-root-group.js';
import {noPodExecute} from './rules/KBP108-noPodExecute.js';
import {noPodCreate} from './rules/KBP107-noPodCreate.js';
import {noAutomountServiceAccountToken} from './rules/KBP106-noAutomountServiceAccountToken.js';
import {highAvailable} from './rules/KBP006-high-available.js';

export default definePlugin({
  id: 'KBP',
  name: 'practices',
  displayName: 'Practices',
  description: 'Common practices you can use to further improve your Kubernetes deployments.',
  rules: {
    dropCapabilities,
    noSysAdmin,
    noMountedDockerSock,
    cpuLimit,
    noLatestImage,
    highAvailable,
    noWritableFs,
    cpuRequest,
    memoryRequest,
    memoryLimit,
    noLowUserId,
    noLowGroupId,
    noRootGroup,
    noPodExecute,
    noPodCreate,
    noAutomountServiceAccountToken,
  },
});
