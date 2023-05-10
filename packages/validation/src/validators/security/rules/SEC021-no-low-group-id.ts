import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noLowGroupId = defineRule({
  id: 21,
  description: 'Disallow running with a low group ID',
  fullDescription: 'Force the container to run with group ID > 10000 to avoid conflicts with the host’s user table.',
  help: "Set 'containers[].securityContext.runAsGroup' to an integer > 10000.",
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
