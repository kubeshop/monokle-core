import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noHostNetwork = defineRule({
  id: 9,
  description: 'Disallow access to host network',
  fullDescription:
    'Sharing the host’s network namespace permits processes in the pod to communicate with processes bound to the host’s loopback adapter.',
  help: "Do not set 'spec.template.spec.hostNetwork' to true.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const valid = !pod?.hostNetwork;
      if (valid) return;
      report(resource, {
        path: `${prefix}.hostNetwork`,
      });
    });
  },
});
