import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const cpuLimit = defineRule({
  id: 3,
  description: 'Require the CPU to be limited',
  fullDescription: 'Enforcing CPU limits prevents DoS via resource exhaustion.',
  help: "Add a cpu limitation to 'spec.resources.limits.cpu'.",
  advanced: {
    enabled: false,
    severity: 3,
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = Boolean(container.resources?.limits?.cpu);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.resources.limits.cpu`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = Boolean(container.resources?.limits?.cpu);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.resources.limits.cpu`,
        });
      });
    });
  },
});
