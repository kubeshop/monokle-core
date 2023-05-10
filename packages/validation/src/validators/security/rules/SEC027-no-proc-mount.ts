import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noProcMount = defineRule({
  id: 27,
  description: 'Disallow setting proc masks',
  fullDescription: 'The default /proc masks are set up to reduce attack surface, and should be required.',
  help: 'Do not use securityContext.procMount',
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.procMount);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.procMount`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.procMount);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.procMount`,
        });
      });
    });
  },
});
