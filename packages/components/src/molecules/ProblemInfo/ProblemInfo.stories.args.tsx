import {ProblemInfoType} from './types';

export const LocationClickProblemInfoArgs: ProblemInfoType = {
  onLocationClick: location => {
    console.log('Location:', location);
  },
  onHelpURLClick: url => {
    console.log('URL:', url);
  },
  rule: {
    id: 'KSV003',
    name: 'drop-capabilities',
    shortDescription: {
      text: 'Require default capabilities to be dropped',
    },
    fullDescription: {
      text: 'The container should drop all default capabilities and add only those that are needed for its execution.',
    },
    helpUri: 'https://kubesec.io/basics/containers-securitycontext-capabilities-drop-index-all/',
    help: {
      text: "Add 'ALL' to containers[].securityContext.capabilities.drop.",
    },
    properties: {
      'security-severity': 2,
    },
  },
  problem: {
    ruleId: 'KSV003',
    rule: {
      index: 2,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Require default capabilities to be dropped on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
          },
          region: {
            startLine: 16,
            startColumn: 11,
            endLine: 28,
            endColumn: 1,
          },
        },
      },
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
          },
          region: {
            startLine: 16,
            startColumn: 11,
            endLine: 28,
            endColumn: 1,
          },
        },
        logicalLocations: [
          {
            kind: 'resource',
            fullyQualifiedName: 'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
};

export const MainProblemInfoArgs: ProblemInfoType = {
  onHelpURLClick: url => {
    console.log('URL:', url);
  },
  rule: {
    id: 'KSV011',
    name: 'cpu-limit',
    shortDescription: {
      text: 'Require the CPU to be limited',
    },
    fullDescription: {
      text: 'Enforcing CPU limits prevents DoS via resource exhaustion.',
    },
    helpUri:
      'https://cloud.google.com/blog/products/containers-kubernetes/kubernetes-best-practices-resource-requests-and-limits',
    help: {
      text: "Add a cpu limitation to 'spec.resources.limits.cpu'.",
    },
    properties: {
      'security-severity': 2,
    },
  },
  problem: {
    ruleId: 'KSV011',
    rule: {
      index: 8,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
    message: {
      text: 'Require the CPU to be limited on container "panda-blog".',
    },
    locations: [
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'SRCROOT',
            uri: 'vanilla-panda-blog/deployment.yaml',
          },
          region: {
            startLine: 16,
            startColumn: 11,
            endLine: 28,
            endColumn: 1,
          },
        },
      },
      {
        physicalLocation: {
          artifactLocation: {
            uriBaseId: 'RESOURCE',
            uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
          },
          region: {
            startLine: 16,
            startColumn: 11,
            endLine: 28,
            endColumn: 1,
          },
        },
        logicalLocations: [
          {
            kind: 'resource',
            fullyQualifiedName: 'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
            name: 'panda-blog',
          },
        ],
      },
    ],
  },
};
