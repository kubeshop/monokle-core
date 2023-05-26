import {Role, ClusterRole} from 'kubernetes-types/rbac/v1.js';
import {defineRule} from '../../custom/config';
import {isClusterRole} from '../../custom/schemas/clusterrole.rbac.authorization.k8s.io.v1';
import {isRole} from '../../custom/schemas/role.rbac.authorization.k8s.io.v1';
import {NSA_RELATIONS} from '../../../taxonomies';

export const noPodCreate = defineRule({
  id: 107,
  description: 'Disallow permissions to create pods',
  help: "Do not include 'create' in 'spec.rules[x].verbs",
  advanced: {
    severity: 5,
    relationships: [NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    resources.filter(isTarget).forEach((role, index) => {
      role.rules?.forEach(rule => {
        const isValid = rule.verbs?.includes('create');
        if (isValid) return;
        report(role, {path: `spec.rules.${index}.verbs`});
      });
    });
  },
});

function isTarget(r: any): r is Role | ClusterRole {
  return isRole(r) || isClusterRole(r);
}
