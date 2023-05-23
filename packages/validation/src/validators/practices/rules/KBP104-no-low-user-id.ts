import {NSA_RELATIONS} from '../../../taxonomies/nsa.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const noLowUserId = defineRule({
  id: 104,
  description: 'Disallow running with a low user ID',
  fullDescription: 'Force the container to run with user ID > 10000 to avoid conflicts with the host’s user table.',
  help: "Set 'containers[].securityContext.runAsUser' to an integer > 10000.",
  advanced: {
    relationships: [NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const podRunAsUser = pod.securityContext?.runAsUser;
      const podValid = podRunAsUser && podRunAsUser > 10000;

      pod.initContainers?.forEach((container, index) => {
        const runAsUser = container.securityContext?.runAsUser;
        const valid = runAsUser ? runAsUser > 10000 : podValid;
        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.runAsUser`,
        });
      });

      pod.containers.forEach((container, index) => {
        const runAsUser = container.securityContext?.runAsUser;
        const valid = runAsUser ? runAsUser > 10000 : podValid;
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.runAsUser`,
        });
      });
    });
  },
});
