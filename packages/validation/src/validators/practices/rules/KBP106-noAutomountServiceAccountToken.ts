import {NSA_RELATIONS} from '../../../taxonomies';
import {defineRule} from '../../custom/config';
import {isServiceAccount} from '../../custom/schemas/serviceaccount.v1';
import {validatePodSpec} from '../../custom/utils';

export const noAutomountServiceAccountToken = defineRule({
  id: 106,
  description: 'Disallow automounting the service account token',
  fullDescription:
    'Most often secret tokens are unnecessarily mounted during runtime as there is no need to access the Kubernetes API server.',
  help: 'Set `automountServiceAccountToken: false`.',
  advanced: {
    enabled: false,
    severity: 3,
    relationships: [NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report, getRelated}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      const podNotAutomounted = pod.automountServiceAccountToken === false;
      if (podNotAutomounted) return;

      const serviceAccounts = getRelated(resource).filter(isServiceAccount);
      const saNotAutomounted = serviceAccounts.some(sa => sa.automountServiceAccountToken === false);
      if (saNotAutomounted) return;

      report(resource, {
        path: `${prefix}.automountServiceAccountToken`,
      });
    });
  },
});
