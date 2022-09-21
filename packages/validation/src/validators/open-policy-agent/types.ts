import { loadPolicy } from '@open-policy-agent/opa-wasm';

export type LoadedPolicy = Awaited<ReturnType<typeof loadPolicy>>;
export type PolicyError = { msg?: string };

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
  rules: PolicyRule[];
};

export type Severity = 'high' | 'medium' | 'low';

export type PolicyRule = {
  id: string;
  shortDescription: {
    text: string;
  };
  longDescription: {
    text: string;
  };
  helpUri: string;
  help: {
    text: string;
  };
  properties: {
    severity: Severity;
    entrypoint?: string;
    path?: string;
  };
};
