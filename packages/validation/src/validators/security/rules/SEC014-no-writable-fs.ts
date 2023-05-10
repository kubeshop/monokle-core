import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noWritableFs = defineRule({
  id: 14,
  description: 'Require a read-only root file system',
  fullDescription:
    'An immutable root file system prevents applications from writing to their local disk. This can limit intrusions, as attackers will not be able to tamper with the file system or write foreign executables to disk.',
  help: "Change 'containers[].securityContext.readOnlyRootFilesystem' to 'true'.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const valid = Boolean(container.securityContext?.readOnlyRootFilesystem);
        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.readOnlyRootFilesystem`,
        });
      });

      pod.containers.forEach((container, index) => {
        const valid = Boolean(container.securityContext?.readOnlyRootFilesystem);
        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.readOnlyRootFilesystem`,
        });
      });
    });
  },
});
