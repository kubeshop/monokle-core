import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

const ALLOWED = ['RuntimeDefault', 'Localhost'];
const ALLOWED_STRING = ALLOWED.join(', ');

export const seccomp = defineRule({
  id: 110,
  description: 'Prohibit unconfined seccomps.',
  fullDescription: `Unconfined seccomps can lead to privilege escalation attacks. Allowed values are ${ALLOWED_STRING}.`,
  help: 'Do not set `securityContext.seccompProfile.type` to `Unconfined`.',
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const podSecType = pod.securityContext?.seccompProfile?.type;
      const podValid = !podSecType || ALLOWED.includes(podSecType);
      if (!podValid) {
        report(resource, {path: `${prefix}.securityContext.seccompProfile.type`});
      }

      pod.initContainers?.forEach((container, index) => {
        const secType = container.securityContext?.seccompProfile?.type;
        const valid = !secType || ALLOWED.includes(secType);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.seccompProfile.type`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const secType = container.securityContext?.seccompProfile?.type;
        const valid = !secType || ALLOWED.includes(secType);
        if (valid) return;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.seccompProfile.type`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const secType = container.securityContext?.seccompProfile?.type;
        const valid = !secType || ALLOWED.includes(secType);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.seccompProfile.type`,
        });
      });
    });
  },
});
