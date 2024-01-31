import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const imageTagged = defineRule({
  id: 116,
  description: 'Require images to be tagged.',
  fullDescription:
    'Untagged images will pull undetermined image versions. Adding explicit tags makes it easy to understand what is deployed and helps with rollbacks in case of problems.',
  help: 'Add a tag to the image.',
  advanced: {
    enabled: false,
    severity: 5,
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, i) => {
        const parts = container.image?.split(':');
        const valid = parts?.at(1) !== undefined;
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${i}.image`,
        });
      });
      pod.containers.forEach((container, i) => {
        const parts = container.image?.split(':');
        const valid = parts?.at(1) !== undefined;
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${i}.image`,
        });
      });
    });
  },
});
