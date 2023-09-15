import {NSA_RELATIONS} from '../../../taxonomies/nsa.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const noRootGroup = defineRule({
  id: 109,
  description: 'Disallow setting runAsGroup to zero.',
  fullDescription: 'Containers should be forbidden from running with a root primary or supplementary GID.',
  help: "Do not set securityContext.runAsGroup' to zero.",
  advanced: {
    severity: 5,
    relationships: [NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const podValid = pod.securityContext?.runAsGroup !== 0;

      pod.initContainers?.forEach((container, index) => {
        const runAsGroup = container.securityContext?.runAsGroup;
        const valid = runAsGroup === undefined ? podValid : runAsGroup !== 0;
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.runAsGroup`,
        });
      });

      pod.containers?.forEach((container, index) => {
        const runAsGroup = container.securityContext?.runAsGroup;
        const valid = runAsGroup === undefined ? podValid : runAsGroup !== 0;
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.runAsGroup`,
        });
      });
    });
  },
  fix({resource, path}, {set, get}) {
    const verbs = get(resource, path);
    if (!Array.isArray(verbs)) return;
    set(
      resource,
      path,
      verbs.filter(c => c !== 'execute')
    );
    return {
      description: 'Remove the execute pod permission. You might end up with a service with reduced functionality.',
    };
  },
});
