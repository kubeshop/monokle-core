import {NSA_RELATIONS} from '../../../taxonomies/nsa.js';
import {PSS_RELATIONS} from '../../../taxonomies/pss.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const runningAsNonRootUser = defineRule({
  id: 204,
  description: 'Restrict running with a root user ID',
  fullDescription:
    'Containers must not set runAsUser to 0. It prevents the running image to run as a root user to ensure least privileges.',
  help: "Set 'securityContext.runAsUser' to non-zero value or leave it undefined.",
  advanced: {
    enabled: false,
    severity: 8,
    relationships: [PSS_RELATIONS['restricted'], NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const podValid = pod.securityContext?.runAsUser !== 0;
      if (!podValid) {
        report(resource, {path: `${prefix}.securityContext.runAsUser`});
      }

      pod.initContainers?.forEach((container, index) => {
        const valid = container.securityContext?.runAsUser !== 0;
        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.runAsUser`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const valid = container.securityContext?.runAsUser !== 0;
        if (valid) return;

        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.runAsUser`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = container.securityContext?.runAsUser !== 0;
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.runAsUser`,
        });
      });
    });
  },
});
