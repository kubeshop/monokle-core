import {Taxonomy, reportingDescriptorRelationship} from '../common/sarif.js';

type NSA_TAXA_NAMES = 'kubernetes-pod-security' | 'networking' | 'auth' | 'threat-detection' | 'app-practices';

export const NSA_RELATIONS: Record<NSA_TAXA_NAMES, reportingDescriptorRelationship> = {
  'kubernetes-pod-security': {
    target: {
      id: 'NSA001',
      index: 0,
      toolComponent: {name: 'NSA'},
    },
  },
  networking: {
    target: {
      id: 'NSA002',
      index: 1,
      toolComponent: {name: 'NSA'},
    },
  },
  auth: {
    target: {
      id: 'NSA003',
      index: 2,
      toolComponent: {name: 'NSA'},
    },
  },
  'threat-detection': {
    target: {
      id: 'NSA004',
      index: 3,
      toolComponent: {name: 'NSA'},
    },
  },
  'app-practices': {
    target: {
      id: 'NSA005',
      index: 4,
      toolComponent: {name: 'NSA'},
    },
  },
};

export const NSA_TAXONOMY: Taxonomy = {
  name: 'NSA',
  version: 'v0.1',
  organization: 'NSA & CISA',
  shortDescription: {text: 'Kubernetes Hardening Guidance'},
  taxa: [
    {
      id: 'NSA001',
      name: 'kubernetes-pod-security',
      shortDescription: {
        text: 'Kubernetes Pod security',
      },
    },
    {
      id: 'NSA002',
      name: 'networking',
      shortDescription: {
        text: 'Network separation and hardening',
      },
    },
    {
      id: 'NSA003',
      name: 'auth',
      shortDescription: {
        text: 'Authentication and authorization',
      },
    },
    {
      id: 'NSA004',
      name: 'threat-detection',
      shortDescription: {
        text: 'Audit Logging and Threat Detection',
      },
    },
    {
      id: 'NSA005',
      name: 'app-practices',
      shortDescription: {
        text: 'Upgrading and application security practices',
      },
    },
  ],
};
