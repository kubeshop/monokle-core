import { ValidationOverviewType } from "./types";

export const MainValidationOverviewArgs: ValidationOverviewType = {
  height: 800,
  validationResults: [
    {
      ruleId: "KSV001",
      rule: {
        index: 0,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Disallow the process from elevating its privileges on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV003",
      rule: {
        index: 2,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require default capabilities to be dropped on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV011",
      rule: {
        index: 8,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require the CPU to be limited on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV012",
      rule: {
        index: 9,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Requires the container to runs as non root user on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV013",
      rule: {
        index: 10,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Disallow images with the latest tag on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
            },
            region: {
              startLine: 17,
              startColumn: 18,
              endLine: 17,
              endColumn: 35,
            },
          },
        },
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
            },
            region: {
              startLine: 17,
              startColumn: 18,
              endLine: 17,
              endColumn: 35,
            },
          },
          logicalLocations: [
            {
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV014",
      rule: {
        index: 11,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require a read-only root file system on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV015",
      rule: {
        index: 12,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require the CPU to be requested on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV016",
      rule: {
        index: 13,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require the memory to be requested on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV018",
      rule: {
        index: 15,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Require the memory to be limited on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV020",
      rule: {
        index: 16,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Disallow running with a low user ID on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
    {
      ruleId: "KSV021",
      rule: {
        index: 17,
        toolComponent: {
          name: "open-policy-agent",
        },
      },
      level: "warning",
      message: {
        text: 'Disallow running with a low group ID on container "panda-blog".',
      },
      locations: [
        {
          physicalLocation: {
            artifactLocation: {
              uriBaseId: "SRCROOT",
              uri: "vanilla-panda-blog/deployment.yaml",
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
              uriBaseId: "RESOURCE",
              uri: "31fc266e-be6e-527a-8292-469fe956c0d6",
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
              kind: "resource",
              fullyQualifiedName: "panda-blog.deployment@vanilla-panda-blog/deployment.yaml",
              name: "panda-blog",
            },
          ],
        },
      ],
    },
  ],
};
