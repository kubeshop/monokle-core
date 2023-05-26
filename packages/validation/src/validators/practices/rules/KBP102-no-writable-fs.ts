import {NSA_RELATIONS} from '../../../taxonomies/nsa.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const noWritableFs = defineRule({
  id: 102,
  description: 'Require a read-only root file system',
  fullDescription:
    'An immutable root file system prevents applications from writing to their local disk. This can limit intrusions, as attackers will not be able to tamper with the file system or write foreign executables to disk.',
  help: "Change 'containers[].securityContext.readOnlyRootFilesystem' to 'true'.",
  advanced: {
    severity: 5,
    relationships: [NSA_RELATIONS['kubernetes-pod-security']],
  },
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
