import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noHostPid = defineRule({
  id: 10,
  description: 'Disallow access to host PID',
  fullDescription:
    'Sharing the host’s PID namespace allows visibility on host processes, potentially leaking information such as environment variables and configuration.',
  help: "Do not set 'spec.template.spec.hostPID' to true.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const valid = !pod?.hostPID;
      if (valid) return;
      report(resource, {
        path: `${prefix}.hostPID`,
      });
    });
  },
});
