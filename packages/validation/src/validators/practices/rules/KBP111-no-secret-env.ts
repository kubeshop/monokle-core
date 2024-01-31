import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

const SECRET_LIKE_NAMES = ['SECRET'];

export const noSecretEnv = defineRule({
  id: 111,
  description: 'Disallow secrets in environment variables',
  fullDescription:
    'Checks whether your environment variables contains "SECRET". This practice often hints that instead a secret vault should be used.',
  help: 'Remove the variable and rely on a vault for secret management.',
  advanced: {
    enabled: false,
    severity: 3,
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.containers.forEach((container, i) => {
        container.env?.forEach((env, j) => {
          const invalid = SECRET_LIKE_NAMES.some(s => env.name.includes(s));
          if (!invalid) return;
          report(resource, {
            path: `${prefix}.containers.${i}.env.${j}.name`,
          });
        });
      });
    });
  },
});
