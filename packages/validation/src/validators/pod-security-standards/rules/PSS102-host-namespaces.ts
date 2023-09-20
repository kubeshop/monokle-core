import {PSS_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const hostNamespaces = defineRule({
  id: 102,
  description: 'Sharing the host namespaces must be disallowed.',
  fullDescription: 'Sharing host namespaces is a critical privilege escalation.',
  advanced: {
    severity: 8,
    relationships: [PSS_RELATIONS['baseline'], PSS_RELATIONS['restricted']],
  },
  help: "Do not set 'spec.host(Network|PID|IPC)'.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      if (pod.hostNetwork) {
        report(resource, {path: `${prefix}.hostNetwork`});
      }
      if (pod.hostPID) {
        report(resource, {path: `${prefix}.hostPID`});
      }
      if (pod.hostIPC) {
        report(resource, {path: `${prefix}.hostIPC`});
      }
    });
  },
  fix({resource, path}, {unset}) {
    unset(resource, path);
    const isPID = path.includes('hostPID');
    const isIPC = path.includes('hostIPC');
    const remediation = isPID ? 'Removes the host PID.' : isIPC ? 'Removes the host IPC.' : 'Removes the host network.';
    const description = `${remediation} You might end up with a service with reduced functionality.`;
    return {description};
  },
});
