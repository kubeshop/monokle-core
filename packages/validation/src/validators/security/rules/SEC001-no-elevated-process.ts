import {CIS_RELATIONS, NSA_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noElevatedProcess = defineRule({
  id: 1,
  description: 'Disallow the process from elevating its privileges',
  fullDescription:
    'A program inside the container can elevate its own privileges and run as root, which might give the program control over the container and node.',
  help: "Set 'set containers[].securityContext.allowPrivilegeEscalation' to 'false'.",
  advanced: {
    severity: 5,
    relationships: [NSA_RELATIONS['kubernetes-pod-security'], CIS_RELATIONS['general']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const allowPrivilegeEscalation = container.securityContext?.allowPrivilegeEscalation;
        const valid = !allowPrivilegeEscalation;

        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.allowPrivilegeEscalation`,
        });
      });

      pod.containers.forEach((container, index) => {
        const allowPrivilegeEscalation = container.securityContext?.allowPrivilegeEscalation;
        const valid = !allowPrivilegeEscalation;
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.allowPrivilegeEscalation`,
        });
      });
    });
  },
});
