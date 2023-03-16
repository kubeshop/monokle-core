import {ValidationOverviewType} from './types';

export const MainValidationOverviewArgs: ValidationOverviewType = {
  status: 'loaded',
  height: 800,
  validationResponse: {
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
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
          {
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
          {
            ruleId: 'KSV012',
            rule: {
              index: 9,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'error',
            message: {
              text: 'Requires the container to runs as non root user on container "panda-blog".',
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
            ruleId: 'KSV013',
            rule: {
              index: 10,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'error',
            message: {
              text: 'Disallow images with the latest tag on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'vanilla-panda-blog/deployment.yaml',
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
                    uriBaseId: 'RESOURCE',
                    uri: '31fc266e-be6e-527a-8292-469fe956c0d6',
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
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.deployment@vanilla-panda-blog/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV014',
            rule: {
              index: 11,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'error',
            message: {
              text: 'Require a read-only root file system on container "panda-blog".',
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
            ruleId: 'KSV015',
            rule: {
              index: 12,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'error',
            message: {
              text: 'Require the CPU to be requested on container "panda-blog".',
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
            ruleId: 'KSV016',
            rule: {
              index: 13,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'error',
            message: {
              text: 'Require the memory to be requested on container "panda-blog".',
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
            ruleId: 'KSV018',
            rule: {
              index: 15,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'error',
            message: {
              text: 'Require the memory to be limited on container "panda-blog".',
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
            ruleId: 'KSV020',
            rule: {
              index: 16,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'error',
            message: {
              text: 'Disallow running with a low user ID on container "panda-blog".',
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
            ruleId: 'KSV021',
            rule: {
              index: 17,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'error',
            message: {
              text: 'Disallow running with a low group ID on container "panda-blog".',
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
        tool: {
          driver: {
            name: 'open-policy-agent',
            rules: [
              {
                id: 'KSV001',
                name: 'no-elevated-process',
                shortDescription: {
                  text: 'Disallow the process from elevating its privileges',
                },
                fullDescription: {
                  text: 'A program inside the container can elevate its own privileges and run as root, which might give the program control over the container and node.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted',
                help: {
                  text: "Set 'set containers[].securityContext.allowPrivilegeEscalation' to 'false'.",
                },
                properties: {
                  problem: {
                    severity: 'warning',
                  },
                  'security-severity': 5,
                },
              },
              {
                id: 'KSV002',
                name: 'app-armor',
                shortDescription: {
                  text: 'Require a default AppArmor profile',
                },
                fullDescription: {
                  text: 'A program inside the container can bypass AppArmor protection policies.',
                },
                helpUri: 'https://kubesec.io/basics/containers-securitycontext-capabilities-drop-index-all/',
                help: {
                  text: "Remove 'container.apparmor.security.beta.kubernetes.io' annotation or set it to 'runtime/default'.",
                },
                properties: {
                  problem: {
                    severity: 'warning',
                  },
                  'security-severity': 5,
                },
              },
              {
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
              {
                id: 'KSV005',
                name: 'no-sys-admin',
                shortDescription: {
                  text: 'Disallow the SYS_ADMIN capability',
                },
                fullDescription: {
                  text: 'SYS_ADMIN gives the processes running inside the container privileges that are equivalent to root.',
                },
                helpUri: 'https://kubesec.io/basics/containers-securitycontext-capabilities-add-index-sys-admin/',
                help: {
                  text: "Remove the SYS_ADMIN capability from 'containers[].securityContext.capabilities.add'.",
                },
                defaultConfiguration: {
                  level: 'error',
                },
                properties: {
                  'security-severity': 8,
                },
              },
              {
                id: 'KSV006',
                name: 'no-mounted-docker-sock',
                shortDescription: {
                  text: 'Disallow mounteing the hostPath volume with docker.sock',
                },
                fullDescription: {
                  text: 'Mounting docker.sock from the host can give the container full root access to the host.',
                },
                helpUri: 'https://kubesec.io/basics/spec-volumes-hostpath-path-var-run-docker-sock/',
                help: {
                  text: 'Do not specify `/var/run/docker.sock` in spec.template.volumes.hostPath.path.',
                },
                defaultConfiguration: {
                  level: 'error',
                },
                properties: {
                  'security-severity': 8,
                },
              },
              {
                id: 'KSV008',
                name: 'no-host-ipc',
                shortDescription: {
                  text: 'Disallow access to host IPC namespace',
                },
                fullDescription: {
                  text: "Sharing the host's IPC namespace allows container processes to communicate with processes on the host.",
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline',
                help: {
                  text: "Do not set 'spec.template.spec.hostIPC' to true.",
                },
                defaultConfiguration: {
                  level: 'error',
                },
                properties: {
                  'security-severity': 8,
                },
              },
              {
                id: 'KSV009',
                name: 'no-host-network',
                shortDescription: {
                  text: 'Disallow access to host network',
                },
                fullDescription: {
                  text: 'Sharing the host’s network namespace permits processes in the pod to communicate with processes bound to the host’s loopback adapter.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline',
                help: {
                  text: "Do not set 'spec.template.spec.hostNetwork' to true.",
                },
                defaultConfiguration: {
                  level: 'error',
                },
                properties: {
                  'security-severity': 8,
                },
              },
              {
                id: 'KSV010',
                name: 'no-host-pid',
                shortDescription: {
                  text: 'Disallow access to host PID',
                },
                fullDescription: {
                  text: 'Sharing the host’s PID namespace allows visibility on host processes, potentially leaking information such as environment variables and configuration.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline',
                help: {
                  text: "Do not set 'spec.template.spec.hostPID' to true.",
                },
                defaultConfiguration: {
                  level: 'error',
                },
                properties: {
                  'security-severity': 8,
                },
              },
              {
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
              {
                id: 'KSV012',
                name: 'run-as-non-root',
                shortDescription: {
                  text: 'Requires the container to runs as non root user',
                },
                fullDescription: {
                  text: '"runAsNonRoot" forces the running image to run as a non-root user to ensure least privileges.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted',
                help: {
                  text: "Set 'containers[].securityContext.runAsNonRoot' to true.",
                },
                properties: {
                  'security-severity': 5,
                },
              },
              {
                id: 'KSV013',
                name: 'no-latest-image',
                shortDescription: {
                  text: 'Disallow images with the latest tag',
                },
                fullDescription: {
                  text: "It is best to avoid using the ':latest' image tag when deploying containers in production. Doing so makes it hard to track which version of the image is running, and hard to roll back the version.",
                },
                helpUri: 'https://kubernetes.io/docs/concepts/configuration/overview/#container-images',
                help: {
                  text: "Use a specific container image tag that is not 'latest'.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
              {
                id: 'KSV014',
                name: 'no-writable-fs',
                shortDescription: {
                  text: 'Require a read-only root file system',
                },
                fullDescription: {
                  text: 'An immutable root file system prevents applications from writing to their local disk. This can limit intrusions, as attackers will not be able to tamper with the file system or write foreign executables to disk.',
                },
                helpUri: 'https://kubesec.io/basics/containers-securitycontext-readonlyrootfilesystem-true/',
                help: {
                  text: "Change 'containers[].securityContext.readOnlyRootFilesystem' to 'true'.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
              {
                id: 'KSV015',
                name: 'cpu-request',
                shortDescription: {
                  text: 'Require the CPU to be requested',
                },
                fullDescription: {
                  text: 'When containers have resource requests specified, the scheduler can make better decisions about which nodes to place pods on, and how to deal with resource contention.',
                },
                helpUri: 'https://kubesec.io/basics/containers-securitycontext-capabilities-drop-index-all/',
                help: {
                  text: "Set 'containers[].resources.requests.cpu'.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
              {
                id: 'KSV016',
                name: 'memory-request',
                shortDescription: {
                  text: 'Require the memory to be requested',
                },
                fullDescription: {
                  text: 'When containers have memory requests specified, the scheduler can make better decisions about which nodes to place pods on, and how to deal with resource contention.',
                },
                helpUri: 'https://kubesec.io/basics/containers-resources-limits-memory/',
                help: {
                  text: "Set 'containers[].resources.requests.memory'.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
              {
                id: 'KSV017',
                name: 'no-privileged',
                shortDescription: {
                  text: 'Disallow the use of privileged containers',
                },
                fullDescription: {
                  text: 'Privileged containers share namespaces with the host system and do not offer any security. They should be used exclusively for system containers that require high privileges.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline',
                help: {
                  text: "Change 'containers[].securityContext.privileged' to false",
                },
                defaultConfiguration: {
                  level: 'error',
                },
                properties: {
                  'security-severity': 8,
                },
              },
              {
                id: 'KSV018',
                name: 'memory-limit',
                shortDescription: {
                  text: 'Require the memory to be limited',
                },
                fullDescription: {
                  text: 'Enforcing memory limits prevents DoS via resource exhaustion.',
                },
                helpUri: 'https://kubesec.io/basics/containers-resources-limits-memory/',
                help: {
                  text: "Set a limit value under 'containers[].resources.limits.memory'.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
              {
                id: 'KSV020',
                name: 'no-low-user-id',
                shortDescription: {
                  text: 'Disallow running with a low user ID',
                },
                fullDescription: {
                  text: 'Force the container to run with user ID > 10000 to avoid conflicts with the host’s user table.',
                },
                helpUri: 'https://kubesec.io/basics/containers-securitycontext-runasuser/',
                help: {
                  text: "Set 'containers[].securityContext.runAsUser' to an integer > 10000.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
              {
                id: 'KSV021',
                name: 'no-low-group-id',
                shortDescription: {
                  text: 'Disallow running with a low group ID',
                },
                fullDescription: {
                  text: 'Force the container to run with group ID > 10000 to avoid conflicts with the host’s user table.',
                },
                helpUri: 'https://kubesec.io/basics/containers-securitycontext-runasuser/',
                help: {
                  text: "Set 'containers[].securityContext.runAsGroup' to an integer > 10000.",
                },
                properties: {
                  'security-severity': 5,
                },
              },
              {
                id: 'KSV023',
                name: 'no-host-mounted-path',
                shortDescription: {
                  text: 'Disallow mounting hostPath volumes',
                },
                fullDescription: {
                  text: 'HostPath volumes must be forbidden.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline',
                help: {
                  text: "Do not set 'spec.volumes[*].hostPath'.",
                },
                properties: {
                  'security-severity': 5,
                },
              },
              {
                id: 'KSV024',
                name: 'no-host-port-access',
                shortDescription: {
                  text: 'Disallow accessing the host ports',
                },
                fullDescription: {
                  text: 'HostPorts should be disallowed, or at minimum restricted to a known list.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline',
                help: {
                  text: 'Do not set spec.containers[*].ports[*].hostPort and spec.initContainers[*].ports[*].hostPort.',
                },
                defaultConfiguration: {
                  level: 'error',
                },
                properties: {
                  'security-severity': 8,
                },
              },
              {
                id: 'KSV025',
                name: 'no-selinux',
                shortDescription: {
                  text: 'Disallow custom SELinux options',
                },
                fullDescription: {
                  text: 'There should be no custom SELinux options for this container.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline',
                help: {
                  text: 'Do not set spec.securityContext.seLinuxOptions, spec.containers[*].securityContext.seLinuxOptions and spec.initContainers[*].securityContext.seLinuxOptions.',
                },
                properties: {
                  'security-severity': 5,
                },
              },
              {
                id: 'KSV027',
                name: 'no-proc-mount',
                shortDescription: {
                  text: 'Disallow setting proc masks',
                },
                fullDescription: {
                  text: 'The default /proc masks are set up to reduce attack surface, and should be required.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#baseline',
                help: {
                  text: 'Do not set spec.containers[*].securityContext.procMount and spec.initContainers[*].securityContext.procMount.',
                },
                properties: {
                  'security-severity': 5,
                },
              },
              {
                id: 'KSV028',
                name: 'no-non-emphemeral-volumes',
                shortDescription: {
                  text: 'Disallow use of non-ephemeral volume types',
                },
                fullDescription: {
                  text: 'In addition to restricting HostPath volumes, usage of non-ephemeral volume types should be limited to those defined through PersistentVolumes.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted',
                help: {
                  text: "Do not Set 'spec.volumes[*]' to any of the disallowed volume types.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
              {
                id: 'KSV029',
                name: 'no-root-group',
                shortDescription: {
                  text: 'Disallow setting runAsGroup to zero.',
                },
                fullDescription: {
                  text: 'Containers should be forbidden from running with a root primary or supplementary GID.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted',
                help: {
                  text: "containers[].securityContext.runAsGroup' to a non-zero integer or leave undefined.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
              {
                id: 'KSV030',
                name: 'seccomp-profile',
                shortDescription: {
                  text: 'Require a Seccomp profile',
                },
                fullDescription: {
                  text: 'The RuntimeDefault seccomp profile must be required, or allow specific additional profiles.',
                },
                helpUri: 'https://kubernetes.io/docs/concepts/security/pod-security-standards/#restricted',
                help: {
                  text: "Set 'spec.securityContext.seccompProfile.type', 'spec.containers[*].securityContext.seccompProfile' and 'spec.initContainers[*].securityContext.seccompProfile' to 'RuntimeDefault' or undefined.",
                },
                properties: {
                  'security-severity': 2,
                },
              },
            ],
          },
        },
      },
      {
        results: [
          {
            ruleId: 'K8S001',
            rule: {
              index: 0,
              toolComponent: {
                name: 'kubernetes-schema',
              },
            },
            level: 'error',
            message: {
              text: 'Value at /spec/template/spec/containers/0/ports/0/name should be string',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'vanilla-panda-blog/deployment.yaml',
                  },
                  region: {
                    startLine: 19,
                    startColumn: 21,
                    endLine: 19,
                    endColumn: 23,
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
                    startLine: 19,
                    startColumn: 21,
                    endLine: 19,
                    endColumn: 23,
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
            ruleId: 'K8S001',
            rule: {
              index: 0,
              toolComponent: {
                name: 'kubernetes-schema',
              },
            },
            level: 'error',
            message: {
              text: 'Value at /spec/selector/matchLabels should be string',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'vanilla-panda-blog/service.yaml',
                  },
                  region: {
                    startLine: 9,
                    startColumn: 7,
                    endLine: 10,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '31fc266e-be6e-527a-8292-469fe956c0d1',
                  },
                  region: {
                    startLine: 9,
                    startColumn: 7,
                    endLine: 10,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.service@vanilla-panda-blog/service.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
        ],
        tool: {
          driver: {
            name: 'kubernetes-schema',
            rules: [
              {
                id: 'K8S001',
                name: 'schema-violated',
                shortDescription: {
                  text: 'The resource is formatted incorrectly.',
                },
                fullDescription: {
                  text: 'The resource is violating the schema violation. The Kubernetes API will not accept this resource.',
                },
                help: {
                  text: 'Check whether the property is used correctly. You can hover the key for documentation.',
                },
              },
            ],
          },
        },
      },
    ],
  },
};
