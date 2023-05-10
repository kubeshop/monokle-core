import {CIS_RELATIONS, NSA_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const dropCapabilities = defineRule({
  id: 3,
  description: 'Require default capabilities to be dropped',
  fullDescription:
    'The container should drop all default capabilities and add only those that are needed for its execution.',
  help: "Add 'ALL' to containers[].securityContext.capabilities.drop.",
  advanced: {
    severity: 5,
    relationships: [NSA_RELATIONS['kubernetes-pod-security'], CIS_RELATIONS['general']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const droppedAllCapabilities = container.securityContext?.capabilities?.drop?.includes('ALL');
        const valid = droppedAllCapabilities;

        if (valid) return;

        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.capabilities.drop`,
        });
      });

      pod.containers.forEach((container, index) => {
        const droppedAllCapabilities = container.securityContext?.capabilities?.drop?.includes('ALL');
        const valid = droppedAllCapabilities;
        if (valid) return;

        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.capabilities.drop`,
        });
      });
    });
  },
});
