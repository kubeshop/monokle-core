import {Taxonomy, reportingDescriptorRelationship} from '../common/sarif';

/**
 * Pod Security Standards.
 *
 * PSP defines 3 profiles (privileged, baseline and restricted)
 * which are linked to a namespace. The profile's controls are
 * checked for all resources during admission time.
 *
 * @remark Supersedes Pod Security Policies. It aims to be simple and
 * cover the 80% use case, leaving dedicated tools as Monokle,Kubewarden,
 * Kyverno and OPA Gatekeeper as alternatives for advanced use cases.
 *
 * @see https://kubernetes.io/docs/concepts/security/pod-security-standards/
 */

type PSP_TAXA_NAMES = 'privileged' | 'baseline' | 'restricted';

export const PSP_RELATIONS: Record<PSP_TAXA_NAMES, reportingDescriptorRelationship> = {
  privileged: {
    target: {
      id: 'PSP001',
      index: 0,
      toolComponent: {name: 'PSP'},
    },
  },
  baseline: {
    target: {
      id: 'PSP002',
      index: 1,
      toolComponent: {name: 'PSP'},
    },
  },
  restricted: {
    target: {
      id: 'PSP003',
      index: 2,
      toolComponent: {name: 'PSP'},
    },
  },
};

export const PSP_TAXONOMY: Taxonomy = {
  name: 'PSP',
  version: 'v0.1',
  organization: 'Kubernetes',
  shortDescription: {text: 'Pod Security Standards'},
  taxa: [
    {
      id: 'PSP001',
      name: 'privileged',
      shortDescription: {
        text: 'Unrestricted policy, providing the widest possible level of permissions. This policy allows for known privilege escalations.',
      },
    },
    {
      id: 'PSP002',
      name: 'baseline',
      shortDescription: {
        text: 'Minimally restrictive policy which prevents known privilege escalations. Allows the default (minimally specified) Pod configuration.',
      },
      relationships: [
        {
          target: {
            id: 'PSP001',
            index: 0,
            toolComponent: {name: 'PSP'},
          },
          kinds: ['superset'],
        },
      ],
    },
    {
      id: 'PSP003',
      name: 'restricted',
      shortDescription: {
        text: 'Heavily restricted policy, following current Pod hardening best practices.',
      },
      relationships: [
        {
          target: {
            id: 'PSP002',
            index: 1,
            toolComponent: {name: 'PSP'},
          },
          kinds: ['superset'],
        },
      ],
    },
  ],
};
