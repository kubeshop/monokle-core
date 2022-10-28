import { loadPolicy } from "@open-policy-agent/opa-wasm";
import { ValidationRule } from "../../common/sarif.js";

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
  rules: ValidationRule<OpaProperties>[];
};

/**
 * These are a rule's custom properties used by the OPA validator.
 */
export type OpaProperties = {
  entrypoint: string;
  path: string;
};
