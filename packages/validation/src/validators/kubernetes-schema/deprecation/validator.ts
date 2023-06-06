import {Resource} from '../../../common/types.js';
import {REMOVALS} from './deprecations.js';

export type Deprecation = {
  kinds: string[];
  versions: string[];
  recommended: string | null;
  link: string;
  type: 'deprecation' | 'removal';
  clarification?: string;
};

export type Deprecations = {
  version: string;
  rules: Deprecation[];
};

export type DeprecationError = {
  rule: Deprecation;
  kind: string;
  apiVersion: string;
};

export type DeprecationMessage = {
  path: string;
  message: string;
};

export function validate(resource: Resource, clusterVersion: string): DeprecationMessage | null {
  const apiVersion = resource.apiVersion ?? undefined;
  const kind = resource.kind ?? undefined;

  if (!apiVersion || !kind) {
    return null;
  }

  const isDeprecatedRule = isDeprecated(apiVersion, kind, clusterVersion);

  if (!isDeprecatedRule) {
      return null;
  }

  return {
      path: 'apiVersion',
      message: composeMessage(isDeprecatedRule),
  };
}

function isDeprecated(apiVersion: string, kind: string, clusterVersion: string): DeprecationError | null {
  for (const {version, rules} of REMOVALS) {
    const clusterVersionNr = mapVersionToNr(version);
    const usedClusterVersionNr = mapVersionToNr(clusterVersion);

    if (clusterVersionNr > usedClusterVersionNr) {
      continue;
    }

    const rule = rules.find(rule =>
      rule.versions.includes(apiVersion) && rule.kinds.includes(kind)
    );

    if (rule) {
      return {
        rule,
        kind,
        apiVersion,
      };
    }
  }

  return null;
}

function mapVersionToNr(version: string) {
  const parts = version.replace('v', '').split('.');
  const minor = parts[1] && parts[1].length === 1 ? `0${parts[1]}` : parts[1];

  return Number(`${parts[0]}${minor}`);
}

function composeMessage(error: DeprecationError) {
  return `The resource '${error.kind}' uses ${error.rule.type === 'removal' ? 'removed' : 'deprecated'} apiVersion ` +
    `'${error.apiVersion}', use '${error.rule.recommended}' instead. See ${error.rule.link}.`;
}
