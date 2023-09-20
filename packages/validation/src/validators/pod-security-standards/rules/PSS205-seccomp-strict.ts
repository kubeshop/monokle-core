import {PSS_RELATIONS} from '../../../taxonomies/pss.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

const ALLOWED = ['RuntimeDefault', 'Localhost'];
const ALLOWED_STRING = ALLOWED.join(', ');

export const seccompStrict = defineRule({
  id: 205,
  description: 'Enforce a valid seccomp profile to be set.',
  fullDescription: `Seccomp profile must be explicitly set to one of the allowed values. Allowed values are ${ALLOWED_STRING}.`,
  help: "Set 'securityContext.seccompProfile.type' to an allowed value.",
  advanced: {
    enabled: false,
    severity: 5,
    relationships: [PSS_RELATIONS['restricted']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      // The container fields may be undefined/nil if the pod-level spec.securityContext.seccompProfile.type field is set appropriately.
      // Conversely, the pod-level field may be undefined/nil if _all_ container- level fields are set.
      let allContainersSet = true;

      const podSecType = pod.securityContext?.seccompProfile?.type;
      const podValid = podSecType && ALLOWED.includes(podSecType);

      pod.initContainers?.forEach((container, index) => {
        const secType = container.securityContext?.seccompProfile?.type;
        const valid = podValid || (secType && ALLOWED.includes(secType));
        if (valid) return;
        allContainersSet = false;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.seccompProfile.type`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const secType = container.securityContext?.seccompProfile?.type;
        const valid = podValid || (secType && ALLOWED.includes(secType));
        if (valid) return;
        allContainersSet = false;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.seccompProfile.type`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const secType = container.securityContext?.seccompProfile?.type;
        const valid = podValid || (secType && ALLOWED.includes(secType));
        if (valid) return;
        allContainersSet = false;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.seccompProfile.type`,
        });
      });

      if (!allContainersSet) {
        report(resource, {path: `${prefix}.securityContext.seccompProfile.type`});
      }
    });
  },
  fix({resource, path}, {set}) {
    set(resource, path, 'RuntimeDefault');
    return {description: 'Changes profile to RuntimeDefault.'};
  },
});
