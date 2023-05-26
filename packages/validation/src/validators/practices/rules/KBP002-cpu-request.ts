import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const cpuRequest = defineRule({
  id: 2,
  description: 'Require the CPU to be requested',
  fullDescription:
    'When containers have resource requests specified, the scheduler can make better decisions about which nodes to place pods on, and how to deal with resource contention.',
  help: "Set 'containers[].resources.requests.cpu'.",
  advanced: {
    enabled: false,
    severity: 3,
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = Boolean(container.resources?.requests?.cpu);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.resources.requests.cpu`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = Boolean(container.resources?.requests?.cpu);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.resources.requests.cpu`,
        });
      });
    });
  },
});
