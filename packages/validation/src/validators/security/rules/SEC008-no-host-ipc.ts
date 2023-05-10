import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noHostIpc = defineRule({
  id: 8,
  description: 'Disallow access to host IPC namespace',
  fullDescription:
    "Sharing the host's IPC namespace allows container processes to communicate with processes on the host.",
  help: "Do not set 'spec.template.spec.hostIPC' to true.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const hostIPC = pod?.hostIPC;
      const valid = !hostIPC;
      if (valid) return;
      report(resource, {
        path: `${prefix}.hostIPC`,
      });
    });
  },
});
