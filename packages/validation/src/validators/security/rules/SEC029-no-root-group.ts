import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noRootGroup = defineRule({
  id: 29,
  description: 'Disallow setting runAsGroup to zero.',
  fullDescription: 'Containers should be forbidden from running with a root primary or supplementary GID.',
  help: "Do not set securityContext.runAsGroup' to zero.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const podValid = pod.securityContext?.runAsGroup !== 0;

      pod.initContainers?.forEach((container, index) => {
        const runAsGroup = container.securityContext?.runAsGroup;
        const valid = runAsGroup === undefined ? podValid : runAsGroup !== 0;
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.runAsGroup`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const runAsGroup = container.securityContext?.runAsGroup;
        const valid = runAsGroup === undefined ? podValid : runAsGroup !== 0;
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.runAsGroup`,
        });
      });
    });
  },
});
