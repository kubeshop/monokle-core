import {Resource} from '../../common/types.js';
import {RuleLevel} from '../../commonExports.js';

export type Expression = {
  expression: string;
  message: string;
};

export type PolicyExpressionsAndFilteredResources = Record<
  string,
  {expressions: Expression[]; resources: Resource[]; level: RuleLevel}
>;

export type PolicyBindingFilterResponse = Record<string, {resources: Resource[]; level: RuleLevel}>;
