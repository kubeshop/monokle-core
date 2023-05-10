import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noHostPortAccess = defineRule({
  id: 24,
  description: 'Disallow accessing the host ports',
  fullDescription: 'HostPorts should be disallowed, or at minimum restricted to a known list.',
  help: 'Do not set containers.ports[*].hostPort',
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
