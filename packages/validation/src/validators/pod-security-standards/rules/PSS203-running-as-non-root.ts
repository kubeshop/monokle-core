import {NSA_RELATIONS} from '../../../taxonomies/nsa.js';
import {PSP_RELATIONS} from '../../../taxonomies/psp.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const runningAsNonRoot = defineRule({
  id: 203,
  description: 'Requires the container to runs as non root user.',
  fullDescription:
    'Containers must be required to run as non-root users. It forces the running image to run as a non-root user to ensure least privileges.',
  help: "Set 'securityContext.runAsNonRoot' to true.",
  advanced: {
    enabled: false,
    severity: 8,
    relationships: [PSP_RELATIONS['restricted'], NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = Boolean(container.securityContext?.runAsNonRoot);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.runAsNonRoot`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const valid = Boolean(container.securityContext?.runAsNonRoot);
        if (valid) return;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.runAsNonRoot`,
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
