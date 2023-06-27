const {loadPolicy} = require('@open-policy-agent/opa-wasm');

import {RuleMetadata} from '../../common/sarif.js';

export type LoadedPolicy = Awaited<ReturnType<typeof loadPolicy>>;
export type PolicyError = {msg?: string};

export type PolicyConfig = {
  id: string;
  enabled: string;
  enabledRules: string[];
};

export type PolicyMetadata = {
  name: string;
  id: string;
  author: string;
  version: string;
  description: string;
  type: string;
  module: string;
  rules: RuleMetadata<OpaProperties>[];
};

/**
 * These are a rule's custom properties used by the OPA validator.
 */
export type OpaProperties = {
  entrypoint: string;
  path: string;
};
