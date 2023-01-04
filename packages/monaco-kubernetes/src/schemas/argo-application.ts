export const ARGO_APPLICATION_SCHEMA = {
  description: "Application is a definition of Application resource.",
  properties: {
    apiVersion: {
      description:
        "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
      type: "string",
    },
    kind: {
      description:
        "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
      type: "string",
    },
    metadata: {
      type: "object",
    },
    operation: {
      description:
        "Operation contains information about a requested or running operation",
      properties: {
        info: {
          description:
            "Info is a list of informational items for this operation",
          items: {
            properties: {
              name: {
                type: "string",
              },
              value: {
                type: "string",
              },
            },
            required: ["name", "value"],
            type: "object",
          },
          type: "array",
        },
        initiatedBy: {
          description:
            "InitiatedBy contains information about who initiated the operations",
          properties: {
            automated: {
              description:
                "Automated is set to true if operation was initiated automatically by the application controller.",
              type: "boolean",
            },
            username: {
              description:
                "Username contains the name of a user who started operation",
              type: "string",
            },
          },
          type: "object",
        },
        retry: {
          description: "Retry controls the strategy to apply if a sync fails",
          properties: {
            backoff: {
              description:
                "Backoff controls how to backoff on subsequent retries of failed syncs",
              properties: {
                duration: {
                  description:
                    'Duration is the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")',
                  type: "string",
                },
                factor: {
                  description:
                    "Factor is a factor to multiply the base duration after each failed retry",
                  format: "int64",
                  type: "integer",
                },
                maxDuration: {
                  description:
                    "MaxDuration is the maximum amount of time allowed for the backoff strategy",
                  type: "string",
                },
              },
              type: "object",
            },
            limit: {
              description:
                "Limit is the maximum number of attempts for retrying a failed sync. If set to 0, no retries will be performed.",
              format: "int64",
              type: "integer",
            },
          },
          type: "object",
        },
        sync: {
          description: "Sync contains parameters for the operation",
          properties: {
            dryRun: {
              description:
                "DryRun specifies to perform a `kubectl apply --dry-run` without actually performing the sync",
              type: "boolean",
            },
            manifests: {
              description:
                "Manifests is an optional field that overrides sync source with a local directory for development",
              items: {
                type: "string",
              },
              type: "array",
            },
            prune: {
              description:
                "Prune specifies to delete resources from the cluster that are no longer tracked in git",
              type: "boolean",
            },
            resources: {
              description:
                "Resources describes which resources shall be part of the sync",
              items: {
                description:
                  "SyncOperationResource contains resources to sync.",
                properties: {
                  group: {
                    type: "string",
                  },
                  kind: {
                    type: "string",
                  },
                  name: {
                    type: "string",
                  },
                  namespace: {
                    type: "string",
                  },
                },
                required: ["kind", "name"],
                type: "object",
              },
              type: "array",
            },
            revision: {
              description:
                "Revision is the revision (Git) or chart version (Helm) which to sync the application to If omitted, will use the revision specified in app spec.",
              type: "string",
            },
            source: {
              description:
                "Source overrides the source definition set in the application. This is typically set in a Rollback operation and is nil during a Sync operation",
              properties: {
                chart: {
                  description:
                    "Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.",
                  type: "string",
                },
                directory: {
                  description:
                    "Directory holds path/directory specific options",
                  properties: {
                    exclude: {
                      description:
                        "Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation",
                      type: "string",
                    },
                    include: {
                      description:
                        "Include contains a glob pattern to match paths against that should be explicitly included during manifest generation",
                      type: "string",
                    },
                    jsonnet: {
                      description: "Jsonnet holds options specific to Jsonnet",
                      properties: {
                        extVars: {
                          description:
                            "ExtVars is a list of Jsonnet External Variables",
                          items: {
                            description:
                              "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                            properties: {
                              code: {
                                type: "boolean",
                              },
                              name: {
                                type: "string",
                              },
                              value: {
                                type: "string",
                              },
                            },
                            required: ["name", "value"],
                            type: "object",
                          },
                          type: "array",
                        },
                        libs: {
                          description: "Additional library search dirs",
                          items: {
                            type: "string",
                          },
                          type: "array",
                        },
                        tlas: {
                          description:
                            "TLAS is a list of Jsonnet Top-level Arguments",
                          items: {
                            description:
                              "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                            properties: {
                              code: {
                                type: "boolean",
                              },
                              name: {
                                type: "string",
                              },
                              value: {
                                type: "string",
                              },
                            },
                            required: ["name", "value"],
                            type: "object",
                          },
                          type: "array",
                        },
                      },
                      type: "object",
                    },
                    recurse: {
                      description:
                        "Recurse specifies whether to scan a directory recursively for manifests",
                      type: "boolean",
                    },
                  },
                  type: "object",
                },
                helm: {
                  description: "Helm holds helm specific options",
                  properties: {
                    fileParameters: {
                      description:
                        "FileParameters are file parameters to the helm template",
                      items: {
                        description:
                          "HelmFileParameter is a file parameter that's passed to helm template during manifest generation",
                        properties: {
                          name: {
                            description:
                              "Name is the name of the Helm parameter",
                            type: "string",
                          },
                          path: {
                            description:
                              "Path is the path to the file containing the values for the Helm parameter",
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      type: "array",
                    },
                    ignoreMissingValueFiles: {
                      description:
                        "IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values",
                      type: "boolean",
                    },
                    parameters: {
                      description:
                        "Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation",
                      items: {
                        description:
                          "HelmParameter is a parameter that's passed to helm template during manifest generation",
                        properties: {
                          forceString: {
                            description:
                              "ForceString determines whether to tell Helm to interpret booleans and numbers as strings",
                            type: "boolean",
                          },
                          name: {
                            description:
                              "Name is the name of the Helm parameter",
                            type: "string",
                          },
                          value: {
                            description:
                              "Value is the value for the Helm parameter",
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      type: "array",
                    },
                    passCredentials: {
                      description:
                        "PassCredentials pass credentials to all domains (Helm's --pass-credentials)",
                      type: "boolean",
                    },
                    releaseName: {
                      description:
                        "ReleaseName is the Helm release name to use. If omitted it will use the application name",
                      type: "string",
                    },
                    skipCrds: {
                      description:
                        "SkipCrds skips custom resource definition installation step (Helm's --skip-crds)",
                      type: "boolean",
                    },
                    valueFiles: {
                      description:
                        "ValuesFiles is a list of Helm value files to use when generating a template",
                      items: {
                        type: "string",
                      },
                      type: "array",
                    },
                    values: {
                      description:
                        "Values specifies Helm values to be passed to helm template, typically defined as a block",
                      type: "string",
                    },
                    version: {
                      description:
                        'Version is the Helm version to use for templating ("3")',
                      type: "string",
                    },
                  },
                  type: "object",
                },
                kustomize: {
                  description: "Kustomize holds kustomize specific options",
                  properties: {
                    commonAnnotations: {
                      additionalProperties: {
                        type: "string",
                      },
                      description:
                        "CommonAnnotations is a list of additional annotations to add to rendered manifests",
                      type: "object",
                    },
                    commonLabels: {
                      additionalProperties: {
                        type: "string",
                      },
                      description:
                        "CommonLabels is a list of additional labels to add to rendered manifests",
                      type: "object",
                    },
                    forceCommonAnnotations: {
                      description:
                        "ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps",
                      type: "boolean",
                    },
                    forceCommonLabels: {
                      description:
                        "ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps",
                      type: "boolean",
                    },
                    images: {
                      description:
                        "Images is a list of Kustomize image override specifications",
                      items: {
                        description:
                          "KustomizeImage represents a Kustomize image definition in the format [old_image_name=]<image_name>:<image_tag>",
                        type: "string",
                      },
                      type: "array",
                    },
                    namePrefix: {
                      description:
                        "NamePrefix is a prefix appended to resources for Kustomize apps",
                      type: "string",
                    },
                    nameSuffix: {
                      description:
                        "NameSuffix is a suffix appended to resources for Kustomize apps",
                      type: "string",
                    },
                    version: {
                      description:
                        "Version controls which version of Kustomize to use for rendering manifests",
                      type: "string",
                    },
                  },
                  type: "object",
                },
                path: {
                  description:
                    "Path is a directory path within the Git repository, and is only valid for applications sourced from Git.",
                  type: "string",
                },
                plugin: {
                  description:
                    "Plugin holds config management plugin specific options",
                  properties: {
                    env: {
                      description:
                        "Env is a list of environment variable entries",
                      items: {
                        description:
                          "EnvEntry represents an entry in the application's environment",
                        properties: {
                          name: {
                            description:
                              "Name is the name of the variable, usually expressed in uppercase",
                            type: "string",
                          },
                          value: {
                            description: "Value is the value of the variable",
                            type: "string",
                          },
                        },
                        required: ["name", "value"],
                        type: "object",
                      },
                      type: "array",
                    },
                    name: {
                      type: "string",
                    },
                    parameters: {
                      items: {
                        properties: {
                          array: {
                            description:
                              "Array is the value of an array type parameter.",
                            items: {
                              type: "string",
                            },
                            type: "array",
                          },
                          map: {
                            additionalProperties: {
                              type: "string",
                            },
                            description:
                              "Map is the value of a map type parameter.",
                            type: "object",
                          },
                          name: {
                            description:
                              "Name is the name identifying a parameter.",
                            type: "string",
                          },
                          string: {
                            description:
                              "String_ is the value of a string type parameter.",
                            type: "string",
                          },
                        },
                        type: "object",
                      },
                      type: "array",
                    },
                  },
                  type: "object",
                },
                repoURL: {
                  description:
                    "RepoURL is the URL to the repository (Git or Helm) that contains the application manifests",
                  type: "string",
                },
                targetRevision: {
                  description:
                    "TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.",
                  type: "string",
                },
              },
              required: ["repoURL"],
              type: "object",
            },
            syncOptions: {
              description:
                "SyncOptions provide per-sync sync-options, e.g. Validate=false",
              items: {
                type: "string",
              },
              type: "array",
            },
            syncStrategy: {
              description: "SyncStrategy describes how to perform the sync",
              properties: {
                apply: {
                  description:
                    "Apply will perform a `kubectl apply` to perform the sync.",
                  properties: {
                    force: {
                      description:
                        "Force indicates whether or not to supply the --force flag to `kubectl apply`. The --force flag deletes and re-create the resource, when PATCH encounters conflict and has retried for 5 times.",
                      type: "boolean",
                    },
                  },
                  type: "object",
                },
                hook: {
                  description:
                    "Hook will submit any referenced resources to perform the sync. This is the default strategy",
                  properties: {
                    force: {
                      description:
                        "Force indicates whether or not to supply the --force flag to `kubectl apply`. The --force flag deletes and re-create the resource, when PATCH encounters conflict and has retried for 5 times.",
                      type: "boolean",
                    },
                  },
                  type: "object",
                },
              },
              type: "object",
            },
          },
          type: "object",
        },
      },
      type: "object",
    },
    spec: {
      description:
        "ApplicationSpec represents desired application state. Contains link to repository with application definition and additional parameters link definition revision.",
      properties: {
        destination: {
          description:
            "Destination is a reference to the target Kubernetes server and namespace",
          properties: {
            name: {
              description:
                "Name is an alternate way of specifying the target cluster by its symbolic name",
              type: "string",
            },
            namespace: {
              description:
                "Namespace specifies the target namespace for the application's resources. The namespace will only be set for namespace-scoped resources that have not set a value for .metadata.namespace",
              type: "string",
            },
            server: {
              description:
                "Server specifies the URL of the target cluster and must be set to the Kubernetes control plane API",
              type: "string",
            },
          },
          type: "object",
        },
        ignoreDifferences: {
          description:
            "IgnoreDifferences is a list of resources and their fields which should be ignored during comparison",
          items: {
            description:
              "ResourceIgnoreDifferences contains resource filter and list of json paths which should be ignored during comparison with live state.",
            properties: {
              group: {
                type: "string",
              },
              jqPathExpressions: {
                items: {
                  type: "string",
                },
                type: "array",
              },
              jsonPointers: {
                items: {
                  type: "string",
                },
                type: "array",
              },
              kind: {
                type: "string",
              },
              managedFieldsManagers: {
                description:
                  "ManagedFieldsManagers is a list of trusted managers. Fields mutated by those managers will take precedence over the desired state defined in the SCM and won't be displayed in diffs",
                items: {
                  type: "string",
                },
                type: "array",
              },
              name: {
                type: "string",
              },
              namespace: {
                type: "string",
              },
            },
            required: ["kind"],
            type: "object",
          },
          type: "array",
        },
        info: {
          description:
            "Info contains a list of information (URLs, email addresses, and plain text) that relates to the application",
          items: {
            properties: {
              name: {
                type: "string",
              },
              value: {
                type: "string",
              },
            },
            required: ["name", "value"],
            type: "object",
          },
          type: "array",
        },
        project: {
          description:
            "Project is a reference to the project this application belongs to. The empty string means that application belongs to the 'default' project.",
          type: "string",
        },
        revisionHistoryLimit: {
          description:
            "RevisionHistoryLimit limits the number of items kept in the application's revision history, which is used for informational purposes as well as for rollbacks to previous versions. This should only be changed in exceptional circumstances. Setting to zero will store no history. This will reduce storage used. Increasing will increase the space used to store the history, so we do not recommend increasing it. Default is 10.",
          format: "int64",
          type: "integer",
        },
        source: {
          description:
            "Source is a reference to the location of the application's manifests or chart",
          properties: {
            chart: {
              description:
                "Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.",
              type: "string",
            },
            directory: {
              description: "Directory holds path/directory specific options",
              properties: {
                exclude: {
                  description:
                    "Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation",
                  type: "string",
                },
                include: {
                  description:
                    "Include contains a glob pattern to match paths against that should be explicitly included during manifest generation",
                  type: "string",
                },
                jsonnet: {
                  description: "Jsonnet holds options specific to Jsonnet",
                  properties: {
                    extVars: {
                      description:
                        "ExtVars is a list of Jsonnet External Variables",
                      items: {
                        description:
                          "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                        properties: {
                          code: {
                            type: "boolean",
                          },
                          name: {
                            type: "string",
                          },
                          value: {
                            type: "string",
                          },
                        },
                        required: ["name", "value"],
                        type: "object",
                      },
                      type: "array",
                    },
                    libs: {
                      description: "Additional library search dirs",
                      items: {
                        type: "string",
                      },
                      type: "array",
                    },
                    tlas: {
                      description:
                        "TLAS is a list of Jsonnet Top-level Arguments",
                      items: {
                        description:
                          "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                        properties: {
                          code: {
                            type: "boolean",
                          },
                          name: {
                            type: "string",
                          },
                          value: {
                            type: "string",
                          },
                        },
                        required: ["name", "value"],
                        type: "object",
                      },
                      type: "array",
                    },
                  },
                  type: "object",
                },
                recurse: {
                  description:
                    "Recurse specifies whether to scan a directory recursively for manifests",
                  type: "boolean",
                },
              },
              type: "object",
            },
            helm: {
              description: "Helm holds helm specific options",
              properties: {
                fileParameters: {
                  description:
                    "FileParameters are file parameters to the helm template",
                  items: {
                    description:
                      "HelmFileParameter is a file parameter that's passed to helm template during manifest generation",
                    properties: {
                      name: {
                        description: "Name is the name of the Helm parameter",
                        type: "string",
                      },
                      path: {
                        description:
                          "Path is the path to the file containing the values for the Helm parameter",
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  type: "array",
                },
                ignoreMissingValueFiles: {
                  description:
                    "IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values",
                  type: "boolean",
                },
                parameters: {
                  description:
                    "Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation",
                  items: {
                    description:
                      "HelmParameter is a parameter that's passed to helm template during manifest generation",
                    properties: {
                      forceString: {
                        description:
                          "ForceString determines whether to tell Helm to interpret booleans and numbers as strings",
                        type: "boolean",
                      },
                      name: {
                        description: "Name is the name of the Helm parameter",
                        type: "string",
                      },
                      value: {
                        description:
                          "Value is the value for the Helm parameter",
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  type: "array",
                },
                passCredentials: {
                  description:
                    "PassCredentials pass credentials to all domains (Helm's --pass-credentials)",
                  type: "boolean",
                },
                releaseName: {
                  description:
                    "ReleaseName is the Helm release name to use. If omitted it will use the application name",
                  type: "string",
                },
                skipCrds: {
                  description:
                    "SkipCrds skips custom resource definition installation step (Helm's --skip-crds)",
                  type: "boolean",
                },
                valueFiles: {
                  description:
                    "ValuesFiles is a list of Helm value files to use when generating a template",
                  items: {
                    type: "string",
                  },
                  type: "array",
                },
                values: {
                  description:
                    "Values specifies Helm values to be passed to helm template, typically defined as a block",
                  type: "string",
                },
                version: {
                  description:
                    'Version is the Helm version to use for templating ("3")',
                  type: "string",
                },
              },
              type: "object",
            },
            kustomize: {
              description: "Kustomize holds kustomize specific options",
              properties: {
                commonAnnotations: {
                  additionalProperties: {
                    type: "string",
                  },
                  description:
                    "CommonAnnotations is a list of additional annotations to add to rendered manifests",
                  type: "object",
                },
                commonLabels: {
                  additionalProperties: {
                    type: "string",
                  },
                  description:
                    "CommonLabels is a list of additional labels to add to rendered manifests",
                  type: "object",
                },
                forceCommonAnnotations: {
                  description:
                    "ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps",
                  type: "boolean",
                },
                forceCommonLabels: {
                  description:
                    "ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps",
                  type: "boolean",
                },
                images: {
                  description:
                    "Images is a list of Kustomize image override specifications",
                  items: {
                    description:
                      "KustomizeImage represents a Kustomize image definition in the format [old_image_name=]<image_name>:<image_tag>",
                    type: "string",
                  },
                  type: "array",
                },
                namePrefix: {
                  description:
                    "NamePrefix is a prefix appended to resources for Kustomize apps",
                  type: "string",
                },
                nameSuffix: {
                  description:
                    "NameSuffix is a suffix appended to resources for Kustomize apps",
                  type: "string",
                },
                version: {
                  description:
                    "Version controls which version of Kustomize to use for rendering manifests",
                  type: "string",
                },
              },
              type: "object",
            },
            path: {
              description:
                "Path is a directory path within the Git repository, and is only valid for applications sourced from Git.",
              type: "string",
            },
            plugin: {
              description:
                "Plugin holds config management plugin specific options",
              properties: {
                env: {
                  description: "Env is a list of environment variable entries",
                  items: {
                    description:
                      "EnvEntry represents an entry in the application's environment",
                    properties: {
                      name: {
                        description:
                          "Name is the name of the variable, usually expressed in uppercase",
                        type: "string",
                      },
                      value: {
                        description: "Value is the value of the variable",
                        type: "string",
                      },
                    },
                    required: ["name", "value"],
                    type: "object",
                  },
                  type: "array",
                },
                name: {
                  type: "string",
                },
                parameters: {
                  items: {
                    properties: {
                      array: {
                        description:
                          "Array is the value of an array type parameter.",
                        items: {
                          type: "string",
                        },
                        type: "array",
                      },
                      map: {
                        additionalProperties: {
                          type: "string",
                        },
                        description:
                          "Map is the value of a map type parameter.",
                        type: "object",
                      },
                      name: {
                        description:
                          "Name is the name identifying a parameter.",
                        type: "string",
                      },
                      string: {
                        description:
                          "String_ is the value of a string type parameter.",
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  type: "array",
                },
              },
              type: "object",
            },
            repoURL: {
              description:
                "RepoURL is the URL to the repository (Git or Helm) that contains the application manifests",
              type: "string",
            },
            targetRevision: {
              description:
                "TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.",
              type: "string",
            },
          },
          required: ["repoURL"],
          type: "object",
        },
        syncPolicy: {
          description:
            "SyncPolicy controls when and how a sync will be performed",
          properties: {
            automated: {
              description:
                "Automated will keep an application synced to the target revision",
              properties: {
                allowEmpty: {
                  description:
                    "AllowEmpty allows apps have zero live resources (default: false)",
                  type: "boolean",
                },
                prune: {
                  description:
                    "Prune specifies whether to delete resources from the cluster that are not found in the sources anymore as part of automated sync (default: false)",
                  type: "boolean",
                },
                selfHeal: {
                  description:
                    "SelfHeal specifes whether to revert resources back to their desired state upon modification in the cluster (default: false)",
                  type: "boolean",
                },
              },
              type: "object",
            },
            managedNamespaceMetadata: {
              description:
                "ManagedNamespaceMetadata controls metadata in the given namespace (if CreateNamespace=true)",
              properties: {
                annotations: {
                  additionalProperties: {
                    type: "string",
                  },
                  type: "object",
                },
                labels: {
                  additionalProperties: {
                    type: "string",
                  },
                  type: "object",
                },
              },
              type: "object",
            },
            retry: {
              description: "Retry controls failed sync retry behavior",
              properties: {
                backoff: {
                  description:
                    "Backoff controls how to backoff on subsequent retries of failed syncs",
                  properties: {
                    duration: {
                      description:
                        'Duration is the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")',
                      type: "string",
                    },
                    factor: {
                      description:
                        "Factor is a factor to multiply the base duration after each failed retry",
                      format: "int64",
                      type: "integer",
                    },
                    maxDuration: {
                      description:
                        "MaxDuration is the maximum amount of time allowed for the backoff strategy",
                      type: "string",
                    },
                  },
                  type: "object",
                },
                limit: {
                  description:
                    "Limit is the maximum number of attempts for retrying a failed sync. If set to 0, no retries will be performed.",
                  format: "int64",
                  type: "integer",
                },
              },
              type: "object",
            },
            syncOptions: {
              description:
                "Options allow you to specify whole app sync-options",
              items: {
                type: "string",
              },
              type: "array",
            },
          },
          type: "object",
        },
      },
      required: ["destination", "project", "source"],
      type: "object",
    },
    status: {
      description:
        "ApplicationStatus contains status information for the application",
      properties: {
        conditions: {
          description:
            "Conditions is a list of currently observed application conditions",
          items: {
            description:
              "ApplicationCondition contains details about an application condition, which is usally an error or warning",
            properties: {
              lastTransitionTime: {
                description:
                  "LastTransitionTime is the time the condition was last observed",
                format: "date-time",
                type: "string",
              },
              message: {
                description:
                  "Message contains human-readable message indicating details about condition",
                type: "string",
              },
              type: {
                description: "Type is an application condition type",
                type: "string",
              },
            },
            required: ["message", "type"],
            type: "object",
          },
          type: "array",
        },
        health: {
          description:
            "Health contains information about the application's current health status",
          properties: {
            message: {
              description:
                "Message is a human-readable informational message describing the health status",
              type: "string",
            },
            status: {
              description:
                "Status holds the status code of the application or resource",
              type: "string",
            },
          },
          type: "object",
        },
        history: {
          description:
            "History contains information about the application's sync history",
          items: {
            description:
              "RevisionHistory contains history information about a previous sync",
            properties: {
              deployStartedAt: {
                description:
                  "DeployStartedAt holds the time the sync operation started",
                format: "date-time",
                type: "string",
              },
              deployedAt: {
                description:
                  "DeployedAt holds the time the sync operation completed",
                format: "date-time",
                type: "string",
              },
              id: {
                description:
                  "ID is an auto incrementing identifier of the RevisionHistory",
                format: "int64",
                type: "integer",
              },
              revision: {
                description:
                  "Revision holds the revision the sync was performed against",
                type: "string",
              },
              source: {
                description:
                  "Source is a reference to the application source used for the sync operation",
                properties: {
                  chart: {
                    description:
                      "Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.",
                    type: "string",
                  },
                  directory: {
                    description:
                      "Directory holds path/directory specific options",
                    properties: {
                      exclude: {
                        description:
                          "Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation",
                        type: "string",
                      },
                      include: {
                        description:
                          "Include contains a glob pattern to match paths against that should be explicitly included during manifest generation",
                        type: "string",
                      },
                      jsonnet: {
                        description:
                          "Jsonnet holds options specific to Jsonnet",
                        properties: {
                          extVars: {
                            description:
                              "ExtVars is a list of Jsonnet External Variables",
                            items: {
                              description:
                                "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                              properties: {
                                code: {
                                  type: "boolean",
                                },
                                name: {
                                  type: "string",
                                },
                                value: {
                                  type: "string",
                                },
                              },
                              required: ["name", "value"],
                              type: "object",
                            },
                            type: "array",
                          },
                          libs: {
                            description: "Additional library search dirs",
                            items: {
                              type: "string",
                            },
                            type: "array",
                          },
                          tlas: {
                            description:
                              "TLAS is a list of Jsonnet Top-level Arguments",
                            items: {
                              description:
                                "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                              properties: {
                                code: {
                                  type: "boolean",
                                },
                                name: {
                                  type: "string",
                                },
                                value: {
                                  type: "string",
                                },
                              },
                              required: ["name", "value"],
                              type: "object",
                            },
                            type: "array",
                          },
                        },
                        type: "object",
                      },
                      recurse: {
                        description:
                          "Recurse specifies whether to scan a directory recursively for manifests",
                        type: "boolean",
                      },
                    },
                    type: "object",
                  },
                  helm: {
                    description: "Helm holds helm specific options",
                    properties: {
                      fileParameters: {
                        description:
                          "FileParameters are file parameters to the helm template",
                        items: {
                          description:
                            "HelmFileParameter is a file parameter that's passed to helm template during manifest generation",
                          properties: {
                            name: {
                              description:
                                "Name is the name of the Helm parameter",
                              type: "string",
                            },
                            path: {
                              description:
                                "Path is the path to the file containing the values for the Helm parameter",
                              type: "string",
                            },
                          },
                          type: "object",
                        },
                        type: "array",
                      },
                      ignoreMissingValueFiles: {
                        description:
                          "IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values",
                        type: "boolean",
                      },
                      parameters: {
                        description:
                          "Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation",
                        items: {
                          description:
                            "HelmParameter is a parameter that's passed to helm template during manifest generation",
                          properties: {
                            forceString: {
                              description:
                                "ForceString determines whether to tell Helm to interpret booleans and numbers as strings",
                              type: "boolean",
                            },
                            name: {
                              description:
                                "Name is the name of the Helm parameter",
                              type: "string",
                            },
                            value: {
                              description:
                                "Value is the value for the Helm parameter",
                              type: "string",
                            },
                          },
                          type: "object",
                        },
                        type: "array",
                      },
                      passCredentials: {
                        description:
                          "PassCredentials pass credentials to all domains (Helm's --pass-credentials)",
                        type: "boolean",
                      },
                      releaseName: {
                        description:
                          "ReleaseName is the Helm release name to use. If omitted it will use the application name",
                        type: "string",
                      },
                      skipCrds: {
                        description:
                          "SkipCrds skips custom resource definition installation step (Helm's --skip-crds)",
                        type: "boolean",
                      },
                      valueFiles: {
                        description:
                          "ValuesFiles is a list of Helm value files to use when generating a template",
                        items: {
                          type: "string",
                        },
                        type: "array",
                      },
                      values: {
                        description:
                          "Values specifies Helm values to be passed to helm template, typically defined as a block",
                        type: "string",
                      },
                      version: {
                        description:
                          'Version is the Helm version to use for templating ("3")',
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  kustomize: {
                    description: "Kustomize holds kustomize specific options",
                    properties: {
                      commonAnnotations: {
                        additionalProperties: {
                          type: "string",
                        },
                        description:
                          "CommonAnnotations is a list of additional annotations to add to rendered manifests",
                        type: "object",
                      },
                      commonLabels: {
                        additionalProperties: {
                          type: "string",
                        },
                        description:
                          "CommonLabels is a list of additional labels to add to rendered manifests",
                        type: "object",
                      },
                      forceCommonAnnotations: {
                        description:
                          "ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps",
                        type: "boolean",
                      },
                      forceCommonLabels: {
                        description:
                          "ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps",
                        type: "boolean",
                      },
                      images: {
                        description:
                          "Images is a list of Kustomize image override specifications",
                        items: {
                          description:
                            "KustomizeImage represents a Kustomize image definition in the format [old_image_name=]<image_name>:<image_tag>",
                          type: "string",
                        },
                        type: "array",
                      },
                      namePrefix: {
                        description:
                          "NamePrefix is a prefix appended to resources for Kustomize apps",
                        type: "string",
                      },
                      nameSuffix: {
                        description:
                          "NameSuffix is a suffix appended to resources for Kustomize apps",
                        type: "string",
                      },
                      version: {
                        description:
                          "Version controls which version of Kustomize to use for rendering manifests",
                        type: "string",
                      },
                    },
                    type: "object",
                  },
                  path: {
                    description:
                      "Path is a directory path within the Git repository, and is only valid for applications sourced from Git.",
                    type: "string",
                  },
                  plugin: {
                    description:
                      "Plugin holds config management plugin specific options",
                    properties: {
                      env: {
                        description:
                          "Env is a list of environment variable entries",
                        items: {
                          description:
                            "EnvEntry represents an entry in the application's environment",
                          properties: {
                            name: {
                              description:
                                "Name is the name of the variable, usually expressed in uppercase",
                              type: "string",
                            },
                            value: {
                              description: "Value is the value of the variable",
                              type: "string",
                            },
                          },
                          required: ["name", "value"],
                          type: "object",
                        },
                        type: "array",
                      },
                      name: {
                        type: "string",
                      },
                      parameters: {
                        items: {
                          properties: {
                            array: {
                              description:
                                "Array is the value of an array type parameter.",
                              items: {
                                type: "string",
                              },
                              type: "array",
                            },
                            map: {
                              additionalProperties: {
                                type: "string",
                              },
                              description:
                                "Map is the value of a map type parameter.",
                              type: "object",
                            },
                            name: {
                              description:
                                "Name is the name identifying a parameter.",
                              type: "string",
                            },
                            string: {
                              description:
                                "String_ is the value of a string type parameter.",
                              type: "string",
                            },
                          },
                          type: "object",
                        },
                        type: "array",
                      },
                    },
                    type: "object",
                  },
                  repoURL: {
                    description:
                      "RepoURL is the URL to the repository (Git or Helm) that contains the application manifests",
                    type: "string",
                  },
                  targetRevision: {
                    description:
                      "TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.",
                    type: "string",
                  },
                },
                required: ["repoURL"],
                type: "object",
              },
            },
            required: ["deployedAt", "id", "revision"],
            type: "object",
          },
          type: "array",
        },
        observedAt: {
          description:
            "ObservedAt indicates when the application state was updated without querying latest git state Deprecated: controller no longer updates ObservedAt field",
          format: "date-time",
          type: "string",
        },
        operationState: {
          description:
            "OperationState contains information about any ongoing operations, such as a sync",
          properties: {
            finishedAt: {
              description: "FinishedAt contains time of operation completion",
              format: "date-time",
              type: "string",
            },
            message: {
              description:
                "Message holds any pertinent messages when attempting to perform operation (typically errors).",
              type: "string",
            },
            operation: {
              description: "Operation is the original requested operation",
              properties: {
                info: {
                  description:
                    "Info is a list of informational items for this operation",
                  items: {
                    properties: {
                      name: {
                        type: "string",
                      },
                      value: {
                        type: "string",
                      },
                    },
                    required: ["name", "value"],
                    type: "object",
                  },
                  type: "array",
                },
                initiatedBy: {
                  description:
                    "InitiatedBy contains information about who initiated the operations",
                  properties: {
                    automated: {
                      description:
                        "Automated is set to true if operation was initiated automatically by the application controller.",
                      type: "boolean",
                    },
                    username: {
                      description:
                        "Username contains the name of a user who started operation",
                      type: "string",
                    },
                  },
                  type: "object",
                },
                retry: {
                  description:
                    "Retry controls the strategy to apply if a sync fails",
                  properties: {
                    backoff: {
                      description:
                        "Backoff controls how to backoff on subsequent retries of failed syncs",
                      properties: {
                        duration: {
                          description:
                            'Duration is the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")',
                          type: "string",
                        },
                        factor: {
                          description:
                            "Factor is a factor to multiply the base duration after each failed retry",
                          format: "int64",
                          type: "integer",
                        },
                        maxDuration: {
                          description:
                            "MaxDuration is the maximum amount of time allowed for the backoff strategy",
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                    limit: {
                      description:
                        "Limit is the maximum number of attempts for retrying a failed sync. If set to 0, no retries will be performed.",
                      format: "int64",
                      type: "integer",
                    },
                  },
                  type: "object",
                },
                sync: {
                  description: "Sync contains parameters for the operation",
                  properties: {
                    dryRun: {
                      description:
                        "DryRun specifies to perform a `kubectl apply --dry-run` without actually performing the sync",
                      type: "boolean",
                    },
                    manifests: {
                      description:
                        "Manifests is an optional field that overrides sync source with a local directory for development",
                      items: {
                        type: "string",
                      },
                      type: "array",
                    },
                    prune: {
                      description:
                        "Prune specifies to delete resources from the cluster that are no longer tracked in git",
                      type: "boolean",
                    },
                    resources: {
                      description:
                        "Resources describes which resources shall be part of the sync",
                      items: {
                        description:
                          "SyncOperationResource contains resources to sync.",
                        properties: {
                          group: {
                            type: "string",
                          },
                          kind: {
                            type: "string",
                          },
                          name: {
                            type: "string",
                          },
                          namespace: {
                            type: "string",
                          },
                        },
                        required: ["kind", "name"],
                        type: "object",
                      },
                      type: "array",
                    },
                    revision: {
                      description:
                        "Revision is the revision (Git) or chart version (Helm) which to sync the application to If omitted, will use the revision specified in app spec.",
                      type: "string",
                    },
                    source: {
                      description:
                        "Source overrides the source definition set in the application. This is typically set in a Rollback operation and is nil during a Sync operation",
                      properties: {
                        chart: {
                          description:
                            "Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.",
                          type: "string",
                        },
                        directory: {
                          description:
                            "Directory holds path/directory specific options",
                          properties: {
                            exclude: {
                              description:
                                "Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation",
                              type: "string",
                            },
                            include: {
                              description:
                                "Include contains a glob pattern to match paths against that should be explicitly included during manifest generation",
                              type: "string",
                            },
                            jsonnet: {
                              description:
                                "Jsonnet holds options specific to Jsonnet",
                              properties: {
                                extVars: {
                                  description:
                                    "ExtVars is a list of Jsonnet External Variables",
                                  items: {
                                    description:
                                      "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                                    properties: {
                                      code: {
                                        type: "boolean",
                                      },
                                      name: {
                                        type: "string",
                                      },
                                      value: {
                                        type: "string",
                                      },
                                    },
                                    required: ["name", "value"],
                                    type: "object",
                                  },
                                  type: "array",
                                },
                                libs: {
                                  description: "Additional library search dirs",
                                  items: {
                                    type: "string",
                                  },
                                  type: "array",
                                },
                                tlas: {
                                  description:
                                    "TLAS is a list of Jsonnet Top-level Arguments",
                                  items: {
                                    description:
                                      "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                                    properties: {
                                      code: {
                                        type: "boolean",
                                      },
                                      name: {
                                        type: "string",
                                      },
                                      value: {
                                        type: "string",
                                      },
                                    },
                                    required: ["name", "value"],
                                    type: "object",
                                  },
                                  type: "array",
                                },
                              },
                              type: "object",
                            },
                            recurse: {
                              description:
                                "Recurse specifies whether to scan a directory recursively for manifests",
                              type: "boolean",
                            },
                          },
                          type: "object",
                        },
                        helm: {
                          description: "Helm holds helm specific options",
                          properties: {
                            fileParameters: {
                              description:
                                "FileParameters are file parameters to the helm template",
                              items: {
                                description:
                                  "HelmFileParameter is a file parameter that's passed to helm template during manifest generation",
                                properties: {
                                  name: {
                                    description:
                                      "Name is the name of the Helm parameter",
                                    type: "string",
                                  },
                                  path: {
                                    description:
                                      "Path is the path to the file containing the values for the Helm parameter",
                                    type: "string",
                                  },
                                },
                                type: "object",
                              },
                              type: "array",
                            },
                            ignoreMissingValueFiles: {
                              description:
                                "IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values",
                              type: "boolean",
                            },
                            parameters: {
                              description:
                                "Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation",
                              items: {
                                description:
                                  "HelmParameter is a parameter that's passed to helm template during manifest generation",
                                properties: {
                                  forceString: {
                                    description:
                                      "ForceString determines whether to tell Helm to interpret booleans and numbers as strings",
                                    type: "boolean",
                                  },
                                  name: {
                                    description:
                                      "Name is the name of the Helm parameter",
                                    type: "string",
                                  },
                                  value: {
                                    description:
                                      "Value is the value for the Helm parameter",
                                    type: "string",
                                  },
                                },
                                type: "object",
                              },
                              type: "array",
                            },
                            passCredentials: {
                              description:
                                "PassCredentials pass credentials to all domains (Helm's --pass-credentials)",
                              type: "boolean",
                            },
                            releaseName: {
                              description:
                                "ReleaseName is the Helm release name to use. If omitted it will use the application name",
                              type: "string",
                            },
                            skipCrds: {
                              description:
                                "SkipCrds skips custom resource definition installation step (Helm's --skip-crds)",
                              type: "boolean",
                            },
                            valueFiles: {
                              description:
                                "ValuesFiles is a list of Helm value files to use when generating a template",
                              items: {
                                type: "string",
                              },
                              type: "array",
                            },
                            values: {
                              description:
                                "Values specifies Helm values to be passed to helm template, typically defined as a block",
                              type: "string",
                            },
                            version: {
                              description:
                                'Version is the Helm version to use for templating ("3")',
                              type: "string",
                            },
                          },
                          type: "object",
                        },
                        kustomize: {
                          description:
                            "Kustomize holds kustomize specific options",
                          properties: {
                            commonAnnotations: {
                              additionalProperties: {
                                type: "string",
                              },
                              description:
                                "CommonAnnotations is a list of additional annotations to add to rendered manifests",
                              type: "object",
                            },
                            commonLabels: {
                              additionalProperties: {
                                type: "string",
                              },
                              description:
                                "CommonLabels is a list of additional labels to add to rendered manifests",
                              type: "object",
                            },
                            forceCommonAnnotations: {
                              description:
                                "ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps",
                              type: "boolean",
                            },
                            forceCommonLabels: {
                              description:
                                "ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps",
                              type: "boolean",
                            },
                            images: {
                              description:
                                "Images is a list of Kustomize image override specifications",
                              items: {
                                description:
                                  "KustomizeImage represents a Kustomize image definition in the format [old_image_name=]<image_name>:<image_tag>",
                                type: "string",
                              },
                              type: "array",
                            },
                            namePrefix: {
                              description:
                                "NamePrefix is a prefix appended to resources for Kustomize apps",
                              type: "string",
                            },
                            nameSuffix: {
                              description:
                                "NameSuffix is a suffix appended to resources for Kustomize apps",
                              type: "string",
                            },
                            version: {
                              description:
                                "Version controls which version of Kustomize to use for rendering manifests",
                              type: "string",
                            },
                          },
                          type: "object",
                        },
                        path: {
                          description:
                            "Path is a directory path within the Git repository, and is only valid for applications sourced from Git.",
                          type: "string",
                        },
                        plugin: {
                          description:
                            "Plugin holds config management plugin specific options",
                          properties: {
                            env: {
                              description:
                                "Env is a list of environment variable entries",
                              items: {
                                description:
                                  "EnvEntry represents an entry in the application's environment",
                                properties: {
                                  name: {
                                    description:
                                      "Name is the name of the variable, usually expressed in uppercase",
                                    type: "string",
                                  },
                                  value: {
                                    description:
                                      "Value is the value of the variable",
                                    type: "string",
                                  },
                                },
                                required: ["name", "value"],
                                type: "object",
                              },
                              type: "array",
                            },
                            name: {
                              type: "string",
                            },
                            parameters: {
                              items: {
                                properties: {
                                  array: {
                                    description:
                                      "Array is the value of an array type parameter.",
                                    items: {
                                      type: "string",
                                    },
                                    type: "array",
                                  },
                                  map: {
                                    additionalProperties: {
                                      type: "string",
                                    },
                                    description:
                                      "Map is the value of a map type parameter.",
                                    type: "object",
                                  },
                                  name: {
                                    description:
                                      "Name is the name identifying a parameter.",
                                    type: "string",
                                  },
                                  string: {
                                    description:
                                      "String_ is the value of a string type parameter.",
                                    type: "string",
                                  },
                                },
                                type: "object",
                              },
                              type: "array",
                            },
                          },
                          type: "object",
                        },
                        repoURL: {
                          description:
                            "RepoURL is the URL to the repository (Git or Helm) that contains the application manifests",
                          type: "string",
                        },
                        targetRevision: {
                          description:
                            "TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.",
                          type: "string",
                        },
                      },
                      required: ["repoURL"],
                      type: "object",
                    },
                    syncOptions: {
                      description:
                        "SyncOptions provide per-sync sync-options, e.g. Validate=false",
                      items: {
                        type: "string",
                      },
                      type: "array",
                    },
                    syncStrategy: {
                      description:
                        "SyncStrategy describes how to perform the sync",
                      properties: {
                        apply: {
                          description:
                            "Apply will perform a `kubectl apply` to perform the sync.",
                          properties: {
                            force: {
                              description:
                                "Force indicates whether or not to supply the --force flag to `kubectl apply`. The --force flag deletes and re-create the resource, when PATCH encounters conflict and has retried for 5 times.",
                              type: "boolean",
                            },
                          },
                          type: "object",
                        },
                        hook: {
                          description:
                            "Hook will submit any referenced resources to perform the sync. This is the default strategy",
                          properties: {
                            force: {
                              description:
                                "Force indicates whether or not to supply the --force flag to `kubectl apply`. The --force flag deletes and re-create the resource, when PATCH encounters conflict and has retried for 5 times.",
                              type: "boolean",
                            },
                          },
                          type: "object",
                        },
                      },
                      type: "object",
                    },
                  },
                  type: "object",
                },
              },
              type: "object",
            },
            phase: {
              description: "Phase is the current phase of the operation",
              type: "string",
            },
            retryCount: {
              description: "RetryCount contains time of operation retries",
              format: "int64",
              type: "integer",
            },
            startedAt: {
              description: "StartedAt contains time of operation start",
              format: "date-time",
              type: "string",
            },
            syncResult: {
              description: "SyncResult is the result of a Sync operation",
              properties: {
                resources: {
                  description:
                    "Resources contains a list of sync result items for each individual resource in a sync operation",
                  items: {
                    description:
                      "ResourceResult holds the operation result details of a specific resource",
                    properties: {
                      group: {
                        description:
                          "Group specifies the API group of the resource",
                        type: "string",
                      },
                      hookPhase: {
                        description:
                          "HookPhase contains the state of any operation associated with this resource OR hook This can also contain values for non-hook resources.",
                        type: "string",
                      },
                      hookType: {
                        description:
                          "HookType specifies the type of the hook. Empty for non-hook resources",
                        type: "string",
                      },
                      kind: {
                        description:
                          "Kind specifies the API kind of the resource",
                        type: "string",
                      },
                      message: {
                        description:
                          "Message contains an informational or error message for the last sync OR operation",
                        type: "string",
                      },
                      name: {
                        description: "Name specifies the name of the resource",
                        type: "string",
                      },
                      namespace: {
                        description:
                          "Namespace specifies the target namespace of the resource",
                        type: "string",
                      },
                      status: {
                        description:
                          "Status holds the final result of the sync. Will be empty if the resources is yet to be applied/pruned and is always zero-value for hooks",
                        type: "string",
                      },
                      syncPhase: {
                        description:
                          "SyncPhase indicates the particular phase of the sync that this result was acquired in",
                        type: "string",
                      },
                      version: {
                        description:
                          "Version specifies the API version of the resource",
                        type: "string",
                      },
                    },
                    required: ["group", "kind", "name", "namespace", "version"],
                    type: "object",
                  },
                  type: "array",
                },
                revision: {
                  description:
                    "Revision holds the revision this sync operation was performed to",
                  type: "string",
                },
                source: {
                  description:
                    "Source records the application source information of the sync, used for comparing auto-sync",
                  properties: {
                    chart: {
                      description:
                        "Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.",
                      type: "string",
                    },
                    directory: {
                      description:
                        "Directory holds path/directory specific options",
                      properties: {
                        exclude: {
                          description:
                            "Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation",
                          type: "string",
                        },
                        include: {
                          description:
                            "Include contains a glob pattern to match paths against that should be explicitly included during manifest generation",
                          type: "string",
                        },
                        jsonnet: {
                          description:
                            "Jsonnet holds options specific to Jsonnet",
                          properties: {
                            extVars: {
                              description:
                                "ExtVars is a list of Jsonnet External Variables",
                              items: {
                                description:
                                  "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                                properties: {
                                  code: {
                                    type: "boolean",
                                  },
                                  name: {
                                    type: "string",
                                  },
                                  value: {
                                    type: "string",
                                  },
                                },
                                required: ["name", "value"],
                                type: "object",
                              },
                              type: "array",
                            },
                            libs: {
                              description: "Additional library search dirs",
                              items: {
                                type: "string",
                              },
                              type: "array",
                            },
                            tlas: {
                              description:
                                "TLAS is a list of Jsonnet Top-level Arguments",
                              items: {
                                description:
                                  "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                                properties: {
                                  code: {
                                    type: "boolean",
                                  },
                                  name: {
                                    type: "string",
                                  },
                                  value: {
                                    type: "string",
                                  },
                                },
                                required: ["name", "value"],
                                type: "object",
                              },
                              type: "array",
                            },
                          },
                          type: "object",
                        },
                        recurse: {
                          description:
                            "Recurse specifies whether to scan a directory recursively for manifests",
                          type: "boolean",
                        },
                      },
                      type: "object",
                    },
                    helm: {
                      description: "Helm holds helm specific options",
                      properties: {
                        fileParameters: {
                          description:
                            "FileParameters are file parameters to the helm template",
                          items: {
                            description:
                              "HelmFileParameter is a file parameter that's passed to helm template during manifest generation",
                            properties: {
                              name: {
                                description:
                                  "Name is the name of the Helm parameter",
                                type: "string",
                              },
                              path: {
                                description:
                                  "Path is the path to the file containing the values for the Helm parameter",
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          type: "array",
                        },
                        ignoreMissingValueFiles: {
                          description:
                            "IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values",
                          type: "boolean",
                        },
                        parameters: {
                          description:
                            "Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation",
                          items: {
                            description:
                              "HelmParameter is a parameter that's passed to helm template during manifest generation",
                            properties: {
                              forceString: {
                                description:
                                  "ForceString determines whether to tell Helm to interpret booleans and numbers as strings",
                                type: "boolean",
                              },
                              name: {
                                description:
                                  "Name is the name of the Helm parameter",
                                type: "string",
                              },
                              value: {
                                description:
                                  "Value is the value for the Helm parameter",
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          type: "array",
                        },
                        passCredentials: {
                          description:
                            "PassCredentials pass credentials to all domains (Helm's --pass-credentials)",
                          type: "boolean",
                        },
                        releaseName: {
                          description:
                            "ReleaseName is the Helm release name to use. If omitted it will use the application name",
                          type: "string",
                        },
                        skipCrds: {
                          description:
                            "SkipCrds skips custom resource definition installation step (Helm's --skip-crds)",
                          type: "boolean",
                        },
                        valueFiles: {
                          description:
                            "ValuesFiles is a list of Helm value files to use when generating a template",
                          items: {
                            type: "string",
                          },
                          type: "array",
                        },
                        values: {
                          description:
                            "Values specifies Helm values to be passed to helm template, typically defined as a block",
                          type: "string",
                        },
                        version: {
                          description:
                            'Version is the Helm version to use for templating ("3")',
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                    kustomize: {
                      description: "Kustomize holds kustomize specific options",
                      properties: {
                        commonAnnotations: {
                          additionalProperties: {
                            type: "string",
                          },
                          description:
                            "CommonAnnotations is a list of additional annotations to add to rendered manifests",
                          type: "object",
                        },
                        commonLabels: {
                          additionalProperties: {
                            type: "string",
                          },
                          description:
                            "CommonLabels is a list of additional labels to add to rendered manifests",
                          type: "object",
                        },
                        forceCommonAnnotations: {
                          description:
                            "ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps",
                          type: "boolean",
                        },
                        forceCommonLabels: {
                          description:
                            "ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps",
                          type: "boolean",
                        },
                        images: {
                          description:
                            "Images is a list of Kustomize image override specifications",
                          items: {
                            description:
                              "KustomizeImage represents a Kustomize image definition in the format [old_image_name=]<image_name>:<image_tag>",
                            type: "string",
                          },
                          type: "array",
                        },
                        namePrefix: {
                          description:
                            "NamePrefix is a prefix appended to resources for Kustomize apps",
                          type: "string",
                        },
                        nameSuffix: {
                          description:
                            "NameSuffix is a suffix appended to resources for Kustomize apps",
                          type: "string",
                        },
                        version: {
                          description:
                            "Version controls which version of Kustomize to use for rendering manifests",
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                    path: {
                      description:
                        "Path is a directory path within the Git repository, and is only valid for applications sourced from Git.",
                      type: "string",
                    },
                    plugin: {
                      description:
                        "Plugin holds config management plugin specific options",
                      properties: {
                        env: {
                          description:
                            "Env is a list of environment variable entries",
                          items: {
                            description:
                              "EnvEntry represents an entry in the application's environment",
                            properties: {
                              name: {
                                description:
                                  "Name is the name of the variable, usually expressed in uppercase",
                                type: "string",
                              },
                              value: {
                                description:
                                  "Value is the value of the variable",
                                type: "string",
                              },
                            },
                            required: ["name", "value"],
                            type: "object",
                          },
                          type: "array",
                        },
                        name: {
                          type: "string",
                        },
                        parameters: {
                          items: {
                            properties: {
                              array: {
                                description:
                                  "Array is the value of an array type parameter.",
                                items: {
                                  type: "string",
                                },
                                type: "array",
                              },
                              map: {
                                additionalProperties: {
                                  type: "string",
                                },
                                description:
                                  "Map is the value of a map type parameter.",
                                type: "object",
                              },
                              name: {
                                description:
                                  "Name is the name identifying a parameter.",
                                type: "string",
                              },
                              string: {
                                description:
                                  "String_ is the value of a string type parameter.",
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          type: "array",
                        },
                      },
                      type: "object",
                    },
                    repoURL: {
                      description:
                        "RepoURL is the URL to the repository (Git or Helm) that contains the application manifests",
                      type: "string",
                    },
                    targetRevision: {
                      description:
                        "TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.",
                      type: "string",
                    },
                  },
                  required: ["repoURL"],
                  type: "object",
                },
              },
              required: ["revision"],
              type: "object",
            },
          },
          required: ["operation", "phase", "startedAt"],
          type: "object",
        },
        reconciledAt: {
          description:
            "ReconciledAt indicates when the application state was reconciled using the latest git version",
          format: "date-time",
          type: "string",
        },
        resourceHealthSource: {
          description:
            "ResourceHealthSource indicates where the resource health status is stored: inline if not set or appTree",
          type: "string",
        },
        resources: {
          description:
            "Resources is a list of Kubernetes resources managed by this application",
          items: {
            description:
              "ResourceStatus holds the current sync and health status of a resource TODO: describe members of this type",
            properties: {
              group: {
                type: "string",
              },
              health: {
                description:
                  "HealthStatus contains information about the currently observed health state of an application or resource",
                properties: {
                  message: {
                    description:
                      "Message is a human-readable informational message describing the health status",
                    type: "string",
                  },
                  status: {
                    description:
                      "Status holds the status code of the application or resource",
                    type: "string",
                  },
                },
                type: "object",
              },
              hook: {
                type: "boolean",
              },
              kind: {
                type: "string",
              },
              name: {
                type: "string",
              },
              namespace: {
                type: "string",
              },
              requiresPruning: {
                type: "boolean",
              },
              status: {
                description:
                  "SyncStatusCode is a type which represents possible comparison results",
                type: "string",
              },
              syncWave: {
                format: "int64",
                type: "integer",
              },
              version: {
                type: "string",
              },
            },
            type: "object",
          },
          type: "array",
        },
        sourceType: {
          description: "SourceType specifies the type of this application",
          type: "string",
        },
        summary: {
          description:
            "Summary contains a list of URLs and container images used by this application",
          properties: {
            externalURLs: {
              description:
                "ExternalURLs holds all external URLs of application child resources.",
              items: {
                type: "string",
              },
              type: "array",
            },
            images: {
              description:
                "Images holds all images of application child resources.",
              items: {
                type: "string",
              },
              type: "array",
            },
          },
          type: "object",
        },
        sync: {
          description:
            "Sync contains information about the application's current sync status",
          properties: {
            comparedTo: {
              description:
                "ComparedTo contains information about what has been compared",
              properties: {
                destination: {
                  description:
                    "Destination is a reference to the application's destination used for comparison",
                  properties: {
                    name: {
                      description:
                        "Name is an alternate way of specifying the target cluster by its symbolic name",
                      type: "string",
                    },
                    namespace: {
                      description:
                        "Namespace specifies the target namespace for the application's resources. The namespace will only be set for namespace-scoped resources that have not set a value for .metadata.namespace",
                      type: "string",
                    },
                    server: {
                      description:
                        "Server specifies the URL of the target cluster and must be set to the Kubernetes control plane API",
                      type: "string",
                    },
                  },
                  type: "object",
                },
                source: {
                  description:
                    "Source is a reference to the application's source used for comparison",
                  properties: {
                    chart: {
                      description:
                        "Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.",
                      type: "string",
                    },
                    directory: {
                      description:
                        "Directory holds path/directory specific options",
                      properties: {
                        exclude: {
                          description:
                            "Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation",
                          type: "string",
                        },
                        include: {
                          description:
                            "Include contains a glob pattern to match paths against that should be explicitly included during manifest generation",
                          type: "string",
                        },
                        jsonnet: {
                          description:
                            "Jsonnet holds options specific to Jsonnet",
                          properties: {
                            extVars: {
                              description:
                                "ExtVars is a list of Jsonnet External Variables",
                              items: {
                                description:
                                  "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                                properties: {
                                  code: {
                                    type: "boolean",
                                  },
                                  name: {
                                    type: "string",
                                  },
                                  value: {
                                    type: "string",
                                  },
                                },
                                required: ["name", "value"],
                                type: "object",
                              },
                              type: "array",
                            },
                            libs: {
                              description: "Additional library search dirs",
                              items: {
                                type: "string",
                              },
                              type: "array",
                            },
                            tlas: {
                              description:
                                "TLAS is a list of Jsonnet Top-level Arguments",
                              items: {
                                description:
                                  "JsonnetVar represents a variable to be passed to jsonnet during manifest generation",
                                properties: {
                                  code: {
                                    type: "boolean",
                                  },
                                  name: {
                                    type: "string",
                                  },
                                  value: {
                                    type: "string",
                                  },
                                },
                                required: ["name", "value"],
                                type: "object",
                              },
                              type: "array",
                            },
                          },
                          type: "object",
                        },
                        recurse: {
                          description:
                            "Recurse specifies whether to scan a directory recursively for manifests",
                          type: "boolean",
                        },
                      },
                      type: "object",
                    },
                    helm: {
                      description: "Helm holds helm specific options",
                      properties: {
                        fileParameters: {
                          description:
                            "FileParameters are file parameters to the helm template",
                          items: {
                            description:
                              "HelmFileParameter is a file parameter that's passed to helm template during manifest generation",
                            properties: {
                              name: {
                                description:
                                  "Name is the name of the Helm parameter",
                                type: "string",
                              },
                              path: {
                                description:
                                  "Path is the path to the file containing the values for the Helm parameter",
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          type: "array",
                        },
                        ignoreMissingValueFiles: {
                          description:
                            "IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values",
                          type: "boolean",
                        },
                        parameters: {
                          description:
                            "Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation",
                          items: {
                            description:
                              "HelmParameter is a parameter that's passed to helm template during manifest generation",
                            properties: {
                              forceString: {
                                description:
                                  "ForceString determines whether to tell Helm to interpret booleans and numbers as strings",
                                type: "boolean",
                              },
                              name: {
                                description:
                                  "Name is the name of the Helm parameter",
                                type: "string",
                              },
                              value: {
                                description:
                                  "Value is the value for the Helm parameter",
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          type: "array",
                        },
                        passCredentials: {
                          description:
                            "PassCredentials pass credentials to all domains (Helm's --pass-credentials)",
                          type: "boolean",
                        },
                        releaseName: {
                          description:
                            "ReleaseName is the Helm release name to use. If omitted it will use the application name",
                          type: "string",
                        },
                        skipCrds: {
                          description:
                            "SkipCrds skips custom resource definition installation step (Helm's --skip-crds)",
                          type: "boolean",
                        },
                        valueFiles: {
                          description:
                            "ValuesFiles is a list of Helm value files to use when generating a template",
                          items: {
                            type: "string",
                          },
                          type: "array",
                        },
                        values: {
                          description:
                            "Values specifies Helm values to be passed to helm template, typically defined as a block",
                          type: "string",
                        },
                        version: {
                          description:
                            'Version is the Helm version to use for templating ("3")',
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                    kustomize: {
                      description: "Kustomize holds kustomize specific options",
                      properties: {
                        commonAnnotations: {
                          additionalProperties: {
                            type: "string",
                          },
                          description:
                            "CommonAnnotations is a list of additional annotations to add to rendered manifests",
                          type: "object",
                        },
                        commonLabels: {
                          additionalProperties: {
                            type: "string",
                          },
                          description:
                            "CommonLabels is a list of additional labels to add to rendered manifests",
                          type: "object",
                        },
                        forceCommonAnnotations: {
                          description:
                            "ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps",
                          type: "boolean",
                        },
                        forceCommonLabels: {
                          description:
                            "ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps",
                          type: "boolean",
                        },
                        images: {
                          description:
                            "Images is a list of Kustomize image override specifications",
                          items: {
                            description:
                              "KustomizeImage represents a Kustomize image definition in the format [old_image_name=]<image_name>:<image_tag>",
                            type: "string",
                          },
                          type: "array",
                        },
                        namePrefix: {
                          description:
                            "NamePrefix is a prefix appended to resources for Kustomize apps",
                          type: "string",
                        },
                        nameSuffix: {
                          description:
                            "NameSuffix is a suffix appended to resources for Kustomize apps",
                          type: "string",
                        },
                        version: {
                          description:
                            "Version controls which version of Kustomize to use for rendering manifests",
                          type: "string",
                        },
                      },
                      type: "object",
                    },
                    path: {
                      description:
                        "Path is a directory path within the Git repository, and is only valid for applications sourced from Git.",
                      type: "string",
                    },
                    plugin: {
                      description:
                        "Plugin holds config management plugin specific options",
                      properties: {
                        env: {
                          description:
                            "Env is a list of environment variable entries",
                          items: {
                            description:
                              "EnvEntry represents an entry in the application's environment",
                            properties: {
                              name: {
                                description:
                                  "Name is the name of the variable, usually expressed in uppercase",
                                type: "string",
                              },
                              value: {
                                description:
                                  "Value is the value of the variable",
                                type: "string",
                              },
                            },
                            required: ["name", "value"],
                            type: "object",
                          },
                          type: "array",
                        },
                        name: {
                          type: "string",
                        },
                        parameters: {
                          items: {
                            properties: {
                              array: {
                                description:
                                  "Array is the value of an array type parameter.",
                                items: {
                                  type: "string",
                                },
                                type: "array",
                              },
                              map: {
                                additionalProperties: {
                                  type: "string",
                                },
                                description:
                                  "Map is the value of a map type parameter.",
                                type: "object",
                              },
                              name: {
                                description:
                                  "Name is the name identifying a parameter.",
                                type: "string",
                              },
                              string: {
                                description:
                                  "String_ is the value of a string type parameter.",
                                type: "string",
                              },
                            },
                            type: "object",
                          },
                          type: "array",
                        },
                      },
                      type: "object",
                    },
                    repoURL: {
                      description:
                        "RepoURL is the URL to the repository (Git or Helm) that contains the application manifests",
                      type: "string",
                    },
                    targetRevision: {
                      description:
                        "TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.",
                      type: "string",
                    },
                  },
                  required: ["repoURL"],
                  type: "object",
                },
              },
              required: ["destination", "source"],
              type: "object",
            },
            revision: {
              description:
                "Revision contains information about the revision the comparison has been performed to",
              type: "string",
            },
            status: {
              description: "Status is the sync state of the comparison",
              type: "string",
            },
          },
          required: ["status"],
          type: "object",
        },
      },
      type: "object",
    },
  },
  required: ["metadata", "spec"],
  type: "object",
};
