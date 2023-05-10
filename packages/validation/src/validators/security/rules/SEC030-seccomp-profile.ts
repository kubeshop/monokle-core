import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const seccompProfile = defineRule({
  id: 30,
  description: 'Require a Seccomp profile',
  fullDescription: 'The RuntimeDefault seccomp profile must be required, or allow specific additional profiles.',
  help: "Do not set 'securityContext.seccompProfile.type' or use 'RuntimeDefault'.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const podProfile = pod.securityContext?.seccompProfile;
      const podValid = podProfile === undefined || podProfile.type === 'RuntimeDefault';

      pod.initContainers?.forEach((container, index) => {
        const profile = container.securityContext?.seccompProfile;
        const valid = profile === undefined ? podValid : profile.type === 'RuntimeDefault';
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.seccompProfile`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const profile = container.securityContext?.seccompProfile;
        const valid = profile === undefined ? podValid : profile.type === 'RuntimeDefault';
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.seccompProfile`,
        });
      });
    });
  },
});
