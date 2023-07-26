import {Taxonomy, reportingDescriptorRelationship} from '../common/sarif.js';

/**
 * Pod Security Standards.
 *
 * PSS defines 3 profiles (privileged, baseline and restricted)
 * which are linked to a namespace. The profile's controls are
 * checked for all resources during admission time.
 *
 * @remark Supersedes Pod Security Policies. It aims to be simple and
 * cover the 80% use case, leaving dedicated tools as Monokle,Kubewarden,
 * Kyverno and OPA Gatekeeper as alternatives for advanced use cases.
 *
 * @see https://kubernetes.io/docs/concepts/security/pod-security-standards/
 */

type PSS_TAXA_NAMES = 'privileged' | 'baseline' | 'restricted';

export const PSS_RELATIONS: Record<PSS_TAXA_NAMES, reportingDescriptorRelationship> = {
  privileged: {
    target: {
      id: 'PSS001',
      index: 0,
      toolComponent: {name: 'PSS'},
    },
  },
  baseline: {
    target: {
      id: 'PSS002',
      index: 1,
      toolComponent: {name: 'PSS'},
    },
  },
  restricted: {
    target: {
      id: 'PSS003',
      index: 2,
      toolComponent: {name: 'PSS'},
    },
  },
};

export const PSS_TAXONOMY: Taxonomy = {
  name: 'PSS',
  version: 'v0.1',
  organization: 'Kubernetes',
  shortDescription: {text: 'Pod Security Standards'},
  taxa: [
    {
      id: 'PSS001',
      name: 'privileged',
      shortDescription: {
        text: 'Unrestricted policy, providing the widest possible level of permissions. This policy allows for known privilege escalations.',
      },
    },
    {
      id: 'PSS002',
      name: 'baseline',
      shortDescription: {
        text: 'Minimally restrictive policy which prevents known privilege escalations. Allows the default (minimally specified) Pod configuration.',
      },
      relationships: [
        {
          target: {
            id: 'PSS001',
            index: 0,
            toolComponent: {name: 'PSS'},
          },
          kinds: ['superset'],
        },
      ],
    },
    {
      id: 'PSS003',
      name: 'restricted',
      shortDescription: {
        text: 'Heavily restricted policy, following current Pod hardening best practices.',
      },
      relationships: [
        {
          target: {
            id: 'PSS002',
            index: 1,
            toolComponent: {name: 'PSS'},
          },
          kinds: ['superset'],
        },
      ],
    },
  ],
};
