import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

// Duplicate of SEC027
export const procMount = defineRule({
  id: 109,
  description: 'Prohibit custom proc masks',
  fullDescription: `The default /proc masks are set up to reduce attack surface, and should be required.`,
  help: 'Use the default /proc masks.',
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const procMount = container.securityContext?.procMount;
        const valid = !procMount || procMount === 'Default';
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.procMount`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const procMount = container.securityContext?.procMount;
        const valid = !procMount || procMount === 'Default';
        if (valid) return;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.procMount`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const procMount = container.securityContext?.procMount;
        const valid = !procMount || procMount === 'Default';
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.procMount`,
        });
      });
    });
  },
});
