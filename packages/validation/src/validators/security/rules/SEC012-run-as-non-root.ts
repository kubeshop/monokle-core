import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const runAsNonRoot = defineRule({
  id: 12,
  description: 'Requires the container to runs as non root user',
  fullDescription: '"runAsNonRoot" forces the running image to run as a non-root user to ensure least privileges.',
  help: "Set 'containers[].securityContext.runAsNonRoot' to true.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = Boolean(container.securityContext?.runAsNonRoot);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.runAsNonRoot`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = Boolean(container.securityContext?.runAsNonRoot);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.runAsNonRoot`,
        });
      });
    });
  },
});
