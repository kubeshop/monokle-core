import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const memoryRequest = defineRule({
  id: 16,
  description: 'Require the memory to be requested',
  fullDescription:
    'When containers have memory requests specified, the scheduler can make better decisions about which nodes to place pods on, and how to deal with resource contention.',
  help: "Set 'containers[].resources.requests.memory'.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = Boolean(container.resources?.requests?.memory);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.resources.requests.memory`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = Boolean(container.resources?.requests?.memory);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.resources.requests.memory`,
        });
      });
    });
  },
});
