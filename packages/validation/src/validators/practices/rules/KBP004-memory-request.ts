import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const memoryRequest = defineRule({
  id: 4,
  description: 'Require the memory to be requested',
  fullDescription:
    'When containers have memory requests specified, the scheduler can make better decisions about which nodes to place pods on, and how to deal with resource contention.',
  help: "Set 'containers[].resources.requests.memory'.",
  advanced: {
    enabled: false,
    severity: 3,
  },
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
  fix({resource, path}, {set}) {
    set(resource, path, '512M');
    return {description: 'Sets a memory request. You might want to tweak the value to accomodate your workload.'};
  },
});
