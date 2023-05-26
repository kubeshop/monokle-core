import {NSA_RELATIONS} from '../../../taxonomies/nsa.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const noLowGroupId = defineRule({
  id: 105,
  description: 'Disallow running with a low group ID',
  fullDescription: 'Force the container to run with group ID > 10000 to avoid conflicts with the host’s user table.',
  help: "Set 'containers[].securityContext.runAsGroup' to an integer > 10000.",
  advanced: {
    severity: 5,
    relationships: [NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const podRunAsGroup = pod.securityContext?.runAsGroup;
      const podValid = podRunAsGroup && podRunAsGroup > 10000;

      pod.initContainers?.forEach((container, index) => {
        const runAsGroup = container.securityContext?.runAsGroup;
        const valid = runAsGroup ? runAsGroup > 10000 : podValid;
        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.runAsGroup`,
        });
      });

      pod.containers.forEach((container, index) => {
        const runAsGroup = container.securityContext?.runAsGroup;
        const valid = runAsGroup ? runAsGroup > 10000 : podValid;
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.runAsGroup`,
        });
      });
    });
  },
});
