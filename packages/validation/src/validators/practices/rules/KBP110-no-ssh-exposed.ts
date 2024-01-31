import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const noSshExposed = defineRule({
  id: 110,
  description: 'Disallow exposing ports associated with SSH',
  fullDescription:
    'Expose port 22 is prohibited, as its commonly reserved for SSH. This could give malicious actors access to your containers.',
  help: "Do not set 'containers[].ports[].containerPort to 22'.",
  advanced: {
    enabled: false,
    severity: 7,
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.containers.forEach((container, i) => {
        container.ports?.forEach((port, j) => {
          const valid = port.containerPort !== 22;
          if (valid) return;
          report(resource, {
            path: `${prefix}.containers.${i}.ports.${j}.containerPort`,
          });
        });
      });
    });
  },
});
