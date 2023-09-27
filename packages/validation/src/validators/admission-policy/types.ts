import {Resource} from '../../common/types.js';

export type Expression = {
  expression: string;
  message: string;
};

export type PolicyExpressionsAndFilteredResources = Record<string, {expressions: Expression[]; resources: Resource[]}>;
