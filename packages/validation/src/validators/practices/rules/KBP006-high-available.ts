import {defineRule} from '../../custom/config.js';
import {isDeployment} from '../../custom/schemas/deployment.apps.v1.js';

export const highAvailable = defineRule({
  id: 6,
  description: 'Require at least two replicas',
  fullDescription: 'High availability avoids downtimes when a pod crashes.',
  help: "Set your deployment's replicas to two or higher.",
  advanced: {
    enabled: false,
    severity: 3,
  },
  validate({resources, params}, {report}) {
    resources.filter(isDeployment).forEach(deployment => {
      const replicaCount = deployment.spec?.replicas ?? 1;
      const replicaThreshold = params ?? 1;
      const valid = replicaCount > replicaThreshold;
      if (valid) return;
      report(deployment, {path: 'spec.replicas'});
    });
  },
});
