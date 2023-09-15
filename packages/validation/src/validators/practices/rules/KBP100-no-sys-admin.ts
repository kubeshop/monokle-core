import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const noSysAdmin = defineRule({
  id: 100,
  description: 'Disallow the SYS_ADMIN capability',
  fullDescription:
    'The container should drop all default capabilities and add only those that are needed for its execution.',
  help: "Do not include 'SYS_ADMIN' in `securityContext.capabilities.add`.",
  advanced: {
    severity: 8,
  },
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
  fix({resource, path}, {set, get}) {
    const capabilities = get(resource, path);
    if (!Array.isArray(capabilities)) return;
    set(
      resource,
      path,
      capabilities.filter(c => c !== 'SYS_ADMIN')
    );
    return {description: 'Remove the sys admin capability.'};
  },
});
