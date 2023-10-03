import {CustomSchema, Resource} from '../../common/types.js';
import {Expression} from './types.js';

export function getCRDExpressions(schema: CustomSchema, crd: Resource): Record<string, Expression[]> {
  const expressions: Record<string, Expression[]> = {};

  const versions = crd.content?.spec?.versions;

  if (!versions?.length) return expressions;

  const [, apiName] = schema.apiVersion.split('/');

  const version = versions.find((v: any) => v.name === apiName);

  if (!version) return expressions;

  const rootRules = version.schema?.openAPIV3Schema?.['x-kubernetes-validation'];

  if (rootRules?.length) {
    expressions['<root>'] = [];

    for (const rule of rootRules) {
      expressions['<root>'].push({expression: rule.rule, message: rule.message ?? ''});
    }
  }

  const properties = version.schema?.openAPIV3Schema?.properties as Record<string, any>;

  if (!properties) return expressions;

  for (const [key, values] of Object.entries(properties)) {
    if (values['x-kubernetes-validation']?.length) {
      expressions[key] = [];

      for (const rule of values['x-kubernetes-validation']) {
        expressions[key].push({
          expression: rule.rule,
          message: rule.message,
          messageExpression: rule.messageExpression,
        });
      }
    }
  }

  return expressions;
}
