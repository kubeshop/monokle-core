import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noLatestImage = defineRule({
  id: 13,
  description: 'Disallow images with the latest tag',
  fullDescription:
    "It is best to avoid using the ':latest' image tag when deploying containers in production. Doing so makes it hard to track which version of the image is running, and hard to roll back the version.",
  help: "Use a specific container image tag that is not 'latest'.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = !container.image?.endsWith(':latest');
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.image`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = !container.image?.endsWith(':latest');
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.image`,
        });
      });
    });
  },
});
