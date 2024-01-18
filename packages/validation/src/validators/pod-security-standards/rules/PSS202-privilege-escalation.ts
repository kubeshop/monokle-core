import {NSA_RELATIONS, PSS_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const privilegeEscalation = defineRule({
  id: 202,
  description: 'Disallow the process from elevating its privileges.',
  fullDescription:
    'Privilege escalation (such as via set-user-ID or set-group-ID file mode) should not be allowed. A program inside the container can elevate its own privileges and run as root, which might give the program control over the container and node.',
  help: "Set 'securityContext.allowPrivilegeEscalation' to 'false'.",
  advanced: {
    enabled: false,
    severity: 8,
    relationships: [PSS_RELATIONS['restricted'], NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const allowPrivilegeEscalation = container.securityContext?.allowPrivilegeEscalation;
        const valid = allowPrivilegeEscalation !== undefined && !allowPrivilegeEscalation;

        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.allowPrivilegeEscalation`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const allowPrivilegeEscalation = container.securityContext?.allowPrivilegeEscalation;
        const valid = allowPrivilegeEscalation !== undefined && !allowPrivilegeEscalation;
        if (valid) return;

        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.allowPrivilegeEscalation`,
        });
      });

      pod.containers.forEach((container, index) => {
        const allowPrivilegeEscalation = container.securityContext?.allowPrivilegeEscalation;
        const valid = allowPrivilegeEscalation !== undefined && !allowPrivilegeEscalation;
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.allowPrivilegeEscalation`,
        });
      });
    });
  },
  fix({resource, path}, {set}) {
    set(resource, path, false);
    return {description: 'Disables privilege escalation. You might end up with a service with reduced functionality.'};
  },
});
