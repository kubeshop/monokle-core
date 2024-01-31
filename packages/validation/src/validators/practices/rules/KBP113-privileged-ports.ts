import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const privilegedPorts = defineRule({
  id: 113,
  description: 'Restrict usage of privileged ports.',
  fullDescription:
    'Privileged ports are TCP/IP port numbers lower than 1024. Normal users and processes can not use them for security reasons, but containers might map their ports to privileged ports.',
  help: 'Remove the variable and rely on a vault for secret management.',
  advanced: {
    enabled: false,
    severity: 7,
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.containers.forEach((container, i) => {
        container.ports?.forEach((p, j) => {
          const valid = p.containerPort >= 1024;
          if (valid) return;
          report(resource, {
            path: `${prefix}.containers.${i}.ports.${j}.containerPort`,
          });
        });
      });
    });
  },
});
