import {Role, ClusterRole} from 'kubernetes-types/rbac/v1.js';
import {defineRule} from '../../custom/config.js';
import {isRole} from '../../custom/schemas/role.rbac.authorization.k8s.io.v1.js';
import {isClusterRole} from '../../custom/schemas/clusterrole.rbac.authorization.k8s.io.v1.js';
import {NSA_RELATIONS} from '../../../taxonomies/nsa.js';

export const noPodExecute = defineRule({
  id: 108,
  description: 'Disallow permissions to exec on pods',
  help: "Do not include 'pods/exec' in 'spec.rules[x].resourcess",
  advanced: {
    severity: 5,
    relationships: [NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    resources.filter(isTarget).forEach((role, index) => {
      role.rules?.forEach(rule => {
        const isValid = rule.resources?.includes('pods/exec');
        if (isValid) return;
        report(role, {path: `spec.rules.${index}.resources`});
      });
    });
  },
});

function isTarget(r: any): r is Role | ClusterRole {
  return isRole(r) || isClusterRole(r);
}
