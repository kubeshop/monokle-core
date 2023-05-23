import {definePlugin} from '../custom/config.js';
import {hostProcess} from './rules/PSS101-host-process.js';
import {hostNamespaces} from './rules/PSS102-host-namespaces.js';
import {privilegedContainers} from './rules/PSS103-privileged-containers.js';
import {capabilities} from './rules/PSS104-capabilities.js';
import {hostPathVolumes} from './rules/PSS105-hostPath-volumes.js';
import {hostPorts} from './rules/PSS106-host-ports.js';
import {appArmor} from './rules/PSS107-app-armor.js';
import {selinux} from './rules/PSS108-selinux.js';
import {procMount} from './rules/PSS109-proc-mount.js';
import {seccomp} from './rules/PSS110-seccomp.js';
import {sysctls} from './rules/PSS111-sysctls.js';
import {volumeTypes} from './rules/PSS201-volume-types.js';
import {privilegeEscalation} from './rules/PSS202-privilege-escalation.js';
import {runningAsNonRoot} from './rules/PSS203-running-as-non-root.js';
import {runningAsNonRootUser} from './rules/PSS204-running-as-non-root-user.js';
import {seccompStrict} from './rules/PSS205-seccomp-strict.js';
import {capabilitiesStrict} from './rules/PSS206-capabilities-strict.js';

export default definePlugin({
  id: 'PSS',
  name: 'pod-security-standards',
  displayName: 'Pod Security Standards',
  description: 'Essential security controls which broadly cover the security spectrum.',
  rules: {
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
    volumeTypes,
    privilegeEscalation,
    runningAsNonRoot,
    runningAsNonRootUser,
    seccompStrict,
    capabilitiesStrict,
  },
});
