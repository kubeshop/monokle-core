import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

// Duplicate of SEC024
// TODO: add rule configuration with list of known ports.
export const hostPorts = defineRule({
  id: 106,
  description: 'Restrict host path volumes.',
  fullDescription: `HostPorts should be disallowed entirely (recommended) or restricted to a known list.`,
  help: 'Do not use volumes.hostPath.',
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        container.ports?.forEach((port, portIndex) => {
          const valid = !Boolean(port.hostPort);
          if (valid) return;
          report(resource, {
            path: `${prefix}.initContainers.${index}.ports.${portIndex}.hostPort`,
          });
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        container.ports?.forEach((port, portIndex) => {
          const valid = !Boolean(port.hostPort);
          if (valid) return;
          report(resource, {
            path: `${prefix}.ephemeralContainers.${index}.ports.${portIndex}.hostPort`,
          });
        });
      });

      pod.containers?.forEach((container, index) => {
        container.ports?.forEach((port, portIndex) => {
          const valid = !Boolean(port.hostPort);
          if (valid) return;
          report(resource, {
            path: `${prefix}.containers.${index}.ports.${portIndex}.hostPort`,
          });
        });
      });
    });
  },
});
