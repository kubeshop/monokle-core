import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const memoryLimit = defineRule({
  id: 5,
  description: 'Require the memory to be limited',
  fullDescription: 'Enforcing memory limits prevents DoS via resource exhaustion.',
  help: "Set 'containers[].resources.limits.memory'.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = Boolean(container.resources?.limits?.memory);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.resources.limits.memory`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = Boolean(container.resources?.limits?.memory);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.resources.limits.memory`,
        });
      });
    });
  },
});
