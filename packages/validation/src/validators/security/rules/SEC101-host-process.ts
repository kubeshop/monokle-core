import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const hostProcess = defineRule({
  id: 101,
  description: 'Disallow access to host network',
  fullDescription: 'This enables privileged access to the Windows node.',
  help: "Do not set 'securityOptions.hostProcess'.",
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const valid = !Boolean(pod.securityContext?.windowsOptions?.hostProcess);
      if (!valid) {
        report(resource, {
          path: `${prefix}.securityContext.windowsOptions.hostProcess`,
        });
      }

      pod.initContainers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.windowsOptions?.hostProcess);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.windowsOptions.hostProcess`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.windowsOptions?.hostProcess);
        if (valid) return;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.windowsOptions.hostProcess`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.windowsOptions?.hostProcess);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.windowsOptions.hostProcess`,
        });
      });
    });
  },
});
