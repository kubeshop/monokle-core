import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

const ALLOWED = ['container_t', 'container_init_t', 'container_kvm_t'];
const ALLOWED_STRING = ALLOWED.join(', ');

export const selinux = defineRule({
  id: 108,
  description: 'Restrict usage of .',
  fullDescription: `Setting the SELinux type is restricted, and setting a custom SELinux user or role option is forbidden. Allowed SELinux types are ${ALLOWED_STRING}`,
  help: 'Use an allowed SELinux type and do not customize the user.',
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      // Check the SELinux type
      const type = pod.securityContext?.seLinuxOptions?.type;
      const typeValid = !type || ALLOWED.includes(type);
      if (!typeValid) {
        report(resource, {
          path: `${prefix}.securityContext.seLinuxOptions.type`,
        });
      }
      pod.initContainers?.forEach((container, index) => {
        const type = container.securityContext?.seLinuxOptions?.type;
        const typeValid = !type || ALLOWED.includes(type);
        if (typeValid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.seLinuxOptions`,
        });
      });
      pod.ephemeralContainers?.forEach((container, index) => {
        const type = container.securityContext?.seLinuxOptions?.type;
        const typeValid = !type || ALLOWED.includes(type);
        if (typeValid) return;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.seLinuxOptions`,
        });
      });
      pod.containers.forEach((container, index) => {
        const type = container.securityContext?.seLinuxOptions?.type;
        const typeValid = !type || ALLOWED.includes(type);
        if (typeValid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.seLinuxOptions`,
        });
      });

      // Check the SELinux user
      const userValid = !pod.securityContext?.seLinuxOptions?.user;
      if (!userValid) {
        report(resource, {
          path: `${prefix}.securityContext.seLinuxOptions.user`,
        });
      }
      pod.initContainers?.forEach((container, index) => {
        const userValid = !container.securityContext?.seLinuxOptions?.user;
        if (userValid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.seLinuxOptions`,
        });
      });
      pod.ephemeralContainers?.forEach((container, index) => {
        const userValid = !container.securityContext?.seLinuxOptions?.user;
        if (userValid) return;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.seLinuxOptions`,
        });
      });
      pod.containers.forEach((container, index) => {
        const userValid = !container.securityContext?.seLinuxOptions?.user;
        if (userValid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.seLinuxOptions`,
        });
      });
    });
  },
});
