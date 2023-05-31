import {defineRule} from '../../custom/config.js';

const USED_CLUSTER_VERSION = 'v1.29';

export const noDeprecation = defineRule({
  id: 2,
  description: 'Disallow deprecated or removed API versions.',
  help: 'Update the API version to the recommended one.',
  validate({resources}, {report}) {
    resources.forEach(resource => {
      const apiVersion = resource.apiVersion ?? undefined;
      const kind = resource.kind ?? undefined;

      // console.log('------------------');
      // console.log('resource', resource);
      // console.log('apiVersion', apiVersion);
      // console.log('kind', kind);

      if (!apiVersion || !kind) {
        return;
      }

      const isDeprecatedRule = isDeprecated(apiVersion, kind);

      // console.log('isDeprecatedRule', isDeprecatedRule);

      if (isDeprecatedRule) {
        report(resource, {
          path: 'apiVersion',
          message: composeMessage(isDeprecatedRule),
        });
      }
    });
  },
});

type Deprecation = {
  kinds: string[];
  versions: string[];
  recommended: string;
  link: string;
  type: 'deprecation' | 'removal';
};

type Deprecations = {
  version: string;
  rules: Deprecation[];
};

type DeprecationError = {
  rule: Deprecation;
  kind: string;
  apiVersion: string;
};

const deprecations: Deprecations[] = [
  {
    version: 'v1.29',
    rules: [
      {
        kinds: ['FlowSchema', 'PriorityLevelConfiguration'],
        versions: ['flowcontrol.apiserver.k8s.io/v1beta2'],
        recommended: 'flowcontrol.apiserver.k8s.io/v1beta3',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#flowcontrol-resources-v129',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.22',
    rules: [
      {
        kinds: ['MutatingWebhookConfiguration', 'ValidatingWebhookConfiguration'],
        versions: ['admissionregistration.k8s.io/v1beta1'],
        recommended: 'admissionregistration.k8s.io/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#webhook-resources-v122',
        type: 'removal'
      }
    ]
  },
  {
    version: 'v1.16',
    rules: [
      {
        kinds: ['PodSecurityPolicy'],
        versions: ['extensions/v1beta1'],
        recommended: 'policy/v1beta1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#psp-v116',
        type: 'removal'
      },
      {
        kinds: ['ReplicaSet'],
        versions: ['extensions/v1beta1', 'apps/v1beta1', 'apps/v1beta2'],
        recommended: 'apps/v1',
        link: 'https://kubernetes.io/docs/reference/using-api/deprecation-guide/#replicaset-v116',
        type: 'removal'
      }
    ],
  }
];

// Versions should be sorted from newest to oldest
// We check starting from the version === cluster version
// Each apiVersion can have single error (so either it's removed or deprecated)
function isDeprecated(apiVersion: string, kind: string): DeprecationError | null {
  const deprecationsFromNewest = deprecations.sort((d1, d2) => {
    return mapVersionToNr(d1.version) - mapVersionToNr(d2.version);
  });

  for (const {version, rules} of deprecationsFromNewest) {
    const clusterVersionNr = mapVersionToNr(version);
    const usedClusterVersionNr = mapVersionToNr(USED_CLUSTER_VERSION);

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
  return `The resource '${error.kind}' uses deprecated apiVersion '${error.apiVersion}', use '${error.rule.recommended}' instead. See ${error.rule.link}.`;
}
