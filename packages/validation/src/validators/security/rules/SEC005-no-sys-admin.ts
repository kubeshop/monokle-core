import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noSysAdmin = defineRule({
  id: 5,
  description: 'Disallow the SYS_ADMIN capability',
  fullDescription:
    'The container should drop all default capabilities and add only those that are needed for its execution.',
  help: "Add 'ALL' to containers[].securityContext.capabilities.drop.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const hasSysAdminCapability = container.securityContext?.capabilities?.add?.includes('SYS_ADMIN');
        const valid = !hasSysAdminCapability;

        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.capabilities.add`,
        });
      });

      pod.containers.forEach((container, index) => {
        const hasSysAdminCapability = container.securityContext?.capabilities?.add?.includes('SYS_ADMIN');
        const valid = !hasSysAdminCapability;
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.capabilities.add`,
        });
      });
    });
  },
});
