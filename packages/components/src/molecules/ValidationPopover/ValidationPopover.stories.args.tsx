import {ValidationPopoverProps} from './types';

export const MainValidationPopoverArgs: ValidationPopoverProps = {
  level: 'error',
  results: [
    {
      ruleId: 'KSV001',
      rule: {
        index: 0,
        toolComponent: {
          name: 'open-policy-agent',
        },
      },
      level: 'warning',
      message: {
        text: 'Disallow the process from elevating its privileges on container "panda-blog".',
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
    {
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
  ],
  onMessageClickHandler: undefined,
};

export const MessageClickValidationPopoverArgs: ValidationPopoverProps = {
  level: 'error',
  results: [
    {
      ruleId: 'KSV001',
      rule: {
        index: 0,
        toolComponent: {
          name: 'open-policy-agent',
        },
      },
      level: 'warning',
      message: {
        text: 'Disallow the process from elevating its privileges on container "panda-blog".',
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
    {
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
  ],
  onMessageClickHandler: result => {
    console.log('Result:', result);
  },
};
