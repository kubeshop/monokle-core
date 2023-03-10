const CONFIGMAP_NAMES: string[] = [
  "argocd-cm",
  "argocd-cmd-params-cm",
  "argocd-rbac-cm",
  "argocd-tls-certs-cm",
  "argocd-ssh-known-hosts-cm",
];

export const ARGO_PLUGIN = {
  id: "ARGOCD",
  name: "argo",
  displayName: "ArgoCD Validation plugin",
  description: "Validation rules related to ArgoCD",
  rules: {
    argoConfigMaps: {
      id: 1,
      description: "Check that ArgoCD ConfigMaps have required label",
      help: "Add app.kubernetes.io/part-of: argocd label to this ConfigMap for ArgoCD to use it",
      validate({ resources }, { report }) {
        resources
          .filter((resource) => isConfigMap(resource))
          .filter((resource) =>
            CONFIGMAP_NAMES.includes(resource.metadata?.name)
          )
          .forEach((resource) => {
            const labels = resource.metadata?.labels ?? {};

            if (labels["app.kubernetes.io/part-of"] !== "argocd") {
              report(resource, { path: "metadata.labels" });
            }
          });
      },
    },
    appDestination: {
      id: 2,
      description: "Argo Application's destination are mutually exclusive",
      help: "Either use 'server' or 'name', but not both.",
      validate({ resources }, { report }) {
        resources.filter(isApplication).forEach((app) => {
          const hasName = app.spec.destination.name !== undefined;
          const hasServer = app.spec.destination.server !== undefined;
          const isValid = (!hasName && hasServer) || (hasName && !hasServer);
          if (isValid) return;
          report(app, { path: "spec.destination" });
        });
      },
    },
  },
};

function isConfigMap(resource: unknown): resource is ConfigMap {
  return (
    typeof resource === "object" &&
    (resource as any)?.apiVersion === "v1" &&
    (resource as any)?.kind === "ConfigMap"
  );
}

function isApplication(resource: unknown): resource is Application {
  return (
    typeof resource === "object" &&
    (resource as any)?.apiVersion === "argoproj.io/v1alpha1" &&
    (resource as any)?.kind === "Application"
  );
}

/**
 * Application is a definition of Application resource.
 */
export interface Application {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: string;
  metadata: {};
  /**
   * Operation contains information about a requested or running operation
   */
  operation?: {
    /**
     * Info is a list of informational items for this operation
     */
    info?: {
      name: string;
      value: string;
    }[];
    /**
     * InitiatedBy contains information about who initiated the operations
     */
    initiatedBy?: {
      /**
       * Automated is set to true if operation was initiated automatically by the application controller.
       */
      automated?: boolean;
      /**
       * Username contains the name of a user who started operation
       */
      username?: string;
    };
    /**
     * Retry controls the strategy to apply if a sync fails
     */
    retry?: {
      /**
       * Backoff controls how to backoff on subsequent retries of failed syncs
       */
      backoff?: {
        /**
         * Duration is the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")
         */
        duration?: string;
        /**
         * Factor is a factor to multiply the base duration after each failed retry
         */
        factor?: number;
        /**
         * MaxDuration is the maximum amount of time allowed for the backoff strategy
         */
        maxDuration?: string;
      };
      /**
       * Limit is the maximum number of attempts for retrying a failed sync. If set to 0, no retries will be performed.
       */
      limit?: number;
    };
    /**
     * Sync contains parameters for the operation
     */
    sync?: {
      /**
       * DryRun specifies to perform a `kubectl apply --dry-run` without actually performing the sync
       */
      dryRun?: boolean;
      /**
       * Manifests is an optional field that overrides sync source with a local directory for development
       */
      manifests?: string[];
      /**
       * Prune specifies to delete resources from the cluster that are no longer tracked in git
       */
      prune?: boolean;
      /**
       * Resources describes which resources shall be part of the sync
       */
      resources?: {
        group?: string;
        kind: string;
        name: string;
        namespace?: string;
      }[];
      /**
       * Revision is the revision (Git) or chart version (Helm) which to sync the application to If omitted, will use the revision specified in app spec.
       */
      revision?: string;
      /**
       * Source overrides the source definition set in the application. This is typically set in a Rollback operation and is nil during a Sync operation
       */
      source?: {
        /**
         * Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.
         */
        chart?: string;
        /**
         * Directory holds path/directory specific options
         */
        directory?: {
          /**
           * Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation
           */
          exclude?: string;
          /**
           * Include contains a glob pattern to match paths against that should be explicitly included during manifest generation
           */
          include?: string;
          /**
           * Jsonnet holds options specific to Jsonnet
           */
          jsonnet?: {
            /**
             * ExtVars is a list of Jsonnet External Variables
             */
            extVars?: {
              code?: boolean;
              name: string;
              value: string;
            }[];
            /**
             * Additional library search dirs
             */
            libs?: string[];
            /**
             * TLAS is a list of Jsonnet Top-level Arguments
             */
            tlas?: {
              code?: boolean;
              name: string;
              value: string;
            }[];
          };
          /**
           * Recurse specifies whether to scan a directory recursively for manifests
           */
          recurse?: boolean;
        };
        /**
         * Helm holds helm specific options
         */
        helm?: {
          /**
           * FileParameters are file parameters to the helm template
           */
          fileParameters?: {
            /**
             * Name is the name of the Helm parameter
             */
            name?: string;
            /**
             * Path is the path to the file containing the values for the Helm parameter
             */
            path?: string;
          }[];
          /**
           * IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values
           */
          ignoreMissingValueFiles?: boolean;
          /**
           * Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation
           */
          parameters?: {
            /**
             * ForceString determines whether to tell Helm to interpret booleans and numbers as strings
             */
            forceString?: boolean;
            /**
             * Name is the name of the Helm parameter
             */
            name?: string;
            /**
             * Value is the value for the Helm parameter
             */
            value?: string;
          }[];
          /**
           * PassCredentials pass credentials to all domains (Helm's --pass-credentials)
           */
          passCredentials?: boolean;
          /**
           * ReleaseName is the Helm release name to use. If omitted it will use the application name
           */
          releaseName?: string;
          /**
           * SkipCrds skips custom resource definition installation step (Helm's --skip-crds)
           */
          skipCrds?: boolean;
          /**
           * ValuesFiles is a list of Helm value files to use when generating a template
           */
          valueFiles?: string[];
          /**
           * Values specifies Helm values to be passed to helm template, typically defined as a block
           */
          values?: string;
          /**
           * Version is the Helm version to use for templating ("3")
           */
          version?: string;
        };
        /**
         * Kustomize holds kustomize specific options
         */
        kustomize?: {
          /**
           * CommonAnnotations is a list of additional annotations to add to rendered manifests
           */
          commonAnnotations?: {
            [k: string]: string;
          };
          /**
           * CommonLabels is a list of additional labels to add to rendered manifests
           */
          commonLabels?: {
            [k: string]: string;
          };
          /**
           * ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps
           */
          forceCommonAnnotations?: boolean;
          /**
           * ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps
           */
          forceCommonLabels?: boolean;
          /**
           * Images is a list of Kustomize image override specifications
           */
          images?: string[];
          /**
           * NamePrefix is a prefix appended to resources for Kustomize apps
           */
          namePrefix?: string;
          /**
           * NameSuffix is a suffix appended to resources for Kustomize apps
           */
          nameSuffix?: string;
          /**
           * Version controls which version of Kustomize to use for rendering manifests
           */
          version?: string;
        };
        /**
         * Path is a directory path within the Git repository, and is only valid for applications sourced from Git.
         */
        path?: string;
        /**
         * Plugin holds config management plugin specific options
         */
        plugin?: {
          /**
           * Env is a list of environment variable entries
           */
          env?: {
            /**
             * Name is the name of the variable, usually expressed in uppercase
             */
            name: string;
            /**
             * Value is the value of the variable
             */
            value: string;
          }[];
          name?: string;
          parameters?: {
            /**
             * Array is the value of an array type parameter.
             */
            array?: string[];
            /**
             * Map is the value of a map type parameter.
             */
            map?: {
              [k: string]: string;
            };
            /**
             * Name is the name identifying a parameter.
             */
            name?: string;
            /**
             * String_ is the value of a string type parameter.
             */
            string?: string;
          }[];
        };
        /**
         * RepoURL is the URL to the repository (Git or Helm) that contains the application manifests
         */
        repoURL: string;
        /**
         * TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.
         */
        targetRevision?: string;
      };
      /**
       * SyncOptions provide per-sync sync-options, e.g. Validate=false
       */
      syncOptions?: string[];
      /**
       * SyncStrategy describes how to perform the sync
       */
      syncStrategy?: {
        /**
         * Apply will perform a `kubectl apply` to perform the sync.
         */
        apply?: {
          /**
           * Force indicates whether or not to supply the --force flag to `kubectl apply`. The --force flag deletes and re-create the resource, when PATCH encounters conflict and has retried for 5 times.
           */
          force?: boolean;
        };
        /**
         * Hook will submit any referenced resources to perform the sync. This is the default strategy
         */
        hook?: {
          /**
           * Force indicates whether or not to supply the --force flag to `kubectl apply`. The --force flag deletes and re-create the resource, when PATCH encounters conflict and has retried for 5 times.
           */
          force?: boolean;
        };
      };
    };
  };
  /**
   * ApplicationSpec represents desired application state. Contains link to repository with application definition and additional parameters link definition revision.
   */
  spec: {
    /**
     * Destination is a reference to the target Kubernetes server and namespace
     */
    destination: {
      /**
       * Name is an alternate way of specifying the target cluster by its symbolic name
       */
      name?: string;
      /**
       * Namespace specifies the target namespace for the application's resources. The namespace will only be set for namespace-scoped resources that have not set a value for .metadata.namespace
       */
      namespace?: string;
      /**
       * Server specifies the URL of the target cluster and must be set to the Kubernetes control plane API
       */
      server?: string;
    };
    /**
     * IgnoreDifferences is a list of resources and their fields which should be ignored during comparison
     */
    ignoreDifferences?: {
      group?: string;
      jqPathExpressions?: string[];
      jsonPointers?: string[];
      kind: string;
      /**
       * ManagedFieldsManagers is a list of trusted managers. Fields mutated by those managers will take precedence over the desired state defined in the SCM and won't be displayed in diffs
       */
      managedFieldsManagers?: string[];
      name?: string;
      namespace?: string;
    }[];
    /**
     * Info contains a list of information (URLs, email addresses, and plain text) that relates to the application
     */
    info?: {
      name: string;
      value: string;
    }[];
    /**
     * Project is a reference to the project this application belongs to. The empty string means that application belongs to the 'default' project.
     */
    project: string;
    /**
     * RevisionHistoryLimit limits the number of items kept in the application's revision history, which is used for informational purposes as well as for rollbacks to previous versions. This should only be changed in exceptional circumstances. Setting to zero will store no history. This will reduce storage used. Increasing will increase the space used to store the history, so we do not recommend increasing it. Default is 10.
     */
    revisionHistoryLimit?: number;
    /**
     * Source is a reference to the location of the application's manifests or chart
     */
    source: {
      /**
       * Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.
       */
      chart?: string;
      /**
       * Directory holds path/directory specific options
       */
      directory?: {
        /**
         * Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation
         */
        exclude?: string;
        /**
         * Include contains a glob pattern to match paths against that should be explicitly included during manifest generation
         */
        include?: string;
        /**
         * Jsonnet holds options specific to Jsonnet
         */
        jsonnet?: {
          /**
           * ExtVars is a list of Jsonnet External Variables
           */
          extVars?: {
            code?: boolean;
            name: string;
            value: string;
          }[];
          /**
           * Additional library search dirs
           */
          libs?: string[];
          /**
           * TLAS is a list of Jsonnet Top-level Arguments
           */
          tlas?: {
            code?: boolean;
            name: string;
            value: string;
          }[];
        };
        /**
         * Recurse specifies whether to scan a directory recursively for manifests
         */
        recurse?: boolean;
      };
      /**
       * Helm holds helm specific options
       */
      helm?: {
        /**
         * FileParameters are file parameters to the helm template
         */
        fileParameters?: {
          /**
           * Name is the name of the Helm parameter
           */
          name?: string;
          /**
           * Path is the path to the file containing the values for the Helm parameter
           */
          path?: string;
        }[];
        /**
         * IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values
         */
        ignoreMissingValueFiles?: boolean;
        /**
         * Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation
         */
        parameters?: {
          /**
           * ForceString determines whether to tell Helm to interpret booleans and numbers as strings
           */
          forceString?: boolean;
          /**
           * Name is the name of the Helm parameter
           */
          name?: string;
          /**
           * Value is the value for the Helm parameter
           */
          value?: string;
        }[];
        /**
         * PassCredentials pass credentials to all domains (Helm's --pass-credentials)
         */
        passCredentials?: boolean;
        /**
         * ReleaseName is the Helm release name to use. If omitted it will use the application name
         */
        releaseName?: string;
        /**
         * SkipCrds skips custom resource definition installation step (Helm's --skip-crds)
         */
        skipCrds?: boolean;
        /**
         * ValuesFiles is a list of Helm value files to use when generating a template
         */
        valueFiles?: string[];
        /**
         * Values specifies Helm values to be passed to helm template, typically defined as a block
         */
        values?: string;
        /**
         * Version is the Helm version to use for templating ("3")
         */
        version?: string;
      };
      /**
       * Kustomize holds kustomize specific options
       */
      kustomize?: {
        /**
         * CommonAnnotations is a list of additional annotations to add to rendered manifests
         */
        commonAnnotations?: {
          [k: string]: string;
        };
        /**
         * CommonLabels is a list of additional labels to add to rendered manifests
         */
        commonLabels?: {
          [k: string]: string;
        };
        /**
         * ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps
         */
        forceCommonAnnotations?: boolean;
        /**
         * ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps
         */
        forceCommonLabels?: boolean;
        /**
         * Images is a list of Kustomize image override specifications
         */
        images?: string[];
        /**
         * NamePrefix is a prefix appended to resources for Kustomize apps
         */
        namePrefix?: string;
        /**
         * NameSuffix is a suffix appended to resources for Kustomize apps
         */
        nameSuffix?: string;
        /**
         * Version controls which version of Kustomize to use for rendering manifests
         */
        version?: string;
      };
      /**
       * Path is a directory path within the Git repository, and is only valid for applications sourced from Git.
       */
      path?: string;
      /**
       * Plugin holds config management plugin specific options
       */
      plugin?: {
        /**
         * Env is a list of environment variable entries
         */
        env?: {
          /**
           * Name is the name of the variable, usually expressed in uppercase
           */
          name: string;
          /**
           * Value is the value of the variable
           */
          value: string;
        }[];
        name?: string;
        parameters?: {
          /**
           * Array is the value of an array type parameter.
           */
          array?: string[];
          /**
           * Map is the value of a map type parameter.
           */
          map?: {
            [k: string]: string;
          };
          /**
           * Name is the name identifying a parameter.
           */
          name?: string;
          /**
           * String_ is the value of a string type parameter.
           */
          string?: string;
        }[];
      };
      /**
       * RepoURL is the URL to the repository (Git or Helm) that contains the application manifests
       */
      repoURL: string;
      /**
       * TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.
       */
      targetRevision?: string;
    };
    /**
     * SyncPolicy controls when and how a sync will be performed
     */
    syncPolicy?: {
      /**
       * Automated will keep an application synced to the target revision
       */
      automated?: {
        /**
         * AllowEmpty allows apps have zero live resources (default: false)
         */
        allowEmpty?: boolean;
        /**
         * Prune specifies whether to delete resources from the cluster that are not found in the sources anymore as part of automated sync (default: false)
         */
        prune?: boolean;
        /**
         * SelfHeal specifes whether to revert resources back to their desired state upon modification in the cluster (default: false)
         */
        selfHeal?: boolean;
      };
      /**
       * ManagedNamespaceMetadata controls metadata in the given namespace (if CreateNamespace=true)
       */
      managedNamespaceMetadata?: {
        annotations?: {
          [k: string]: string;
        };
        labels?: {
          [k: string]: string;
        };
      };
      /**
       * Retry controls failed sync retry behavior
       */
      retry?: {
        /**
         * Backoff controls how to backoff on subsequent retries of failed syncs
         */
        backoff?: {
          /**
           * Duration is the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")
           */
          duration?: string;
          /**
           * Factor is a factor to multiply the base duration after each failed retry
           */
          factor?: number;
          /**
           * MaxDuration is the maximum amount of time allowed for the backoff strategy
           */
          maxDuration?: string;
        };
        /**
         * Limit is the maximum number of attempts for retrying a failed sync. If set to 0, no retries will be performed.
         */
        limit?: number;
      };
      /**
       * Options allow you to specify whole app sync-options
       */
      syncOptions?: string[];
    };
  };
  /**
   * ApplicationStatus contains status information for the application
   */
  status?: {
    /**
     * Conditions is a list of currently observed application conditions
     */
    conditions?: {
      /**
       * LastTransitionTime is the time the condition was last observed
       */
      lastTransitionTime?: string;
      /**
       * Message contains human-readable message indicating details about condition
       */
      message: string;
      /**
       * Type is an application condition type
       */
      type: string;
    }[];
    /**
     * Health contains information about the application's current health status
     */
    health?: {
      /**
       * Message is a human-readable informational message describing the health status
       */
      message?: string;
      /**
       * Status holds the status code of the application or resource
       */
      status?: string;
    };
    /**
     * History contains information about the application's sync history
     */
    history?: {
      /**
       * DeployStartedAt holds the time the sync operation started
       */
      deployStartedAt?: string;
      /**
       * DeployedAt holds the time the sync operation completed
       */
      deployedAt: string;
      /**
       * ID is an auto incrementing identifier of the RevisionHistory
       */
      id: number;
      /**
       * Revision holds the revision the sync was performed against
       */
      revision: string;
      /**
       * Source is a reference to the application source used for the sync operation
       */
      source?: {
        /**
         * Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.
         */
        chart?: string;
        /**
         * Directory holds path/directory specific options
         */
        directory?: {
          /**
           * Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation
           */
          exclude?: string;
          /**
           * Include contains a glob pattern to match paths against that should be explicitly included during manifest generation
           */
          include?: string;
          /**
           * Jsonnet holds options specific to Jsonnet
           */
          jsonnet?: {
            /**
             * ExtVars is a list of Jsonnet External Variables
             */
            extVars?: {
              code?: boolean;
              name: string;
              value: string;
            }[];
            /**
             * Additional library search dirs
             */
            libs?: string[];
            /**
             * TLAS is a list of Jsonnet Top-level Arguments
             */
            tlas?: {
              code?: boolean;
              name: string;
              value: string;
            }[];
          };
          /**
           * Recurse specifies whether to scan a directory recursively for manifests
           */
          recurse?: boolean;
        };
        /**
         * Helm holds helm specific options
         */
        helm?: {
          /**
           * FileParameters are file parameters to the helm template
           */
          fileParameters?: {
            /**
             * Name is the name of the Helm parameter
             */
            name?: string;
            /**
             * Path is the path to the file containing the values for the Helm parameter
             */
            path?: string;
          }[];
          /**
           * IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values
           */
          ignoreMissingValueFiles?: boolean;
          /**
           * Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation
           */
          parameters?: {
            /**
             * ForceString determines whether to tell Helm to interpret booleans and numbers as strings
             */
            forceString?: boolean;
            /**
             * Name is the name of the Helm parameter
             */
            name?: string;
            /**
             * Value is the value for the Helm parameter
             */
            value?: string;
          }[];
          /**
           * PassCredentials pass credentials to all domains (Helm's --pass-credentials)
           */
          passCredentials?: boolean;
          /**
           * ReleaseName is the Helm release name to use. If omitted it will use the application name
           */
          releaseName?: string;
          /**
           * SkipCrds skips custom resource definition installation step (Helm's --skip-crds)
           */
          skipCrds?: boolean;
          /**
           * ValuesFiles is a list of Helm value files to use when generating a template
           */
          valueFiles?: string[];
          /**
           * Values specifies Helm values to be passed to helm template, typically defined as a block
           */
          values?: string;
          /**
           * Version is the Helm version to use for templating ("3")
           */
          version?: string;
        };
        /**
         * Kustomize holds kustomize specific options
         */
        kustomize?: {
          /**
           * CommonAnnotations is a list of additional annotations to add to rendered manifests
           */
          commonAnnotations?: {
            [k: string]: string;
          };
          /**
           * CommonLabels is a list of additional labels to add to rendered manifests
           */
          commonLabels?: {
            [k: string]: string;
          };
          /**
           * ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps
           */
          forceCommonAnnotations?: boolean;
          /**
           * ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps
           */
          forceCommonLabels?: boolean;
          /**
           * Images is a list of Kustomize image override specifications
           */
          images?: string[];
          /**
           * NamePrefix is a prefix appended to resources for Kustomize apps
           */
          namePrefix?: string;
          /**
           * NameSuffix is a suffix appended to resources for Kustomize apps
           */
          nameSuffix?: string;
          /**
           * Version controls which version of Kustomize to use for rendering manifests
           */
          version?: string;
        };
        /**
         * Path is a directory path within the Git repository, and is only valid for applications sourced from Git.
         */
        path?: string;
        /**
         * Plugin holds config management plugin specific options
         */
        plugin?: {
          /**
           * Env is a list of environment variable entries
           */
          env?: {
            /**
             * Name is the name of the variable, usually expressed in uppercase
             */
            name: string;
            /**
             * Value is the value of the variable
             */
            value: string;
          }[];
          name?: string;
          parameters?: {
            /**
             * Array is the value of an array type parameter.
             */
            array?: string[];
            /**
             * Map is the value of a map type parameter.
             */
            map?: {
              [k: string]: string;
            };
            /**
             * Name is the name identifying a parameter.
             */
            name?: string;
            /**
             * String_ is the value of a string type parameter.
             */
            string?: string;
          }[];
        };
        /**
         * RepoURL is the URL to the repository (Git or Helm) that contains the application manifests
         */
        repoURL: string;
        /**
         * TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.
         */
        targetRevision?: string;
      };
    }[];
    /**
     * ObservedAt indicates when the application state was updated without querying latest git state Deprecated: controller no longer updates ObservedAt field
     */
    observedAt?: string;
    /**
     * OperationState contains information about any ongoing operations, such as a sync
     */
    operationState?: {
      /**
       * FinishedAt contains time of operation completion
       */
      finishedAt?: string;
      /**
       * Message holds any pertinent messages when attempting to perform operation (typically errors).
       */
      message?: string;
      /**
       * Operation is the original requested operation
       */
      operation: {
        /**
         * Info is a list of informational items for this operation
         */
        info?: {
          name: string;
          value: string;
        }[];
        /**
         * InitiatedBy contains information about who initiated the operations
         */
        initiatedBy?: {
          /**
           * Automated is set to true if operation was initiated automatically by the application controller.
           */
          automated?: boolean;
          /**
           * Username contains the name of a user who started operation
           */
          username?: string;
        };
        /**
         * Retry controls the strategy to apply if a sync fails
         */
        retry?: {
          /**
           * Backoff controls how to backoff on subsequent retries of failed syncs
           */
          backoff?: {
            /**
             * Duration is the amount to back off. Default unit is seconds, but could also be a duration (e.g. "2m", "1h")
             */
            duration?: string;
            /**
             * Factor is a factor to multiply the base duration after each failed retry
             */
            factor?: number;
            /**
             * MaxDuration is the maximum amount of time allowed for the backoff strategy
             */
            maxDuration?: string;
          };
          /**
           * Limit is the maximum number of attempts for retrying a failed sync. If set to 0, no retries will be performed.
           */
          limit?: number;
        };
        /**
         * Sync contains parameters for the operation
         */
        sync?: {
          /**
           * DryRun specifies to perform a `kubectl apply --dry-run` without actually performing the sync
           */
          dryRun?: boolean;
          /**
           * Manifests is an optional field that overrides sync source with a local directory for development
           */
          manifests?: string[];
          /**
           * Prune specifies to delete resources from the cluster that are no longer tracked in git
           */
          prune?: boolean;
          /**
           * Resources describes which resources shall be part of the sync
           */
          resources?: {
            group?: string;
            kind: string;
            name: string;
            namespace?: string;
          }[];
          /**
           * Revision is the revision (Git) or chart version (Helm) which to sync the application to If omitted, will use the revision specified in app spec.
           */
          revision?: string;
          /**
           * Source overrides the source definition set in the application. This is typically set in a Rollback operation and is nil during a Sync operation
           */
          source?: {
            /**
             * Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.
             */
            chart?: string;
            /**
             * Directory holds path/directory specific options
             */
            directory?: {
              /**
               * Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation
               */
              exclude?: string;
              /**
               * Include contains a glob pattern to match paths against that should be explicitly included during manifest generation
               */
              include?: string;
              /**
               * Jsonnet holds options specific to Jsonnet
               */
              jsonnet?: {
                /**
                 * ExtVars is a list of Jsonnet External Variables
                 */
                extVars?: {
                  code?: boolean;
                  name: string;
                  value: string;
                }[];
                /**
                 * Additional library search dirs
                 */
                libs?: string[];
                /**
                 * TLAS is a list of Jsonnet Top-level Arguments
                 */
                tlas?: {
                  code?: boolean;
                  name: string;
                  value: string;
                }[];
              };
              /**
               * Recurse specifies whether to scan a directory recursively for manifests
               */
              recurse?: boolean;
            };
            /**
             * Helm holds helm specific options
             */
            helm?: {
              /**
               * FileParameters are file parameters to the helm template
               */
              fileParameters?: {
                /**
                 * Name is the name of the Helm parameter
                 */
                name?: string;
                /**
                 * Path is the path to the file containing the values for the Helm parameter
                 */
                path?: string;
              }[];
              /**
               * IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values
               */
              ignoreMissingValueFiles?: boolean;
              /**
               * Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation
               */
              parameters?: {
                /**
                 * ForceString determines whether to tell Helm to interpret booleans and numbers as strings
                 */
                forceString?: boolean;
                /**
                 * Name is the name of the Helm parameter
                 */
                name?: string;
                /**
                 * Value is the value for the Helm parameter
                 */
                value?: string;
              }[];
              /**
               * PassCredentials pass credentials to all domains (Helm's --pass-credentials)
               */
              passCredentials?: boolean;
              /**
               * ReleaseName is the Helm release name to use. If omitted it will use the application name
               */
              releaseName?: string;
              /**
               * SkipCrds skips custom resource definition installation step (Helm's --skip-crds)
               */
              skipCrds?: boolean;
              /**
               * ValuesFiles is a list of Helm value files to use when generating a template
               */
              valueFiles?: string[];
              /**
               * Values specifies Helm values to be passed to helm template, typically defined as a block
               */
              values?: string;
              /**
               * Version is the Helm version to use for templating ("3")
               */
              version?: string;
            };
            /**
             * Kustomize holds kustomize specific options
             */
            kustomize?: {
              /**
               * CommonAnnotations is a list of additional annotations to add to rendered manifests
               */
              commonAnnotations?: {
                [k: string]: string;
              };
              /**
               * CommonLabels is a list of additional labels to add to rendered manifests
               */
              commonLabels?: {
                [k: string]: string;
              };
              /**
               * ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps
               */
              forceCommonAnnotations?: boolean;
              /**
               * ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps
               */
              forceCommonLabels?: boolean;
              /**
               * Images is a list of Kustomize image override specifications
               */
              images?: string[];
              /**
               * NamePrefix is a prefix appended to resources for Kustomize apps
               */
              namePrefix?: string;
              /**
               * NameSuffix is a suffix appended to resources for Kustomize apps
               */
              nameSuffix?: string;
              /**
               * Version controls which version of Kustomize to use for rendering manifests
               */
              version?: string;
            };
            /**
             * Path is a directory path within the Git repository, and is only valid for applications sourced from Git.
             */
            path?: string;
            /**
             * Plugin holds config management plugin specific options
             */
            plugin?: {
              /**
               * Env is a list of environment variable entries
               */
              env?: {
                /**
                 * Name is the name of the variable, usually expressed in uppercase
                 */
                name: string;
                /**
                 * Value is the value of the variable
                 */
                value: string;
              }[];
              name?: string;
              parameters?: {
                /**
                 * Array is the value of an array type parameter.
                 */
                array?: string[];
                /**
                 * Map is the value of a map type parameter.
                 */
                map?: {
                  [k: string]: string;
                };
                /**
                 * Name is the name identifying a parameter.
                 */
                name?: string;
                /**
                 * String_ is the value of a string type parameter.
                 */
                string?: string;
              }[];
            };
            /**
             * RepoURL is the URL to the repository (Git or Helm) that contains the application manifests
             */
            repoURL: string;
            /**
             * TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.
             */
            targetRevision?: string;
          };
          /**
           * SyncOptions provide per-sync sync-options, e.g. Validate=false
           */
          syncOptions?: string[];
          /**
           * SyncStrategy describes how to perform the sync
           */
          syncStrategy?: {
            /**
             * Apply will perform a `kubectl apply` to perform the sync.
             */
            apply?: {
              /**
               * Force indicates whether or not to supply the --force flag to `kubectl apply`. The --force flag deletes and re-create the resource, when PATCH encounters conflict and has retried for 5 times.
               */
              force?: boolean;
            };
            /**
             * Hook will submit any referenced resources to perform the sync. This is the default strategy
             */
            hook?: {
              /**
               * Force indicates whether or not to supply the --force flag to `kubectl apply`. The --force flag deletes and re-create the resource, when PATCH encounters conflict and has retried for 5 times.
               */
              force?: boolean;
            };
          };
        };
      };
      /**
       * Phase is the current phase of the operation
       */
      phase: string;
      /**
       * RetryCount contains time of operation retries
       */
      retryCount?: number;
      /**
       * StartedAt contains time of operation start
       */
      startedAt: string;
      /**
       * SyncResult is the result of a Sync operation
       */
      syncResult?: {
        /**
         * Resources contains a list of sync result items for each individual resource in a sync operation
         */
        resources?: {
          /**
           * Group specifies the API group of the resource
           */
          group: string;
          /**
           * HookPhase contains the state of any operation associated with this resource OR hook This can also contain values for non-hook resources.
           */
          hookPhase?: string;
          /**
           * HookType specifies the type of the hook. Empty for non-hook resources
           */
          hookType?: string;
          /**
           * Kind specifies the API kind of the resource
           */
          kind: string;
          /**
           * Message contains an informational or error message for the last sync OR operation
           */
          message?: string;
          /**
           * Name specifies the name of the resource
           */
          name: string;
          /**
           * Namespace specifies the target namespace of the resource
           */
          namespace: string;
          /**
           * Status holds the final result of the sync. Will be empty if the resources is yet to be applied/pruned and is always zero-value for hooks
           */
          status?: string;
          /**
           * SyncPhase indicates the particular phase of the sync that this result was acquired in
           */
          syncPhase?: string;
          /**
           * Version specifies the API version of the resource
           */
          version: string;
        }[];
        /**
         * Revision holds the revision this sync operation was performed to
         */
        revision: string;
        /**
         * Source records the application source information of the sync, used for comparing auto-sync
         */
        source?: {
          /**
           * Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.
           */
          chart?: string;
          /**
           * Directory holds path/directory specific options
           */
          directory?: {
            /**
             * Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation
             */
            exclude?: string;
            /**
             * Include contains a glob pattern to match paths against that should be explicitly included during manifest generation
             */
            include?: string;
            /**
             * Jsonnet holds options specific to Jsonnet
             */
            jsonnet?: {
              /**
               * ExtVars is a list of Jsonnet External Variables
               */
              extVars?: {
                code?: boolean;
                name: string;
                value: string;
              }[];
              /**
               * Additional library search dirs
               */
              libs?: string[];
              /**
               * TLAS is a list of Jsonnet Top-level Arguments
               */
              tlas?: {
                code?: boolean;
                name: string;
                value: string;
              }[];
            };
            /**
             * Recurse specifies whether to scan a directory recursively for manifests
             */
            recurse?: boolean;
          };
          /**
           * Helm holds helm specific options
           */
          helm?: {
            /**
             * FileParameters are file parameters to the helm template
             */
            fileParameters?: {
              /**
               * Name is the name of the Helm parameter
               */
              name?: string;
              /**
               * Path is the path to the file containing the values for the Helm parameter
               */
              path?: string;
            }[];
            /**
             * IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values
             */
            ignoreMissingValueFiles?: boolean;
            /**
             * Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation
             */
            parameters?: {
              /**
               * ForceString determines whether to tell Helm to interpret booleans and numbers as strings
               */
              forceString?: boolean;
              /**
               * Name is the name of the Helm parameter
               */
              name?: string;
              /**
               * Value is the value for the Helm parameter
               */
              value?: string;
            }[];
            /**
             * PassCredentials pass credentials to all domains (Helm's --pass-credentials)
             */
            passCredentials?: boolean;
            /**
             * ReleaseName is the Helm release name to use. If omitted it will use the application name
             */
            releaseName?: string;
            /**
             * SkipCrds skips custom resource definition installation step (Helm's --skip-crds)
             */
            skipCrds?: boolean;
            /**
             * ValuesFiles is a list of Helm value files to use when generating a template
             */
            valueFiles?: string[];
            /**
             * Values specifies Helm values to be passed to helm template, typically defined as a block
             */
            values?: string;
            /**
             * Version is the Helm version to use for templating ("3")
             */
            version?: string;
          };
          /**
           * Kustomize holds kustomize specific options
           */
          kustomize?: {
            /**
             * CommonAnnotations is a list of additional annotations to add to rendered manifests
             */
            commonAnnotations?: {
              [k: string]: string;
            };
            /**
             * CommonLabels is a list of additional labels to add to rendered manifests
             */
            commonLabels?: {
              [k: string]: string;
            };
            /**
             * ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps
             */
            forceCommonAnnotations?: boolean;
            /**
             * ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps
             */
            forceCommonLabels?: boolean;
            /**
             * Images is a list of Kustomize image override specifications
             */
            images?: string[];
            /**
             * NamePrefix is a prefix appended to resources for Kustomize apps
             */
            namePrefix?: string;
            /**
             * NameSuffix is a suffix appended to resources for Kustomize apps
             */
            nameSuffix?: string;
            /**
             * Version controls which version of Kustomize to use for rendering manifests
             */
            version?: string;
          };
          /**
           * Path is a directory path within the Git repository, and is only valid for applications sourced from Git.
           */
          path?: string;
          /**
           * Plugin holds config management plugin specific options
           */
          plugin?: {
            /**
             * Env is a list of environment variable entries
             */
            env?: {
              /**
               * Name is the name of the variable, usually expressed in uppercase
               */
              name: string;
              /**
               * Value is the value of the variable
               */
              value: string;
            }[];
            name?: string;
            parameters?: {
              /**
               * Array is the value of an array type parameter.
               */
              array?: string[];
              /**
               * Map is the value of a map type parameter.
               */
              map?: {
                [k: string]: string;
              };
              /**
               * Name is the name identifying a parameter.
               */
              name?: string;
              /**
               * String_ is the value of a string type parameter.
               */
              string?: string;
            }[];
          };
          /**
           * RepoURL is the URL to the repository (Git or Helm) that contains the application manifests
           */
          repoURL: string;
          /**
           * TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.
           */
          targetRevision?: string;
        };
      };
    };
    /**
     * ReconciledAt indicates when the application state was reconciled using the latest git version
     */
    reconciledAt?: string;
    /**
     * ResourceHealthSource indicates where the resource health status is stored: inline if not set or appTree
     */
    resourceHealthSource?: string;
    /**
     * Resources is a list of Kubernetes resources managed by this application
     */
    resources?: {
      group?: string;
      /**
       * HealthStatus contains information about the currently observed health state of an application or resource
       */
      health?: {
        /**
         * Message is a human-readable informational message describing the health status
         */
        message?: string;
        /**
         * Status holds the status code of the application or resource
         */
        status?: string;
      };
      hook?: boolean;
      kind?: string;
      name?: string;
      namespace?: string;
      requiresPruning?: boolean;
      /**
       * SyncStatusCode is a type which represents possible comparison results
       */
      status?: string;
      syncWave?: number;
      version?: string;
    }[];
    /**
     * SourceType specifies the type of this application
     */
    sourceType?: string;
    /**
     * Summary contains a list of URLs and container images used by this application
     */
    summary?: {
      /**
       * ExternalURLs holds all external URLs of application child resources.
       */
      externalURLs?: string[];
      /**
       * Images holds all images of application child resources.
       */
      images?: string[];
    };
    /**
     * Sync contains information about the application's current sync status
     */
    sync?: {
      /**
       * ComparedTo contains information about what has been compared
       */
      comparedTo?: {
        /**
         * Destination is a reference to the application's destination used for comparison
         */
        destination: {
          /**
           * Name is an alternate way of specifying the target cluster by its symbolic name
           */
          name?: string;
          /**
           * Namespace specifies the target namespace for the application's resources. The namespace will only be set for namespace-scoped resources that have not set a value for .metadata.namespace
           */
          namespace?: string;
          /**
           * Server specifies the URL of the target cluster and must be set to the Kubernetes control plane API
           */
          server?: string;
        };
        /**
         * Source is a reference to the application's source used for comparison
         */
        source: {
          /**
           * Chart is a Helm chart name, and must be specified for applications sourced from a Helm repo.
           */
          chart?: string;
          /**
           * Directory holds path/directory specific options
           */
          directory?: {
            /**
             * Exclude contains a glob pattern to match paths against that should be explicitly excluded from being used during manifest generation
             */
            exclude?: string;
            /**
             * Include contains a glob pattern to match paths against that should be explicitly included during manifest generation
             */
            include?: string;
            /**
             * Jsonnet holds options specific to Jsonnet
             */
            jsonnet?: {
              /**
               * ExtVars is a list of Jsonnet External Variables
               */
              extVars?: {
                code?: boolean;
                name: string;
                value: string;
              }[];
              /**
               * Additional library search dirs
               */
              libs?: string[];
              /**
               * TLAS is a list of Jsonnet Top-level Arguments
               */
              tlas?: {
                code?: boolean;
                name: string;
                value: string;
              }[];
            };
            /**
             * Recurse specifies whether to scan a directory recursively for manifests
             */
            recurse?: boolean;
          };
          /**
           * Helm holds helm specific options
           */
          helm?: {
            /**
             * FileParameters are file parameters to the helm template
             */
            fileParameters?: {
              /**
               * Name is the name of the Helm parameter
               */
              name?: string;
              /**
               * Path is the path to the file containing the values for the Helm parameter
               */
              path?: string;
            }[];
            /**
             * IgnoreMissingValueFiles prevents helm template from failing when valueFiles do not exist locally by not appending them to helm template --values
             */
            ignoreMissingValueFiles?: boolean;
            /**
             * Parameters is a list of Helm parameters which are passed to the helm template command upon manifest generation
             */
            parameters?: {
              /**
               * ForceString determines whether to tell Helm to interpret booleans and numbers as strings
               */
              forceString?: boolean;
              /**
               * Name is the name of the Helm parameter
               */
              name?: string;
              /**
               * Value is the value for the Helm parameter
               */
              value?: string;
            }[];
            /**
             * PassCredentials pass credentials to all domains (Helm's --pass-credentials)
             */
            passCredentials?: boolean;
            /**
             * ReleaseName is the Helm release name to use. If omitted it will use the application name
             */
            releaseName?: string;
            /**
             * SkipCrds skips custom resource definition installation step (Helm's --skip-crds)
             */
            skipCrds?: boolean;
            /**
             * ValuesFiles is a list of Helm value files to use when generating a template
             */
            valueFiles?: string[];
            /**
             * Values specifies Helm values to be passed to helm template, typically defined as a block
             */
            values?: string;
            /**
             * Version is the Helm version to use for templating ("3")
             */
            version?: string;
          };
          /**
           * Kustomize holds kustomize specific options
           */
          kustomize?: {
            /**
             * CommonAnnotations is a list of additional annotations to add to rendered manifests
             */
            commonAnnotations?: {
              [k: string]: string;
            };
            /**
             * CommonLabels is a list of additional labels to add to rendered manifests
             */
            commonLabels?: {
              [k: string]: string;
            };
            /**
             * ForceCommonAnnotations specifies whether to force applying common annotations to resources for Kustomize apps
             */
            forceCommonAnnotations?: boolean;
            /**
             * ForceCommonLabels specifies whether to force applying common labels to resources for Kustomize apps
             */
            forceCommonLabels?: boolean;
            /**
             * Images is a list of Kustomize image override specifications
             */
            images?: string[];
            /**
             * NamePrefix is a prefix appended to resources for Kustomize apps
             */
            namePrefix?: string;
            /**
             * NameSuffix is a suffix appended to resources for Kustomize apps
             */
            nameSuffix?: string;
            /**
             * Version controls which version of Kustomize to use for rendering manifests
             */
            version?: string;
          };
          /**
           * Path is a directory path within the Git repository, and is only valid for applications sourced from Git.
           */
          path?: string;
          /**
           * Plugin holds config management plugin specific options
           */
          plugin?: {
            /**
             * Env is a list of environment variable entries
             */
            env?: {
              /**
               * Name is the name of the variable, usually expressed in uppercase
               */
              name: string;
              /**
               * Value is the value of the variable
               */
              value: string;
            }[];
            name?: string;
            parameters?: {
              /**
               * Array is the value of an array type parameter.
               */
              array?: string[];
              /**
               * Map is the value of a map type parameter.
               */
              map?: {
                [k: string]: string;
              };
              /**
               * Name is the name identifying a parameter.
               */
              name?: string;
              /**
               * String_ is the value of a string type parameter.
               */
              string?: string;
            }[];
          };
          /**
           * RepoURL is the URL to the repository (Git or Helm) that contains the application manifests
           */
          repoURL: string;
          /**
           * TargetRevision defines the revision of the source to sync the application to. In case of Git, this can be commit, tag, or branch. If omitted, will equal to HEAD. In case of Helm, this is a semver tag for the Chart's version.
           */
          targetRevision?: string;
        };
      };
      /**
       * Revision contains information about the revision the comparison has been performed to
       */
      revision?: string;
      /**
       * Status is the sync state of the comparison
       */
      status: string;
    };
  };
}

export interface ConfigMap {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: "v1";
  /**
   * BinaryData contains the binary data. Each key must consist of alphanumeric characters, '-', '_' or '.'. BinaryData can contain byte sequences that are not in the UTF-8 range. The keys stored in BinaryData must not overlap with the ones in the Data field, this is enforced during validation process. Using this field will require 1.10+ apiserver and kubelet.
   */
  binaryData?: {
    [name: string]: string;
  };
  /**
   * Data contains the configuration data. Each key must consist of alphanumeric characters, '-', '_' or '.'. Values with non-UTF-8 byte sequences must use the BinaryData field. The keys stored in Data must not overlap with the keys in the BinaryData field, this is enforced during validation process.
   */
  data?: {
    [name: string]: string;
  };
  /**
   * Immutable, if set to true, ensures that data stored in the ConfigMap cannot be updated (only object metadata can be modified). If not set to true, the field can be modified at any time. Defaulted to nil.
   */
  immutable?: boolean;
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: "ConfigMap";
  /**
   * Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata
   */
  metadata?: any;
}
