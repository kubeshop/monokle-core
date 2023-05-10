import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const hostNamespaces = defineRule({
  id: 102,
  description: 'Sharing the host namespaces must be disallowed.',
  fullDescription: 'Sharing host namespaces is a critical privilege escalation.',
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
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
});
