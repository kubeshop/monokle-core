import {ValidationOverviewType} from './types';

export const MainValidationOverviewArgs: ValidationOverviewType = {
  status: 'loaded',
  height: 800,
  newProblemsIntroducedType: 'k8s-schema',
  selectedProblem: {
    ruleId: 'KSV001',
    rule: {
      id: 'KSV001',
      index: 0,
      toolComponent: {
        name: 'open-policy-agent',
      },
    },
    level: 'error',
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
  validationResponse: {
    $schema: 'https://json.schemastore.org/sarif-2.1.0.json',
    version: '2.1.0',
    runs: [
      {
        tool: {
          driver: {
            name: 'monokle',
          },
          extensions: [
            {
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
                {
                  id: 'K8S002',
                  name: 'deprecation-violated',
                  shortDescription: {
                    text: 'The resource uses deprecated "apiVersion" value.',
                  },
                  fullDescription: {
                    text: 'The resource is violating the deprecation violation. The Kubernetes API may not accept this resource or can behave unexpectedly.',
                  },
                  help: {
                    text: 'Change "apiVersion" for up-to-date value. You can hover the key for documentation.',
                  },
                },
                {
                  id: 'K8S003',
                  name: 'removal-violated',
                  shortDescription: {
                    text: 'The resource uses removed "apiVersion" value.',
                  },
                  fullDescription: {
                    text: 'The resource is violating the removal violation. The Kubernetes API may not accept this resource or can behave unexpectedly.',
                  },
                  help: {
                    text: 'Change "apiVersion" for up-to-date value. You can hover the key for documentation.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'K8S004',
                  name: 'strict-mode-violated',
                  shortDescription: {
                    text: 'The resource has unsupported or invalid "apiVersion" field value.',
                  },
                  fullDescription: {
                    text: 'The resource is violating the strict-mode violation. The resource will not be validated against Kubernetes schema.',
                  },
                  help: {
                    text: 'Not supported or invalid "apiVersion" value has been used. You can hover the key for documentation.',
                  },
                  defaultConfiguration: {
                    enabled: false,
                  },
                },
              ],
            },
            {
              name: 'yaml-syntax',
              rules: [
                {
                  id: 'YML001',
                  name: 'alias-props',
                  shortDescription: {
                    text: 'The alias props are incorrect.',
                  },
                  fullDescription: {
                    text: 'Unlike scalars and collections, alias nodes cannot have an anchor or tag associated with it.',
                  },
                  help: {
                    text: 'Do not associate anchors with alias nodes.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML002',
                  name: 'no-bad-alias',
                  shortDescription: {
                    text: "The alias' format is incorrect.",
                  },
                  fullDescription: {
                    text: 'An alias identifier must be a non-empty sequence of valid characters.',
                  },
                  help: {
                    text: 'Change the format of your alias.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML003',
                  name: 'no-bad-directive',
                  shortDescription: {
                    text: 'The directive is incorrect.',
                  },
                  fullDescription: {
                    text: 'Only the %YAML and %TAG directives are supported, and they need to follow the specified structure.',
                  },
                  help: {
                    text: 'Avoid using directives or limit yourself to %YAML and %TAG.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML004',
                  name: 'no-bad-dq-escape',
                  shortDescription: {
                    text: 'The double quotes are escaped incorrectly.',
                  },
                  fullDescription: {
                    text: "Double-quotes strings may include '\\' escaped content, but that needs to be valid.",
                  },
                  help: {
                    text: 'Properly escape the quotes.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML005',
                  name: 'no-bad-indent',
                  shortDescription: {
                    text: 'The indentation is incorrect.',
                  },
                  fullDescription: {
                    text: 'Indentation is important in YAML, and collection items need to all start at the same level. Block scalars are also picky about their leading content.',
                  },
                  help: {
                    text: 'Fix the identation.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML006',
                  name: 'no-bad-prop-order',
                  shortDescription: {
                    text: 'The anchors and tags are used incorrectly.',
                  },
                  fullDescription: {
                    text: 'Anchors and tags must be placed after the ?, : and - indicators.',
                  },
                  help: {
                    text: 'To fix, place the anchor or tag after the ?, : and - indicators.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML007',
                  name: 'no-bad-scalar-start',
                  shortDescription: {
                    text: 'The scalar is formatted incorrectly.',
                  },
                  fullDescription: {
                    text: 'Plain scalars cannot start with a block scalar indicator, or one of the two reserved characters: @ and `.',
                  },
                  help: {
                    text: 'To fix, use a block or quoted scalar for the value',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML008',
                  name: 'no-block-as-implicit-key',
                  shortDescription: {
                    text: 'The identation is likely incorrect.',
                  },
                  fullDescription: {
                    text: "There's probably something wrong with the indentation, or you're trying to parse something like a: b: c, where it's not clear what's the key and what's the value.",
                  },
                  help: {
                    text: 'Fix the identation.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML009',
                  name: 'no-block-in-flow',
                  shortDescription: {
                    text: 'Cannot use block within flow.',
                  },
                  fullDescription: {
                    text: 'YAML scalars and collections both have block and flow styles. Flow is allowed within block, but not the other way around.',
                  },
                  help: {
                    text: 'Do not use blocks within flow style.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML010',
                  name: 'no-duplicate-key',
                  shortDescription: {
                    text: 'Cannot use duplicate keys.',
                  },
                  fullDescription: {
                    text: 'Keys within a map must be unique.',
                  },
                  help: {
                    text: 'Remove one of the the duplicate keys.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML011',
                  name: 'impossible',
                  shortDescription: {
                    text: 'Something unexpected went wrong',
                  },
                  fullDescription: {
                    text: 'This really should not happen. If you encounter this error code, please file a bug.',
                  },
                  help: {
                    text: 'No help available.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML012',
                  name: 'no-long-key',
                  shortDescription: {
                    text: 'The key is longer than 1024 characters.',
                  },
                  fullDescription: {
                    text: 'Due to legacy reasons, implicit keys must have their following : indicator after at most 1k characters.',
                  },
                  help: {
                    text: 'Use a shorter key.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML013',
                  name: 'no-missing-anchor',
                  shortDescription: {
                    text: 'The anchor is missing.',
                  },
                  fullDescription: {
                    text: 'Aliases can only dereference anchors that are before them in the document.',
                  },
                  help: {
                    text: 'Add the missing anchor or remove the reference.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML014',
                  name: 'no-missing-char',
                  shortDescription: {
                    text: 'A character is missing.',
                  },
                  help: {
                    text: 'Add the missing character.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML015',
                  name: 'no-multiline-implicit-key',
                  shortDescription: {
                    text: 'Cannot use multiple lines with implicit keys.',
                  },
                  fullDescription: {
                    text: 'Implicit keys need to be on a single line.',
                  },
                  help: {
                    text: 'Does the input include a plain scalar with a : followed by whitespace, which is getting parsed as a map key?',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML016',
                  name: 'no-multiple-anchors',
                  shortDescription: {
                    text: 'Cannot have multiple anchors.',
                  },
                  fullDescription: {
                    text: 'A node is only allowed to have one anchor.',
                  },
                  help: {
                    text: 'Remove all but one of the anchors.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML017',
                  name: 'no-multiple-docs',
                  shortDescription: {
                    text: 'Cannot parse this document.',
                  },
                  fullDescription: {
                    text: 'A YAML stream may include multiple documents.',
                  },
                  help: {
                    text: 'No help available.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML018',
                  name: 'no-multiple-tags',
                  shortDescription: {
                    text: 'Cannot use multiple tags.',
                  },
                  fullDescription: {
                    text: 'A node is only allowed to have one tag.',
                  },
                  help: {
                    text: 'Remove all but one of the tags.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML019',
                  name: 'no-tab-as-indent',
                  shortDescription: {
                    text: 'Cannot use tabs for identation.',
                  },
                  fullDescription: {
                    text: 'Only spaces are allowed as indentation.',
                  },
                  help: {
                    text: 'Replace the tabs with spaces.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML020',
                  name: 'no-failed-tag-resolve',
                  shortDescription: {
                    text: 'Cannot resolve the tag.',
                  },
                  fullDescription: {
                    text: "Something went wrong when resolving a node's tag with the current schema.",
                  },
                  help: {
                    text: 'Investigate the unresolvable tag.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
                {
                  id: 'YML021',
                  name: 'no-unexpected-token',
                  shortDescription: {
                    text: 'The token was unexpected.',
                  },
                  fullDescription: {
                    text: "A token was encountered in a place where it wasn't expected.",
                  },
                  help: {
                    text: 'Investigate the unexpected token.',
                  },
                  defaultConfiguration: {
                    level: 'error',
                  },
                },
              ],
            },
            {
              name: 'resource-links',
              rules: [
                {
                  id: 'LNK001',
                  name: 'no-missing-links',
                  shortDescription: {
                    text: 'Disallow missing links.',
                  },
                  fullDescription: {
                    text: 'The resource has a reference and it cannot be found. This will likely cause problems during deployments.',
                  },
                  help: {
                    text: 'Check whether the referenced resource is missing or has a typo. The reference are often to labels or a names which depends on the property.',
                  },
                },
                {
                  id: 'LNK002',
                  name: 'no-missing-optional-links',
                  shortDescription: {
                    text: 'Disallow missing optional links.',
                  },
                  fullDescription: {
                    text: 'The resource has an optional reference and it cannot be found. This could cause problems during deployments.',
                  },
                  help: {
                    text: 'Check whether the referenced resource is missing or has a typo. The reference are often to labels or a names which depends on the property.',
                  },
                  defaultConfiguration: {
                    enabled: false,
                  },
                },
                {
                  id: 'LNK003',
                  name: 'no-missing-owner-references',
                  shortDescription: {
                    text: 'Disallow missing ownerReferences.',
                  },
                  fullDescription: {
                    text: 'The resource has an unresolved ownerReference in its metadata secion.',
                  },
                  help: {
                    text: 'ownerReferences should only be present in cluster resources - if this is a local file you should remove it, if thisis in a cluster something seems to have gone wrong in the corresponding operators or Kubernetes itself.',
                  },
                },
              ],
            },
            {
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
                  relationships: [
                    {
                      target: {
                        id: 'NSA001',
                        index: 0,
                        toolComponent: {
                          name: 'NSA',
                        },
                      },
                    },
                    {
                      target: {
                        id: 'CIS000',
                        index: 0,
                        toolComponent: {
                          name: 'CIS',
                        },
                      },
                    },
                  ],
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
                  relationships: [
                    {
                      target: {
                        id: 'NSA001',
                        index: 0,
                        toolComponent: {
                          name: 'NSA',
                        },
                      },
                    },
                  ],
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
                    text: 'Disallow mounting the Docker socket using hostPath volumes',
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
                  relationships: [
                    {
                      target: {
                        id: 'NSA001',
                        index: 0,
                        toolComponent: {
                          name: 'NSA',
                        },
                      },
                    },
                    {
                      target: {
                        id: 'CIS000',
                        index: 0,
                        toolComponent: {
                          name: 'CIS',
                        },
                      },
                    },
                  ],
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
                  relationships: [
                    {
                      target: {
                        id: 'NSA001',
                        index: 0,
                        toolComponent: {
                          name: 'NSA',
                        },
                      },
                    },
                  ],
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
                  defaultConfiguration: {},
                  properties: {
                    'security-severity': 5,
                  },
                },
                {
                  id: 'KSV028',
                  name: 'no-non-ephemeral-volumes',
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
          ],
        },
        results: [
          {
            ruleId: 'K8S001',
            rule: {
              id: 'K8S001',
              index: 0,
              toolComponent: {
                name: 'kubernetes-schema',
              },
            },
            level: 'warning',
            message: {
              text: 'Value at /spec/replicas should be integer',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 8,
                    startColumn: 13,
                    endLine: 8,
                    endColumn: 38,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 8,
                    startColumn: 13,
                    endLine: 8,
                    endColumn: 38,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'K8S001',
            rule: {
              id: 'K8S001',
              index: 0,
              toolComponent: {
                name: 'kubernetes-schema',
              },
            },
            level: 'warning',
            message: {
              text: 'Value at /spec/ports/0/port should be integer',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 36,
                    startColumn: 13,
                    endLine: 36,
                    endColumn: 38,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-1',
                  },
                  region: {
                    startLine: 13,
                    startColumn: 13,
                    endLine: 13,
                    endColumn: 38,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.service@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'K8S001',
            rule: {
              id: 'K8S001',
              index: 0,
              toolComponent: {
                name: 'kubernetes-schema',
              },
            },
            level: 'warning',
            message: {
              text: "Value at /spec should have required property 'selector'",
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/production/add-cloud-sql.yaml',
                  },
                  region: {
                    startLine: 6,
                    startColumn: 3,
                    endLine: 21,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1fcb4ebd5fbca7-0',
                  },
                  region: {
                    startLine: 6,
                    startColumn: 3,
                    endLine: 21,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'Patch: happy-cms.deployment@kustomize-happy-cms/overlays/production/add-cloud-sql.yaml',
                    name: 'Patch: happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'LNK001',
            rule: {
              id: 'LNK001',
              index: 0,
              toolComponent: {
                name: 'resource-links',
              },
            },
            level: 'warning',
            message: {
              text: 'Unsatisfied resource link.',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 32,
                    startColumn: 10,
                    endLine: 32,
                    endColumn: 34,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-1',
                  },
                  region: {
                    startLine: 9,
                    startColumn: 10,
                    endLine: 9,
                    endColumn: 34,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.service@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'LNK001',
            rule: {
              id: 'LNK001',
              index: 0,
              toolComponent: {
                name: 'resource-links',
              },
            },
            level: 'warning',
            message: {
              text: 'Unsatisfied resource link.',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/production/ingress.yaml',
                  },
                  region: {
                    startLine: 17,
                    startColumn: 23,
                    endLine: 17,
                    endColumn: 27,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1322959fc39a37-0',
                  },
                  region: {
                    startLine: 17,
                    startColumn: 23,
                    endLine: 17,
                    endColumn: 27,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'demo.ingress@kustomize-happy-cms/overlays/production/ingress.yaml',
                    name: 'demo',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'LNK001',
            rule: {
              id: 'LNK001',
              index: 0,
              toolComponent: {
                name: 'resource-links',
              },
            },
            level: 'warning',
            message: {
              text: 'Unsatisfied resource link.',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/ingress.yaml',
                  },
                  region: {
                    startLine: 17,
                    startColumn: 23,
                    endLine: 17,
                    endColumn: 27,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '127ec267212d3a-0',
                  },
                  region: {
                    startLine: 17,
                    startColumn: 23,
                    endLine: 17,
                    endColumn: 27,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.ingress@kustomize-happy-cms/overlays/local/ingress.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'LNK001',
            rule: {
              id: 'LNK001',
              index: 0,
              toolComponent: {
                name: 'resource-links',
              },
            },
            level: 'warning',
            message: {
              text: 'Unsatisfied resource link.',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 56,
                    startColumn: 23,
                    endLine: 56,
                    endColumn: 35,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 23,
                    endLine: 27,
                    endColumn: 35,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'LNK001',
            rule: {
              id: 'LNK001',
              index: 0,
              toolComponent: {
                name: 'resource-links',
              },
            },
            level: 'warning',
            message: {
              text: 'Unsatisfied resource link.',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 28,
                    startColumn: 10,
                    endLine: 28,
                    endColumn: 20,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-1',
                  },
                  region: {
                    startLine: 13,
                    startColumn: 10,
                    endLine: 13,
                    endColumn: 20,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database-headless.service@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database-headless',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV001',
            rule: {
              id: 'KSV001',
              index: 0,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
              {
                id: 'CIS000',
                index: 0,
                toolComponent: {
                  name: 'CIS',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Disallow the process from elevating its privileges on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV003',
            rule: {
              id: 'KSV003',
              index: 2,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require default capabilities to be dropped on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV011',
            rule: {
              id: 'KSV011',
              index: 8,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Require the CPU to be limited on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV012',
            rule: {
              id: 'KSV012',
              index: 9,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Requires the container to runs as non root user on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV013',
            rule: {
              id: 'KSV013',
              index: 10,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow images with the latest tag on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 19,
                    startColumn: 18,
                    endLine: 19,
                    endColumn: 33,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 19,
                    startColumn: 18,
                    endLine: 19,
                    endColumn: 33,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV014',
            rule: {
              id: 'KSV014',
              index: 11,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require a read-only root file system on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV015',
            rule: {
              id: 'KSV015',
              index: 12,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the CPU to be requested on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV016',
            rule: {
              id: 'KSV016',
              index: 13,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be requested on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV018',
            rule: {
              id: 'KSV018',
              index: 15,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be limited on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV020',
            rule: {
              id: 'KSV020',
              index: 16,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low user ID on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV021',
            rule: {
              id: 'KSV021',
              index: 17,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low group ID on container "blue-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'bundles/simple.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: 'c9cf721b174f5-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'blue-cms.deployment@bundles/simple.yaml',
                    name: 'blue-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV001',
            rule: {
              id: 'KSV001',
              index: 0,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
              {
                id: 'CIS000',
                index: 0,
                toolComponent: {
                  name: 'CIS',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Disallow the process from elevating its privileges on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV003',
            rule: {
              id: 'KSV003',
              index: 2,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require default capabilities to be dropped on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV011',
            rule: {
              id: 'KSV011',
              index: 8,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Require the CPU to be limited on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV012',
            rule: {
              id: 'KSV012',
              index: 9,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Requires the container to runs as non root user on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV013',
            rule: {
              id: 'KSV013',
              index: 10,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow images with the latest tag on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 19,
                    startColumn: 18,
                    endLine: 19,
                    endColumn: 34,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 19,
                    startColumn: 18,
                    endLine: 19,
                    endColumn: 34,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV014',
            rule: {
              id: 'KSV014',
              index: 11,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require a read-only root file system on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV015',
            rule: {
              id: 'KSV015',
              index: 12,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the CPU to be requested on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV016',
            rule: {
              id: 'KSV016',
              index: 13,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be requested on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV018',
            rule: {
              id: 'KSV018',
              index: 15,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be limited on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV020',
            rule: {
              id: 'KSV020',
              index: 16,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low user ID on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV021',
            rule: {
              id: 'KSV021',
              index: 17,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low group ID on container "happy-cms".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/base/deployment.yaml',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '177b0b6483e353-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'happy-cms.deployment@kustomize-happy-cms/base/deployment.yaml',
                    name: 'happy-cms',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV001',
            rule: {
              id: 'KSV001',
              index: 0,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
              {
                id: 'CIS000',
                index: 0,
                toolComponent: {
                  name: 'CIS',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Disallow the process from elevating its privileges on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 53,
                    startColumn: 13,
                    endLine: 54,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 24,
                    startColumn: 13,
                    endLine: 25,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV003',
            rule: {
              id: 'KSV003',
              index: 2,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require default capabilities to be dropped on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 53,
                    startColumn: 13,
                    endLine: 54,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 24,
                    startColumn: 13,
                    endLine: 25,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV011',
            rule: {
              id: 'KSV011',
              index: 8,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Require the CPU to be limited on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 49,
                    startColumn: 11,
                    endLine: 79,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 20,
                    startColumn: 11,
                    endLine: 50,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV012',
            rule: {
              id: 'KSV012',
              index: 9,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Requires the container to runs as non root user on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 53,
                    startColumn: 13,
                    endLine: 54,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 24,
                    startColumn: 13,
                    endLine: 25,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV014',
            rule: {
              id: 'KSV014',
              index: 11,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require a read-only root file system on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 53,
                    startColumn: 13,
                    endLine: 54,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 24,
                    startColumn: 13,
                    endLine: 25,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV015',
            rule: {
              id: 'KSV015',
              index: 12,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the CPU to be requested on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 49,
                    startColumn: 11,
                    endLine: 79,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 20,
                    startColumn: 11,
                    endLine: 50,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV016',
            rule: {
              id: 'KSV016',
              index: 13,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be requested on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 49,
                    startColumn: 11,
                    endLine: 79,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 20,
                    startColumn: 11,
                    endLine: 50,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV018',
            rule: {
              id: 'KSV018',
              index: 15,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be limited on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 49,
                    startColumn: 11,
                    endLine: 79,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 20,
                    startColumn: 11,
                    endLine: 50,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV020',
            rule: {
              id: 'KSV020',
              index: 16,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low user ID on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 53,
                    startColumn: 24,
                    endLine: 53,
                    endColumn: 28,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 24,
                    startColumn: 24,
                    endLine: 24,
                    endColumn: 28,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV021',
            rule: {
              id: 'KSV021',
              index: 17,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low group ID on container "postgresql".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 53,
                    startColumn: 13,
                    endLine: 54,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 24,
                    startColumn: 13,
                    endLine: 25,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV029',
            rule: {
              id: 'KSV029',
              index: 23,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow setting runAsGroup to zero.',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'kustomize-happy-cms/overlays/local/database.yaml',
                  },
                  region: {
                    startLine: 31,
                    startColumn: 7,
                    endLine: 31,
                    endColumn: 18,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1a98a97e8da5d3-2',
                  },
                  region: {
                    startLine: 2,
                    startColumn: 7,
                    endLine: 2,
                    endColumn: 18,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName:
                      'happy-cms-database.statefulset@kustomize-happy-cms/overlays/local/database.yaml',
                    name: 'happy-cms-database',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV001',
            rule: {
              id: 'KSV001',
              index: 0,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
              {
                id: 'CIS000',
                index: 0,
                toolComponent: {
                  name: 'CIS',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Disallow the process from elevating its privileges on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV001',
            rule: {
              id: 'KSV001',
              index: 0,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
              {
                id: 'CIS000',
                index: 0,
                toolComponent: {
                  name: 'CIS',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Disallow the process from elevating its privileges on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV003',
            rule: {
              id: 'KSV003',
              index: 2,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require default capabilities to be dropped on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV003',
            rule: {
              id: 'KSV003',
              index: 2,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require default capabilities to be dropped on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV011',
            rule: {
              id: 'KSV011',
              index: 8,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Require the CPU to be limited on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV011',
            rule: {
              id: 'KSV011',
              index: 8,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
            ],
            level: 'warning',
            message: {
              text: 'Require the CPU to be limited on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 11,
                    endLine: 34,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 11,
                    endLine: 34,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV012',
            rule: {
              id: 'KSV012',
              index: 9,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Requires the container to runs as non root user on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV012',
            rule: {
              id: 'KSV012',
              index: 9,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Requires the container to runs as non root user on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV013',
            rule: {
              id: 'KSV013',
              index: 10,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow images with the latest tag on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 23,
                    startColumn: 18,
                    endLine: 23,
                    endColumn: 35,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 23,
                    startColumn: 18,
                    endLine: 23,
                    endColumn: 35,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV013',
            rule: {
              id: 'KSV013',
              index: 10,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow images with the latest tag on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 28,
                    startColumn: 18,
                    endLine: 28,
                    endColumn: 38,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 28,
                    startColumn: 18,
                    endLine: 28,
                    endColumn: 38,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV014',
            rule: {
              id: 'KSV014',
              index: 11,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require a read-only root file system on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV014',
            rule: {
              id: 'KSV014',
              index: 11,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require a read-only root file system on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV015',
            rule: {
              id: 'KSV015',
              index: 12,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the CPU to be requested on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 11,
                    endLine: 34,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 11,
                    endLine: 34,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV015',
            rule: {
              id: 'KSV015',
              index: 12,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the CPU to be requested on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV016',
            rule: {
              id: 'KSV016',
              index: 13,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be requested on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV016',
            rule: {
              id: 'KSV016',
              index: 13,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be requested on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 11,
                    endLine: 34,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 11,
                    endLine: 34,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV018',
            rule: {
              id: 'KSV018',
              index: 15,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be limited on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV018',
            rule: {
              id: 'KSV018',
              index: 15,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Require the memory to be limited on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 11,
                    endLine: 34,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 27,
                    startColumn: 11,
                    endLine: 34,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV020',
            rule: {
              id: 'KSV020',
              index: 16,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low user ID on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 24,
                    endLine: 30,
                    endColumn: 27,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 24,
                    endLine: 30,
                    endColumn: 27,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV020',
            rule: {
              id: 'KSV020',
              index: 16,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low user ID on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV021',
            rule: {
              id: 'KSV021',
              index: 17,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low group ID on container "panda-sidecar".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 30,
                    startColumn: 13,
                    endLine: 31,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV021',
            rule: {
              id: 'KSV021',
              index: 17,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
            message: {
              text: 'Disallow running with a low group ID on container "panda-blog".',
            },
            locations: [
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'SRCROOT',
                    uri: 'standalone/deployment.yaml',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '1ed543166bf16e-0',
                  },
                  region: {
                    startLine: 22,
                    startColumn: 11,
                    endLine: 27,
                    endColumn: 1,
                  },
                },
                logicalLocations: [
                  {
                    kind: 'resource',
                    fullyQualifiedName: 'panda-blog.third-branch.deployment@standalone/deployment.yaml',
                    name: 'panda-blog',
                  },
                ],
              },
            ],
          },
          {
            ruleId: 'KSV001',
            rule: {
              id: 'KSV001',
              index: 0,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
              {
                id: 'CIS000',
                index: 0,
                toolComponent: {
                  name: 'CIS',
                },
              },
            ],
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV003',
              index: 2,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV011',
              index: 8,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            taxa: [
              {
                id: 'NSA001',
                index: 0,
                toolComponent: {
                  name: 'NSA',
                },
              },
            ],
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV012',
              index: 9,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV013',
              index: 10,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 19,
                    startColumn: 18,
                    endLine: 19,
                    endColumn: 35,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 19,
                    startColumn: 18,
                    endLine: 19,
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
              id: 'KSV014',
              index: 11,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV015',
              index: 12,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV016',
              index: 13,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV018',
              index: 15,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV020',
              index: 16,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
              id: 'KSV021',
              index: 17,
              toolComponent: {
                name: 'open-policy-agent',
              },
            },
            level: 'warning',
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
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
                    endColumn: 1,
                  },
                },
              },
              {
                physicalLocation: {
                  artifactLocation: {
                    uriBaseId: 'RESOURCE',
                    uri: '119ea841051bfd-0',
                  },
                  region: {
                    startLine: 18,
                    startColumn: 11,
                    endLine: 23,
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
        taxonomies: [
          {
            name: 'NSA',
            version: 'v0.1',
            organization: 'NSA & CISA',
            shortDescription: {
              text: 'Kubernetes Hardening Guidance',
            },
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
          },
          {
            name: 'CIS',
            version: 'v0.1',
            organization: 'CIS',
            shortDescription: {
              text: 'CIS is something.',
            },
            taxa: [
              {
                id: 'CIS000',
                name: 'general',
                shortDescription: {
                  text: 'General misconfigurations',
                },
              },
            ],
          },
        ],
      },
    ],
  },
};
