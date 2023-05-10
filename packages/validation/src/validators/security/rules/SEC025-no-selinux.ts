import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noSelinux = defineRule({
  id: 25,
  description: 'Disallow custom SELinux options',
  fullDescription: 'There should be no custom SELinux options for this container.',
  help: 'Do not use securityContext.seLinuxOptions',
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const valid = !Boolean(pod.securityContext?.seLinuxOptions);
      if (!valid) {
        report(resource, {
          path: `${prefix}.securityContext.seLinuxOptions`,
        });
      }

      pod.initContainers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.seLinuxOptions);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.seLinuxOptions`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const valid = !Boolean(container.securityContext?.seLinuxOptions);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.seLinuxOptions`,
        });
      });
    });
  },
});
