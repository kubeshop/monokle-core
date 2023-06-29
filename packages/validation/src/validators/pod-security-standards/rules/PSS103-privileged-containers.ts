import {PSS_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const privilegedContainers = defineRule({
  id: 103,
  description: 'Restrict usage of privileged pods.',
  fullDescription: 'Privileged Pods disable most security mechanisms and must be disallowed.',
  help: "Do not set 'securityContext.privileged'.",
  advanced: {
    severity: 8,
    relationships: [PSS_RELATIONS['baseline'], PSS_RELATIONS['restricted']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.privileged);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.privileged`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.privileged);
        if (valid) return;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.privileged`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.privileged);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.privileged`,
        });
      });
    });
  },
});
