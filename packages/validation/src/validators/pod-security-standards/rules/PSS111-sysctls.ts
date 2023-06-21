import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

const ALLOWED = [
  'kernel.shm_rmid_forced',
  'net.ipv4.ip_local_port_range',
  'net.ipv4.ip_unprivileged_port_start',
  'net.ipv4.tcp_syncookies',
  'net.ipv4.ping_group_range',
];
const ALLOWED_STRING = ALLOWED.join(', ');

export const sysctls = defineRule({
  id: 111,
  description: 'Restrict sysctls to a safe subset.',
  fullDescription: `Sysctls can disable security mechanisms or affect all containers on a host, and should be disallowed except for an allowed "safe" subset. A sysctl is considered safe if it is namespaced in the container or the Pod, and it is isolated from other Pods or processes on the same Node. Allowed values are ${ALLOWED_STRING}.`,
  help: 'Set `securityContext.sysctls` to one of the allowed values.',
  advanced: {
    severity: 5,
    relationships: [PSP_RELATIONS['baseline'], PSP_RELATIONS['restricted']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.securityContext?.sysctls?.forEach((sysctl, index) => {
        const valid = ALLOWED.includes(sysctl.name);
        if (valid) return;
        report(resource, {path: `${prefix}.securityContext.sysctls.${index}.name`});
      });
    });
  },
});
