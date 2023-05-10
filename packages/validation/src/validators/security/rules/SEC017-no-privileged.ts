import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noPrivileged = defineRule({
  id: 17,
  description: 'Disallow the use of privileged containers',
  fullDescription:
    'Privileged containers share namespaces with the host system and do not offer any security. They should be used exclusively for system containers that require high privileges.',
  help: "Change 'containers[].securityContext.privileged' to false",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.privileged);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.privileged`,
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
