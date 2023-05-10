import {definePlugin} from '../custom/config.js';
import {noElevatedProcess} from './rules/SEC001-no-elevated-process.js';
import {dropCapabilities} from './rules/SEC003-drop-capabilities.js';
import {noSysAdmin} from './rules/SEC005-no-sys-admin.js';
import {noMountedDockerSock} from './rules/SEC006-no-mounted-docker-sock.js';
import {noHostIpc} from './rules/SEC008-no-host-ipc.js';
import {noHostNetwork} from './rules/SEC009-no-host-network.js';
import {noHostPid} from './rules/SEC010-no-host-pid.js';
import {cpuLimit} from './rules/SEC011-cpu-limit.js';
import {runAsNonRoot} from './rules/SEC012-run-as-non-root.js';
import {noLatestImage} from './rules/SEC013-no-latest-image.js';
import {noWritableFs} from './rules/SEC014-no-writable-fs.js';
import {cpuRequest} from './rules/SEC015-cpu-request.js';
import {memoryRequest} from './rules/SEC016-memory-request.js';
import {noPrivileged} from './rules/SEC017-no-privileged.js';
import {memoryLimit} from './rules/SEC018-memory-limit.js';
import {noLowUserId} from './rules/SEC020-no-low-user-id.js';
import {noLowGroupId} from './rules/SEC021-no-low-group-id.js';
import {noHostPathMounted} from './rules/SEC023-no-host-path-mounted.js';
import {noHostPortAccess} from './rules/SEC024-no-host-port-access.js';
import {noSelinux} from './rules/SEC025-no-selinux.js';
import {noProcMount} from './rules/SEC027-no-proc-mount.js';
import {noNonEphemeralVolumes} from './rules/SEC028-no-non-ehemeral-volumes.js';
import {noRootGroup} from './rules/SEC029-no-root-group.js';
import {seccompProfile} from './rules/SEC030-seccomp-profile.js';
import {hostProcess} from './rules/SEC101-host-process.js';
import {hostNamespaces} from './rules/SEC102-host-namespaces.js';
import {privilegedContainers} from './rules/SEC103-privileged-containers.js';
import {capabilities} from './rules/SEC104-capabilities.js';
import {hostPathVolumes} from './rules/SEC105-hostPath-volumes.js';
import {hostPorts} from './rules/SEC106-host-ports.js';
import {appArmor} from './rules/SEC107-app-armor.js';
import {selinux} from './rules/SEC108-selinux.js';
import {procMount} from './rules/SEC109-proc-mount.js';
import {seccomp} from './rules/SEC110-seccomp.js';
import {sysctls} from './rules/SEC111-sysctls.js';

export default definePlugin({
  id: 'SEC',
  name: 'security',
  displayName: 'Security Controls',
  description: 'Secure your Kubernetes deployments with fine-grained controls.',
  rules: {
    noElevatedProcess,
    dropCapabilities,
    noSysAdmin,
    noMountedDockerSock,
    noHostIpc,
    noHostNetwork,
    noHostPid,
    cpuLimit,
    runAsNonRoot,
    noLatestImage,
    noWritableFs,
    cpuRequest,
    memoryRequest,
    noPrivileged,
    memoryLimit,
    noLowUserId,
    noLowGroupId,
    noHostPathMounted,
    noHostPortAccess,
    noSelinux,
    noProcMount,
    noNonEphemeralVolumes,
    noRootGroup,
    seccompProfile,
    hostProcess,
    hostNamespaces,
    privilegedContainers,
    capabilities,
    hostPathVolumes,
    hostPorts,
    appArmor,
    selinux,
    procMount,
    seccomp,
    sysctls,
  },
});
