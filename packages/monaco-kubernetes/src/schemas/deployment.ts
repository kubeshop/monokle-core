export const CORE_DEPLOYMENT_SCHEMA = {
  description:
    "Deployment enables declarative updates for Pods and ReplicaSets.",
  properties: {
    apiVersion: {
      description:
        "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
      type: ["string", "null"],
    },
    kind: {
      description:
        "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
      type: ["string", "null"],
      enum: ["Deployment"],
    },
    metadata: {
      description:
        "ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
      properties: {
        annotations: {
          additionalProperties: {
            type: ["string", "null"],
          },
          description:
            "Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations",
          type: ["object", "null"],
        },
        clusterName: {
          description:
            "Deprecated: ClusterName is a legacy field that was always cleared by the system and never used; it will be removed completely in 1.25.\n\nThe name in the go struct is changed to help clients detect accidental use.",
          type: ["string", "null"],
        },
        creationTimestamp: {
          description:
            "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
          format: "date-time",
          type: ["string", "null"],
        },
        deletionGracePeriodSeconds: {
          description:
            "Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.",
          format: "int64",
          type: ["integer", "null"],
        },
        deletionTimestamp: {
          description:
            "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
          format: "date-time",
          type: ["string", "null"],
        },
        finalizers: {
          description:
            "Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.",
          items: {
            type: ["string", "null"],
          },
          type: ["array", "null"],
          "x-kubernetes-patch-strategy": "merge",
        },
        generateName: {
          description:
            "GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.\n\nIf this field is specified and the generated name exists, the server will return a 409.\n\nApplied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency",
          type: ["string", "null"],
        },
        generation: {
          description:
            "A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.",
          format: "int64",
          type: ["integer", "null"],
        },
        labels: {
          additionalProperties: {
            type: ["string", "null"],
          },
          description:
            "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels",
          type: ["object", "null"],
        },
        managedFields: {
          description:
            "ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like \"ci-cd\". The set of fields is always in the version that the workflow used when modifying the object.",
          items: {
            description:
              "ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.",
            properties: {
              apiVersion: {
                description:
                  'APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.',
                type: ["string", "null"],
              },
              fieldsType: {
                description:
                  'FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"',
                type: ["string", "null"],
              },
              fieldsV1: {
                description:
                  "FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.\n\nEach key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:<name>', where <name> is the name of a field in a struct, or key in a map 'v:<value>', where <value> is the exact json formatted value of a list item 'i:<index>', where <index> is position of a item in a list 'k:<keys>', where <keys> is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.\n\nThe exact format is defined in sigs.k8s.io/structured-merge-diff",
                type: ["object", "null"],
              },
              manager: {
                description:
                  "Manager is an identifier of the workflow managing these fields.",
                type: ["string", "null"],
              },
              operation: {
                description:
                  "Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.",
                type: ["string", "null"],
              },
              subresource: {
                description:
                  "Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.",
                type: ["string", "null"],
              },
              time: {
                description:
                  "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                format: "date-time",
                type: ["string", "null"],
              },
            },
            type: ["object", "null"],
          },
          type: ["array", "null"],
        },
        name: {
          description:
            "Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names",
          type: ["string", "null"],
        },
        namespace: {
          description:
            'Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.\n\nMust be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces',
          type: ["string", "null"],
        },
        ownerReferences: {
          description:
            "List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.",
          items: {
            description:
              "OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.",
            properties: {
              apiVersion: {
                description: "API version of the referent.",
                type: "string",
              },
              blockOwnerDeletion: {
                description:
                  'If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.',
                type: ["boolean", "null"],
              },
              controller: {
                description:
                  "If true, this reference points to the managing controller.",
                type: ["boolean", "null"],
              },
              kind: {
                description:
                  "Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                type: "string",
              },
              name: {
                description:
                  "Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names",
                type: "string",
              },
              uid: {
                description:
                  "UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
                type: "string",
              },
            },
            required: ["apiVersion", "kind", "name", "uid"],
            type: ["object", "null"],
            "x-kubernetes-map-type": "atomic",
          },
          type: ["array", "null"],
          "x-kubernetes-patch-merge-key": "uid",
          "x-kubernetes-patch-strategy": "merge",
        },
        resourceVersion: {
          description:
            "An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.\n\nPopulated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency",
          type: ["string", "null"],
        },
        selfLink: {
          description:
            "Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.",
          type: ["string", "null"],
        },
        uid: {
          description:
            "UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.\n\nPopulated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
          type: ["string", "null"],
        },
      },
      type: ["object", "null"],
    },
    spec: {
      description:
        "DeploymentSpec is the specification of the desired behavior of the Deployment.",
      properties: {
        minReadySeconds: {
          description:
            "Minimum number of seconds for which a newly created pod should be ready without any of its container crashing, for it to be considered available. Defaults to 0 (pod will be considered available as soon as it is ready)",
          format: "int32",
          type: ["integer", "null"],
        },
        paused: {
          description: "Indicates that the deployment is paused.",
          type: ["boolean", "null"],
        },
        progressDeadlineSeconds: {
          description:
            "The maximum time in seconds for a deployment to make progress before it is considered to be failed. The deployment controller will continue to process failed deployments and a condition with a ProgressDeadlineExceeded reason will be surfaced in the deployment status. Note that progress will not be estimated during the time a deployment is paused. Defaults to 600s.",
          format: "int32",
          type: ["integer", "null"],
        },
        replicas: {
          description:
            "Number of desired pods. This is a pointer to distinguish between explicit zero and not specified. Defaults to 1.",
          format: "int32",
          type: ["integer", "null"],
        },
        revisionHistoryLimit: {
          description:
            "The number of old ReplicaSets to retain to allow rollback. This is a pointer to distinguish between explicit zero and not specified. Defaults to 10.",
          format: "int32",
          type: ["integer", "null"],
        },
        selector: {
          description:
            "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
          properties: {
            matchExpressions: {
              description:
                "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
              items: {
                description:
                  "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                properties: {
                  key: {
                    description:
                      "key is the label key that the selector applies to.",
                    type: "string",
                    "x-kubernetes-patch-merge-key": "key",
                    "x-kubernetes-patch-strategy": "merge",
                  },
                  operator: {
                    description:
                      "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                    type: "string",
                  },
                  values: {
                    description:
                      "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                    items: {
                      type: ["string", "null"],
                    },
                    type: ["array", "null"],
                  },
                },
                required: ["key", "operator"],
                type: ["object", "null"],
              },
              type: ["array", "null"],
            },
            matchLabels: {
              additionalProperties: {
                type: ["string", "null"],
              },
              description:
                'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
              type: ["object", "null"],
            },
          },
          type: "object",
          "x-kubernetes-map-type": "atomic",
        },
        strategy: {
          description:
            "DeploymentStrategy describes how to replace existing pods with new ones.",
          properties: {
            rollingUpdate: {
              description:
                "Spec to control the desired behavior of rolling update.",
              properties: {
                maxSurge: {
                  oneOf: [
                    {
                      type: ["string", "null"],
                    },
                    {
                      type: ["integer", "null"],
                    },
                  ],
                },
                maxUnavailable: {
                  oneOf: [
                    {
                      type: ["string", "null"],
                    },
                    {
                      type: ["integer", "null"],
                    },
                  ],
                },
              },
              type: ["object", "null"],
            },
            type: {
              description:
                'Type of deployment. Can be "Recreate" or "RollingUpdate". Default is RollingUpdate.\n\n',
              type: ["string", "null"],
            },
          },
          type: ["object", "null"],
        },
        template: {
          description:
            "PodTemplateSpec describes the data a pod should have when created from a template",
          properties: {
            metadata: {
              description:
                "ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
              properties: {
                annotations: {
                  additionalProperties: {
                    type: ["string", "null"],
                  },
                  description:
                    "Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations",
                  type: ["object", "null"],
                },
                clusterName: {
                  description:
                    "Deprecated: ClusterName is a legacy field that was always cleared by the system and never used; it will be removed completely in 1.25.\n\nThe name in the go struct is changed to help clients detect accidental use.",
                  type: ["string", "null"],
                },
                creationTimestamp: {
                  description:
                    "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                  format: "date-time",
                  type: ["string", "null"],
                },
                deletionGracePeriodSeconds: {
                  description:
                    "Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.",
                  format: "int64",
                  type: ["integer", "null"],
                },
                deletionTimestamp: {
                  description:
                    "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                  format: "date-time",
                  type: ["string", "null"],
                },
                finalizers: {
                  description:
                    "Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.",
                  items: {
                    type: ["string", "null"],
                  },
                  type: ["array", "null"],
                  "x-kubernetes-patch-strategy": "merge",
                },
                generateName: {
                  description:
                    "GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.\n\nIf this field is specified and the generated name exists, the server will return a 409.\n\nApplied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency",
                  type: ["string", "null"],
                },
                generation: {
                  description:
                    "A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.",
                  format: "int64",
                  type: ["integer", "null"],
                },
                labels: {
                  additionalProperties: {
                    type: ["string", "null"],
                  },
                  description:
                    "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels",
                  type: ["object", "null"],
                },
                managedFields: {
                  description:
                    "ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like \"ci-cd\". The set of fields is always in the version that the workflow used when modifying the object.",
                  items: {
                    description:
                      "ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.",
                    properties: {
                      apiVersion: {
                        description:
                          'APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.',
                        type: ["string", "null"],
                      },
                      fieldsType: {
                        description:
                          'FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"',
                        type: ["string", "null"],
                      },
                      fieldsV1: {
                        description:
                          "FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.\n\nEach key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:<name>', where <name> is the name of a field in a struct, or key in a map 'v:<value>', where <value> is the exact json formatted value of a list item 'i:<index>', where <index> is position of a item in a list 'k:<keys>', where <keys> is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.\n\nThe exact format is defined in sigs.k8s.io/structured-merge-diff",
                        type: ["object", "null"],
                      },
                      manager: {
                        description:
                          "Manager is an identifier of the workflow managing these fields.",
                        type: ["string", "null"],
                      },
                      operation: {
                        description:
                          "Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.",
                        type: ["string", "null"],
                      },
                      subresource: {
                        description:
                          "Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.",
                        type: ["string", "null"],
                      },
                      time: {
                        description:
                          "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                        format: "date-time",
                        type: ["string", "null"],
                      },
                    },
                    type: ["object", "null"],
                  },
                  type: ["array", "null"],
                },
                name: {
                  description:
                    "Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names",
                  type: ["string", "null"],
                },
                namespace: {
                  description:
                    'Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.\n\nMust be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces',
                  type: ["string", "null"],
                },
                ownerReferences: {
                  description:
                    "List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.",
                  items: {
                    description:
                      "OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.",
                    properties: {
                      apiVersion: {
                        description: "API version of the referent.",
                        type: "string",
                      },
                      blockOwnerDeletion: {
                        description:
                          'If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.',
                        type: ["boolean", "null"],
                      },
                      controller: {
                        description:
                          "If true, this reference points to the managing controller.",
                        type: ["boolean", "null"],
                      },
                      kind: {
                        description:
                          "Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                        type: "string",
                      },
                      name: {
                        description:
                          "Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names",
                        type: "string",
                      },
                      uid: {
                        description:
                          "UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
                        type: "string",
                      },
                    },
                    required: ["apiVersion", "kind", "name", "uid"],
                    type: ["object", "null"],
                    "x-kubernetes-map-type": "atomic",
                  },
                  type: ["array", "null"],
                  "x-kubernetes-patch-merge-key": "uid",
                  "x-kubernetes-patch-strategy": "merge",
                },
                resourceVersion: {
                  description:
                    "An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.\n\nPopulated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency",
                  type: ["string", "null"],
                },
                selfLink: {
                  description:
                    "Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.",
                  type: ["string", "null"],
                },
                uid: {
                  description:
                    "UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.\n\nPopulated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
                  type: ["string", "null"],
                },
              },
              type: ["object", "null"],
            },
            spec: {
              description: "PodSpec is a description of a pod.",
              properties: {
                activeDeadlineSeconds: {
                  description:
                    "Optional duration in seconds the pod may be active on the node relative to StartTime before the system will actively try to mark it failed and kill associated containers. Value must be a positive integer.",
                  format: "int64",
                  type: ["integer", "null"],
                },
                affinity: {
                  description:
                    "Affinity is a group of affinity scheduling rules.",
                  properties: {
                    nodeAffinity: {
                      description:
                        "Node affinity is a group of node affinity scheduling rules.",
                      properties: {
                        preferredDuringSchedulingIgnoredDuringExecution: {
                          description:
                            'The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node matches the corresponding matchExpressions; the node(s) with the highest sum are the most preferred.',
                          items: {
                            description:
                              "An empty preferred scheduling term matches all objects with implicit weight 0 (i.e. it's a no-op). A null preferred scheduling term matches no objects (i.e. is also a no-op).",
                            properties: {
                              preference: {
                                description:
                                  "A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.",
                                properties: {
                                  matchExpressions: {
                                    description:
                                      "A list of node selector requirements by node's labels.",
                                    items: {
                                      description:
                                        "A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                      properties: {
                                        key: {
                                          description:
                                            "The label key that the selector applies to.",
                                          type: "string",
                                        },
                                        operator: {
                                          description:
                                            "Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.\n\n",
                                          type: "string",
                                        },
                                        values: {
                                          description:
                                            "An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.",
                                          items: {
                                            type: ["string", "null"],
                                          },
                                          type: ["array", "null"],
                                        },
                                      },
                                      required: ["key", "operator"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  matchFields: {
                                    description:
                                      "A list of node selector requirements by node's fields.",
                                    items: {
                                      description:
                                        "A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                      properties: {
                                        key: {
                                          description:
                                            "The label key that the selector applies to.",
                                          type: "string",
                                        },
                                        operator: {
                                          description:
                                            "Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.\n\n",
                                          type: "string",
                                        },
                                        values: {
                                          description:
                                            "An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.",
                                          items: {
                                            type: ["string", "null"],
                                          },
                                          type: ["array", "null"],
                                        },
                                      },
                                      required: ["key", "operator"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                },
                                type: "object",
                                "x-kubernetes-map-type": "atomic",
                              },
                              weight: {
                                description:
                                  "Weight associated with matching the corresponding nodeSelectorTerm, in the range 1-100.",
                                format: "int32",
                                type: "integer",
                              },
                            },
                            required: ["weight", "preference"],
                            type: ["object", "null"],
                          },
                          type: ["array", "null"],
                        },
                        requiredDuringSchedulingIgnoredDuringExecution: {
                          description:
                            "A node selector represents the union of the results of one or more label queries over a set of nodes; that is, it represents the OR of the selectors represented by the node selector terms.",
                          properties: {
                            nodeSelectorTerms: {
                              description:
                                "Required. A list of node selector terms. The terms are ORed.",
                              items: {
                                description:
                                  "A null or empty node selector term matches no objects. The requirements of them are ANDed. The TopologySelectorTerm type implements a subset of the NodeSelectorTerm.",
                                properties: {
                                  matchExpressions: {
                                    description:
                                      "A list of node selector requirements by node's labels.",
                                    items: {
                                      description:
                                        "A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                      properties: {
                                        key: {
                                          description:
                                            "The label key that the selector applies to.",
                                          type: "string",
                                        },
                                        operator: {
                                          description:
                                            "Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.\n\n",
                                          type: "string",
                                        },
                                        values: {
                                          description:
                                            "An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.",
                                          items: {
                                            type: ["string", "null"],
                                          },
                                          type: ["array", "null"],
                                        },
                                      },
                                      required: ["key", "operator"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  matchFields: {
                                    description:
                                      "A list of node selector requirements by node's fields.",
                                    items: {
                                      description:
                                        "A node selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                      properties: {
                                        key: {
                                          description:
                                            "The label key that the selector applies to.",
                                          type: "string",
                                        },
                                        operator: {
                                          description:
                                            "Represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists, DoesNotExist. Gt, and Lt.\n\n",
                                          type: "string",
                                        },
                                        values: {
                                          description:
                                            "An array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. If the operator is Gt or Lt, the values array must have a single element, which will be interpreted as an integer. This array is replaced during a strategic merge patch.",
                                          items: {
                                            type: ["string", "null"],
                                          },
                                          type: ["array", "null"],
                                        },
                                      },
                                      required: ["key", "operator"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                },
                                type: ["object", "null"],
                                "x-kubernetes-map-type": "atomic",
                              },
                              type: "array",
                            },
                          },
                          required: ["nodeSelectorTerms"],
                          type: ["object", "null"],
                          "x-kubernetes-map-type": "atomic",
                        },
                      },
                      type: ["object", "null"],
                    },
                    podAffinity: {
                      description:
                        "Pod affinity is a group of inter pod affinity scheduling rules.",
                      properties: {
                        preferredDuringSchedulingIgnoredDuringExecution: {
                          description:
                            'The scheduler will prefer to schedule pods to nodes that satisfy the affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.',
                          items: {
                            description:
                              "The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)",
                            properties: {
                              podAffinityTerm: {
                                description:
                                  "Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running",
                                properties: {
                                  labelSelector: {
                                    description:
                                      "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                    properties: {
                                      matchExpressions: {
                                        description:
                                          "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                        items: {
                                          description:
                                            "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                          properties: {
                                            key: {
                                              description:
                                                "key is the label key that the selector applies to.",
                                              type: "string",
                                              "x-kubernetes-patch-merge-key":
                                                "key",
                                              "x-kubernetes-patch-strategy":
                                                "merge",
                                            },
                                            operator: {
                                              description:
                                                "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                              type: "string",
                                            },
                                            values: {
                                              description:
                                                "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                              items: {
                                                type: ["string", "null"],
                                              },
                                              type: ["array", "null"],
                                            },
                                          },
                                          required: ["key", "operator"],
                                          type: ["object", "null"],
                                        },
                                        type: ["array", "null"],
                                      },
                                      matchLabels: {
                                        additionalProperties: {
                                          type: ["string", "null"],
                                        },
                                        description:
                                          'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                        type: ["object", "null"],
                                      },
                                    },
                                    type: ["object", "null"],
                                    "x-kubernetes-map-type": "atomic",
                                  },
                                  namespaceSelector: {
                                    description:
                                      "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                    properties: {
                                      matchExpressions: {
                                        description:
                                          "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                        items: {
                                          description:
                                            "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                          properties: {
                                            key: {
                                              description:
                                                "key is the label key that the selector applies to.",
                                              type: "string",
                                              "x-kubernetes-patch-merge-key":
                                                "key",
                                              "x-kubernetes-patch-strategy":
                                                "merge",
                                            },
                                            operator: {
                                              description:
                                                "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                              type: "string",
                                            },
                                            values: {
                                              description:
                                                "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                              items: {
                                                type: ["string", "null"],
                                              },
                                              type: ["array", "null"],
                                            },
                                          },
                                          required: ["key", "operator"],
                                          type: ["object", "null"],
                                        },
                                        type: ["array", "null"],
                                      },
                                      matchLabels: {
                                        additionalProperties: {
                                          type: ["string", "null"],
                                        },
                                        description:
                                          'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                        type: ["object", "null"],
                                      },
                                    },
                                    type: ["object", "null"],
                                    "x-kubernetes-map-type": "atomic",
                                  },
                                  namespaces: {
                                    description:
                                      'namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod\'s namespace".',
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  topologyKey: {
                                    description:
                                      "This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.",
                                    type: "string",
                                  },
                                },
                                required: ["topologyKey"],
                                type: "object",
                              },
                              weight: {
                                description:
                                  "weight associated with matching the corresponding podAffinityTerm, in the range 1-100.",
                                format: "int32",
                                type: "integer",
                              },
                            },
                            required: ["weight", "podAffinityTerm"],
                            type: ["object", "null"],
                          },
                          type: ["array", "null"],
                        },
                        requiredDuringSchedulingIgnoredDuringExecution: {
                          description:
                            "If the affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.",
                          items: {
                            description:
                              "Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running",
                            properties: {
                              labelSelector: {
                                description:
                                  "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                properties: {
                                  matchExpressions: {
                                    description:
                                      "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                    items: {
                                      description:
                                        "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                      properties: {
                                        key: {
                                          description:
                                            "key is the label key that the selector applies to.",
                                          type: "string",
                                          "x-kubernetes-patch-merge-key": "key",
                                          "x-kubernetes-patch-strategy":
                                            "merge",
                                        },
                                        operator: {
                                          description:
                                            "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                          type: "string",
                                        },
                                        values: {
                                          description:
                                            "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                          items: {
                                            type: ["string", "null"],
                                          },
                                          type: ["array", "null"],
                                        },
                                      },
                                      required: ["key", "operator"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  matchLabels: {
                                    additionalProperties: {
                                      type: ["string", "null"],
                                    },
                                    description:
                                      'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                    type: ["object", "null"],
                                  },
                                },
                                type: ["object", "null"],
                                "x-kubernetes-map-type": "atomic",
                              },
                              namespaceSelector: {
                                description:
                                  "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                properties: {
                                  matchExpressions: {
                                    description:
                                      "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                    items: {
                                      description:
                                        "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                      properties: {
                                        key: {
                                          description:
                                            "key is the label key that the selector applies to.",
                                          type: "string",
                                          "x-kubernetes-patch-merge-key": "key",
                                          "x-kubernetes-patch-strategy":
                                            "merge",
                                        },
                                        operator: {
                                          description:
                                            "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                          type: "string",
                                        },
                                        values: {
                                          description:
                                            "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                          items: {
                                            type: ["string", "null"],
                                          },
                                          type: ["array", "null"],
                                        },
                                      },
                                      required: ["key", "operator"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  matchLabels: {
                                    additionalProperties: {
                                      type: ["string", "null"],
                                    },
                                    description:
                                      'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                    type: ["object", "null"],
                                  },
                                },
                                type: ["object", "null"],
                                "x-kubernetes-map-type": "atomic",
                              },
                              namespaces: {
                                description:
                                  'namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod\'s namespace".',
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                              topologyKey: {
                                description:
                                  "This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.",
                                type: "string",
                              },
                            },
                            required: ["topologyKey"],
                            type: ["object", "null"],
                          },
                          type: ["array", "null"],
                        },
                      },
                      type: ["object", "null"],
                    },
                    podAntiAffinity: {
                      description:
                        "Pod anti affinity is a group of inter pod anti affinity scheduling rules.",
                      properties: {
                        preferredDuringSchedulingIgnoredDuringExecution: {
                          description:
                            'The scheduler will prefer to schedule pods to nodes that satisfy the anti-affinity expressions specified by this field, but it may choose a node that violates one or more of the expressions. The node that is most preferred is the one with the greatest sum of weights, i.e. for each node that meets all of the scheduling requirements (resource request, requiredDuringScheduling anti-affinity expressions, etc.), compute a sum by iterating through the elements of this field and adding "weight" to the sum if the node has pods which matches the corresponding podAffinityTerm; the node(s) with the highest sum are the most preferred.',
                          items: {
                            description:
                              "The weights of all of the matched WeightedPodAffinityTerm fields are added per-node to find the most preferred node(s)",
                            properties: {
                              podAffinityTerm: {
                                description:
                                  "Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running",
                                properties: {
                                  labelSelector: {
                                    description:
                                      "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                    properties: {
                                      matchExpressions: {
                                        description:
                                          "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                        items: {
                                          description:
                                            "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                          properties: {
                                            key: {
                                              description:
                                                "key is the label key that the selector applies to.",
                                              type: "string",
                                              "x-kubernetes-patch-merge-key":
                                                "key",
                                              "x-kubernetes-patch-strategy":
                                                "merge",
                                            },
                                            operator: {
                                              description:
                                                "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                              type: "string",
                                            },
                                            values: {
                                              description:
                                                "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                              items: {
                                                type: ["string", "null"],
                                              },
                                              type: ["array", "null"],
                                            },
                                          },
                                          required: ["key", "operator"],
                                          type: ["object", "null"],
                                        },
                                        type: ["array", "null"],
                                      },
                                      matchLabels: {
                                        additionalProperties: {
                                          type: ["string", "null"],
                                        },
                                        description:
                                          'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                        type: ["object", "null"],
                                      },
                                    },
                                    type: ["object", "null"],
                                    "x-kubernetes-map-type": "atomic",
                                  },
                                  namespaceSelector: {
                                    description:
                                      "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                    properties: {
                                      matchExpressions: {
                                        description:
                                          "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                        items: {
                                          description:
                                            "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                          properties: {
                                            key: {
                                              description:
                                                "key is the label key that the selector applies to.",
                                              type: "string",
                                              "x-kubernetes-patch-merge-key":
                                                "key",
                                              "x-kubernetes-patch-strategy":
                                                "merge",
                                            },
                                            operator: {
                                              description:
                                                "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                              type: "string",
                                            },
                                            values: {
                                              description:
                                                "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                              items: {
                                                type: ["string", "null"],
                                              },
                                              type: ["array", "null"],
                                            },
                                          },
                                          required: ["key", "operator"],
                                          type: ["object", "null"],
                                        },
                                        type: ["array", "null"],
                                      },
                                      matchLabels: {
                                        additionalProperties: {
                                          type: ["string", "null"],
                                        },
                                        description:
                                          'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                        type: ["object", "null"],
                                      },
                                    },
                                    type: ["object", "null"],
                                    "x-kubernetes-map-type": "atomic",
                                  },
                                  namespaces: {
                                    description:
                                      'namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod\'s namespace".',
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  topologyKey: {
                                    description:
                                      "This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.",
                                    type: "string",
                                  },
                                },
                                required: ["topologyKey"],
                                type: "object",
                              },
                              weight: {
                                description:
                                  "weight associated with matching the corresponding podAffinityTerm, in the range 1-100.",
                                format: "int32",
                                type: "integer",
                              },
                            },
                            required: ["weight", "podAffinityTerm"],
                            type: ["object", "null"],
                          },
                          type: ["array", "null"],
                        },
                        requiredDuringSchedulingIgnoredDuringExecution: {
                          description:
                            "If the anti-affinity requirements specified by this field are not met at scheduling time, the pod will not be scheduled onto the node. If the anti-affinity requirements specified by this field cease to be met at some point during pod execution (e.g. due to a pod label update), the system may or may not try to eventually evict the pod from its node. When there are multiple elements, the lists of nodes corresponding to each podAffinityTerm are intersected, i.e. all terms must be satisfied.",
                          items: {
                            description:
                              "Defines a set of pods (namely those matching the labelSelector relative to the given namespace(s)) that this pod should be co-located (affinity) or not co-located (anti-affinity) with, where co-located is defined as running on a node whose value of the label with key <topologyKey> matches that of any node on which a pod of the set of pods is running",
                            properties: {
                              labelSelector: {
                                description:
                                  "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                properties: {
                                  matchExpressions: {
                                    description:
                                      "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                    items: {
                                      description:
                                        "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                      properties: {
                                        key: {
                                          description:
                                            "key is the label key that the selector applies to.",
                                          type: "string",
                                          "x-kubernetes-patch-merge-key": "key",
                                          "x-kubernetes-patch-strategy":
                                            "merge",
                                        },
                                        operator: {
                                          description:
                                            "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                          type: "string",
                                        },
                                        values: {
                                          description:
                                            "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                          items: {
                                            type: ["string", "null"],
                                          },
                                          type: ["array", "null"],
                                        },
                                      },
                                      required: ["key", "operator"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  matchLabels: {
                                    additionalProperties: {
                                      type: ["string", "null"],
                                    },
                                    description:
                                      'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                    type: ["object", "null"],
                                  },
                                },
                                type: ["object", "null"],
                                "x-kubernetes-map-type": "atomic",
                              },
                              namespaceSelector: {
                                description:
                                  "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                properties: {
                                  matchExpressions: {
                                    description:
                                      "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                    items: {
                                      description:
                                        "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                      properties: {
                                        key: {
                                          description:
                                            "key is the label key that the selector applies to.",
                                          type: "string",
                                          "x-kubernetes-patch-merge-key": "key",
                                          "x-kubernetes-patch-strategy":
                                            "merge",
                                        },
                                        operator: {
                                          description:
                                            "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                          type: "string",
                                        },
                                        values: {
                                          description:
                                            "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                          items: {
                                            type: ["string", "null"],
                                          },
                                          type: ["array", "null"],
                                        },
                                      },
                                      required: ["key", "operator"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  matchLabels: {
                                    additionalProperties: {
                                      type: ["string", "null"],
                                    },
                                    description:
                                      'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                    type: ["object", "null"],
                                  },
                                },
                                type: ["object", "null"],
                                "x-kubernetes-map-type": "atomic",
                              },
                              namespaces: {
                                description:
                                  'namespaces specifies a static list of namespace names that the term applies to. The term is applied to the union of the namespaces listed in this field and the ones selected by namespaceSelector. null or empty namespaces list and null namespaceSelector means "this pod\'s namespace".',
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                              topologyKey: {
                                description:
                                  "This pod should be co-located (affinity) or not co-located (anti-affinity) with the pods matching the labelSelector in the specified namespaces, where co-located is defined as running on a node whose value of the label with key topologyKey matches that of any node on which any of the selected pods is running. Empty topologyKey is not allowed.",
                                type: "string",
                              },
                            },
                            required: ["topologyKey"],
                            type: ["object", "null"],
                          },
                          type: ["array", "null"],
                        },
                      },
                      type: ["object", "null"],
                    },
                  },
                  type: ["object", "null"],
                },
                automountServiceAccountToken: {
                  description:
                    "AutomountServiceAccountToken indicates whether a service account token should be automatically mounted.",
                  type: ["boolean", "null"],
                },
                containers: {
                  description:
                    "List of containers belonging to the pod. Containers cannot currently be added or removed. There must be at least one container in a Pod. Cannot be updated.",
                  items: {
                    description:
                      "A single application container that you want to run within a pod.",
                    properties: {
                      args: {
                        description:
                          'Arguments to the entrypoint. The container image\'s CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container\'s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell',
                        items: {
                          type: ["string", "null"],
                        },
                        type: ["array", "null"],
                      },
                      command: {
                        description:
                          'Entrypoint array. Not executed within a shell. The container image\'s ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container\'s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell',
                        items: {
                          type: ["string", "null"],
                        },
                        type: ["array", "null"],
                      },
                      env: {
                        description:
                          "List of environment variables to set in the container. Cannot be updated.",
                        items: {
                          description:
                            "EnvVar represents an environment variable present in a Container.",
                          properties: {
                            name: {
                              description:
                                "Name of the environment variable. Must be a C_IDENTIFIER.",
                              type: "string",
                            },
                            value: {
                              description:
                                'Variable references $(VAR_NAME) are expanded using the previously defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".',
                              type: ["string", "null"],
                            },
                            valueFrom: {
                              description:
                                "EnvVarSource represents a source for the value of an EnvVar.",
                              properties: {
                                configMapKeyRef: {
                                  description:
                                    "Selects a key from a ConfigMap.",
                                  properties: {
                                    key: {
                                      description: "The key to select.",
                                      type: "string",
                                    },
                                    name: {
                                      description:
                                        "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                      type: ["string", "null"],
                                    },
                                    optional: {
                                      description:
                                        "Specify whether the ConfigMap or its key must be defined",
                                      type: ["boolean", "null"],
                                    },
                                  },
                                  required: ["key"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                fieldRef: {
                                  description:
                                    "ObjectFieldSelector selects an APIVersioned field of an object.",
                                  properties: {
                                    apiVersion: {
                                      description:
                                        'Version of the schema the FieldPath is written in terms of, defaults to "v1".',
                                      type: ["string", "null"],
                                    },
                                    fieldPath: {
                                      description:
                                        "Path of the field to select in the specified API version.",
                                      type: "string",
                                    },
                                  },
                                  required: ["fieldPath"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                resourceFieldRef: {
                                  description:
                                    "ResourceFieldSelector represents container resources (cpu, memory) and their output format",
                                  properties: {
                                    containerName: {
                                      description:
                                        "Container name: required for volumes, optional for env vars",
                                      type: ["string", "null"],
                                    },
                                    divisor: {
                                      oneOf: [
                                        {
                                          type: ["string", "null"],
                                        },
                                        {
                                          type: ["number", "null"],
                                        },
                                      ],
                                    },
                                    resource: {
                                      description:
                                        "Required: resource to select",
                                      type: "string",
                                    },
                                  },
                                  required: ["resource"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                secretKeyRef: {
                                  description:
                                    "SecretKeySelector selects a key of a Secret.",
                                  properties: {
                                    key: {
                                      description:
                                        "The key of the secret to select from.  Must be a valid secret key.",
                                      type: "string",
                                    },
                                    name: {
                                      description:
                                        "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                      type: ["string", "null"],
                                    },
                                    optional: {
                                      description:
                                        "Specify whether the Secret or its key must be defined",
                                      type: ["boolean", "null"],
                                    },
                                  },
                                  required: ["key"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                              },
                              type: ["object", "null"],
                            },
                          },
                          required: ["name"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "name",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      envFrom: {
                        description:
                          "List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.",
                        items: {
                          description:
                            "EnvFromSource represents the source of a set of ConfigMaps",
                          properties: {
                            configMapRef: {
                              description:
                                "ConfigMapEnvSource selects a ConfigMap to populate the environment variables with.\n\nThe contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables.",
                              properties: {
                                name: {
                                  description:
                                    "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                  type: ["string", "null"],
                                },
                                optional: {
                                  description:
                                    "Specify whether the ConfigMap must be defined",
                                  type: ["boolean", "null"],
                                },
                              },
                              type: ["object", "null"],
                            },
                            prefix: {
                              description:
                                "An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.",
                              type: ["string", "null"],
                            },
                            secretRef: {
                              description:
                                "SecretEnvSource selects a Secret to populate the environment variables with.\n\nThe contents of the target Secret's Data field will represent the key-value pairs as environment variables.",
                              properties: {
                                name: {
                                  description:
                                    "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                  type: ["string", "null"],
                                },
                                optional: {
                                  description:
                                    "Specify whether the Secret must be defined",
                                  type: ["boolean", "null"],
                                },
                              },
                              type: ["object", "null"],
                            },
                          },
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                      },
                      image: {
                        description:
                          "Container image name. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.",
                        type: ["string", "null"],
                      },
                      imagePullPolicy: {
                        description:
                          "Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images\n\n",
                        type: ["string", "null"],
                      },
                      lifecycle: {
                        description:
                          "Lifecycle describes actions that the management system should take in response to container lifecycle events. For the PostStart and PreStop lifecycle handlers, management of the container blocks until the action is complete, unless the container process fails, in which case the handler is aborted.",
                        properties: {
                          postStart: {
                            description:
                              "LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.",
                            properties: {
                              exec: {
                                description:
                                  'ExecAction describes a "run in container" action.',
                                properties: {
                                  command: {
                                    description:
                                      "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                },
                                type: ["object", "null"],
                              },
                              httpGet: {
                                description:
                                  "HTTPGetAction describes an action based on HTTP Get requests.",
                                properties: {
                                  host: {
                                    description:
                                      'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                    type: ["string", "null"],
                                  },
                                  httpHeaders: {
                                    description:
                                      "Custom headers to set in the request. HTTP allows repeated headers.",
                                    items: {
                                      description:
                                        "HTTPHeader describes a custom header to be used in HTTP probes",
                                      properties: {
                                        name: {
                                          description: "The header field name",
                                          type: "string",
                                        },
                                        value: {
                                          description: "The header field value",
                                          type: "string",
                                        },
                                      },
                                      required: ["name", "value"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  path: {
                                    description:
                                      "Path to access on the HTTP server.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                  scheme: {
                                    description:
                                      "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                    type: ["string", "null"],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                              tcpSocket: {
                                description:
                                  "TCPSocketAction describes an action based on opening a socket",
                                properties: {
                                  host: {
                                    description:
                                      "Optional: Host name to connect to, defaults to the pod IP.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          preStop: {
                            description:
                              "LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.",
                            properties: {
                              exec: {
                                description:
                                  'ExecAction describes a "run in container" action.',
                                properties: {
                                  command: {
                                    description:
                                      "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                },
                                type: ["object", "null"],
                              },
                              httpGet: {
                                description:
                                  "HTTPGetAction describes an action based on HTTP Get requests.",
                                properties: {
                                  host: {
                                    description:
                                      'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                    type: ["string", "null"],
                                  },
                                  httpHeaders: {
                                    description:
                                      "Custom headers to set in the request. HTTP allows repeated headers.",
                                    items: {
                                      description:
                                        "HTTPHeader describes a custom header to be used in HTTP probes",
                                      properties: {
                                        name: {
                                          description: "The header field name",
                                          type: "string",
                                        },
                                        value: {
                                          description: "The header field value",
                                          type: "string",
                                        },
                                      },
                                      required: ["name", "value"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  path: {
                                    description:
                                      "Path to access on the HTTP server.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                  scheme: {
                                    description:
                                      "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                    type: ["string", "null"],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                              tcpSocket: {
                                description:
                                  "TCPSocketAction describes an action based on opening a socket",
                                properties: {
                                  host: {
                                    description:
                                      "Optional: Host name to connect to, defaults to the pod IP.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      livenessProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      name: {
                        description:
                          "Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.",
                        type: "string",
                      },
                      ports: {
                        description:
                          'List of ports to expose from the container. Exposing a port here gives the system additional information about the network connections a container uses, but is primarily informational. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network. Cannot be updated.',
                        items: {
                          description:
                            "ContainerPort represents a network port in a single container.",
                          properties: {
                            containerPort: {
                              description:
                                "Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.",
                              format: "int32",
                              type: "integer",
                            },
                            hostIP: {
                              description:
                                "What host IP to bind the external port to.",
                              type: ["string", "null"],
                            },
                            hostPort: {
                              description:
                                "Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.",
                              format: "int32",
                              type: ["integer", "null"],
                            },
                            name: {
                              description:
                                "If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.",
                              type: ["string", "null"],
                            },
                            protocol: {
                              description:
                                'Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".\n\n',
                              type: ["string", "null"],
                            },
                          },
                          required: ["containerPort"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-list-map-keys": [
                          "containerPort",
                          "protocol",
                        ],
                        "x-kubernetes-list-type": "map",
                        "x-kubernetes-patch-merge-key": "containerPort",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      readinessProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      resources: {
                        description:
                          "ResourceRequirements describes the compute resource requirements.",
                        properties: {
                          limits: {
                            additionalProperties: {
                              oneOf: [
                                {
                                  type: ["string", "null"],
                                },
                                {
                                  type: ["number", "null"],
                                },
                              ],
                            },
                            description:
                              "Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                            type: ["object", "null"],
                          },
                          requests: {
                            additionalProperties: {
                              oneOf: [
                                {
                                  type: ["string", "null"],
                                },
                                {
                                  type: ["number", "null"],
                                },
                              ],
                            },
                            description:
                              "Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      securityContext: {
                        description:
                          "SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence.",
                        properties: {
                          allowPrivilegeEscalation: {
                            description:
                              "AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          capabilities: {
                            description:
                              "Adds and removes POSIX capabilities from running containers.",
                            properties: {
                              add: {
                                description: "Added capabilities",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                              drop: {
                                description: "Removed capabilities",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          privileged: {
                            description:
                              "Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          procMount: {
                            description:
                              "procMount denotes the type of proc mount to use for the containers. The default is DefaultProcMount which uses the container runtime defaults for readonly paths and masked paths. This requires the ProcMountType feature flag to be enabled. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["string", "null"],
                          },
                          readOnlyRootFilesystem: {
                            description:
                              "Whether this container has a read-only root filesystem. Default is false. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          runAsGroup: {
                            description:
                              "The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          runAsNonRoot: {
                            description:
                              "Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
                            type: ["boolean", "null"],
                          },
                          runAsUser: {
                            description:
                              "The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          seLinuxOptions: {
                            description:
                              "SELinuxOptions are the labels to be applied to the container",
                            properties: {
                              level: {
                                description:
                                  "Level is SELinux level label that applies to the container.",
                                type: ["string", "null"],
                              },
                              role: {
                                description:
                                  "Role is a SELinux role label that applies to the container.",
                                type: ["string", "null"],
                              },
                              type: {
                                description:
                                  "Type is a SELinux type label that applies to the container.",
                                type: ["string", "null"],
                              },
                              user: {
                                description:
                                  "User is a SELinux user label that applies to the container.",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          seccompProfile: {
                            description:
                              "SeccompProfile defines a pod/container's seccomp profile settings. Only one profile source may be set.",
                            properties: {
                              localhostProfile: {
                                description:
                                  'localhostProfile indicates a profile defined in a file on the node should be used. The profile must be preconfigured on the node to work. Must be a descending path, relative to the kubelet\'s configured seccomp profile location. Must only be set if type is "Localhost".',
                                type: ["string", "null"],
                              },
                              type: {
                                description:
                                  "type indicates which kind of seccomp profile will be applied. Valid options are:\n\nLocalhost - a profile defined in a file on the node should be used. RuntimeDefault - the container runtime default profile should be used. Unconfined - no profile should be applied.\n\n",
                                type: "string",
                              },
                            },
                            required: ["type"],
                            type: ["object", "null"],
                            "x-kubernetes-unions": [
                              {
                                discriminator: "type",
                                "fields-to-discriminateBy": {
                                  localhostProfile: "LocalhostProfile",
                                },
                              },
                            ],
                          },
                          windowsOptions: {
                            description:
                              "WindowsSecurityContextOptions contain Windows-specific options and credentials.",
                            properties: {
                              gmsaCredentialSpec: {
                                description:
                                  "GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.",
                                type: ["string", "null"],
                              },
                              gmsaCredentialSpecName: {
                                description:
                                  "GMSACredentialSpecName is the name of the GMSA credential spec to use.",
                                type: ["string", "null"],
                              },
                              hostProcess: {
                                description:
                                  "HostProcess determines if a container should be run as a 'Host Process' container. This field is alpha-level and will only be honored by components that enable the WindowsHostProcessContainers feature flag. Setting this field without the feature flag will result in errors when validating the Pod. All of a Pod's containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).  In addition, if HostProcess is true then HostNetwork must also be set to true.",
                                type: ["boolean", "null"],
                              },
                              runAsUserName: {
                                description:
                                  "The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      startupProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      stdin: {
                        description:
                          "Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.",
                        type: ["boolean", "null"],
                      },
                      stdinOnce: {
                        description:
                          "Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false",
                        type: ["boolean", "null"],
                      },
                      terminationMessagePath: {
                        description:
                          "Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.",
                        type: ["string", "null"],
                      },
                      terminationMessagePolicy: {
                        description:
                          "Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.\n\n",
                        type: ["string", "null"],
                      },
                      tty: {
                        description:
                          "Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.",
                        type: ["boolean", "null"],
                      },
                      volumeDevices: {
                        description:
                          "volumeDevices is the list of block devices to be used by the container.",
                        items: {
                          description:
                            "volumeDevice describes a mapping of a raw block device within a container.",
                          properties: {
                            devicePath: {
                              description:
                                "devicePath is the path inside of the container that the device will be mapped to.",
                              type: "string",
                            },
                            name: {
                              description:
                                "name must match the name of a persistentVolumeClaim in the pod",
                              type: "string",
                            },
                          },
                          required: ["name", "devicePath"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "devicePath",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      volumeMounts: {
                        description:
                          "Pod volumes to mount into the container's filesystem. Cannot be updated.",
                        items: {
                          description:
                            "VolumeMount describes a mounting of a Volume within a container.",
                          properties: {
                            mountPath: {
                              description:
                                "Path within the container at which the volume should be mounted.  Must not contain ':'.",
                              type: "string",
                            },
                            mountPropagation: {
                              description:
                                "mountPropagation determines how mounts are propagated from the host to container and the other way around. When not set, MountPropagationNone is used. This field is beta in 1.10.",
                              type: ["string", "null"],
                            },
                            name: {
                              description:
                                "This must match the Name of a Volume.",
                              type: "string",
                            },
                            readOnly: {
                              description:
                                "Mounted read-only if true, read-write otherwise (false or unspecified). Defaults to false.",
                              type: ["boolean", "null"],
                            },
                            subPath: {
                              description:
                                "Path within the volume from which the container's volume should be mounted. Defaults to \"\" (volume's root).",
                              type: ["string", "null"],
                            },
                            subPathExpr: {
                              description:
                                "Expanded path within the volume from which the container's volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment. Defaults to \"\" (volume's root). SubPathExpr and SubPath are mutually exclusive.",
                              type: ["string", "null"],
                            },
                          },
                          required: ["name", "mountPath"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "mountPath",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      workingDir: {
                        description:
                          "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.",
                        type: ["string", "null"],
                      },
                    },
                    required: ["name"],
                    type: ["object", "null"],
                  },
                  type: "array",
                  "x-kubernetes-patch-merge-key": "name",
                  "x-kubernetes-patch-strategy": "merge",
                },
                dnsConfig: {
                  description:
                    "PodDNSConfig defines the DNS parameters of a pod in addition to those generated from DNSPolicy.",
                  properties: {
                    nameservers: {
                      description:
                        "A list of DNS name server IP addresses. This will be appended to the base nameservers generated from DNSPolicy. Duplicated nameservers will be removed.",
                      items: {
                        type: ["string", "null"],
                      },
                      type: ["array", "null"],
                    },
                    options: {
                      description:
                        "A list of DNS resolver options. This will be merged with the base options generated from DNSPolicy. Duplicated entries will be removed. Resolution options given in Options will override those that appear in the base DNSPolicy.",
                      items: {
                        description:
                          "PodDNSConfigOption defines DNS resolver options of a pod.",
                        properties: {
                          name: {
                            description: "Required.",
                            type: ["string", "null"],
                          },
                          value: {
                            type: ["string", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      type: ["array", "null"],
                    },
                    searches: {
                      description:
                        "A list of DNS search domains for host-name lookup. This will be appended to the base search paths generated from DNSPolicy. Duplicated search paths will be removed.",
                      items: {
                        type: ["string", "null"],
                      },
                      type: ["array", "null"],
                    },
                  },
                  type: ["object", "null"],
                },
                dnsPolicy: {
                  description:
                    "Set DNS policy for the pod. Defaults to \"ClusterFirst\". Valid values are 'ClusterFirstWithHostNet', 'ClusterFirst', 'Default' or 'None'. DNS parameters given in DNSConfig will be merged with the policy selected with DNSPolicy. To have DNS options set along with hostNetwork, you have to specify DNS policy explicitly to 'ClusterFirstWithHostNet'.\n\n",
                  type: ["string", "null"],
                },
                enableServiceLinks: {
                  description:
                    "EnableServiceLinks indicates whether information about services should be injected into pod's environment variables, matching the syntax of Docker links. Optional: Defaults to true.",
                  type: ["boolean", "null"],
                },
                ephemeralContainers: {
                  description:
                    "List of ephemeral containers run in this pod. Ephemeral containers may be run in an existing pod to perform user-initiated actions such as debugging. This list cannot be specified when creating a pod, and it cannot be modified by updating the pod spec. In order to add an ephemeral container to an existing pod, use the pod's ephemeralcontainers subresource. This field is beta-level and available on clusters that haven't disabled the EphemeralContainers feature gate.",
                  items: {
                    description:
                      "An EphemeralContainer is a temporary container that you may add to an existing Pod for user-initiated activities such as debugging. Ephemeral containers have no resource or scheduling guarantees, and they will not be restarted when they exit or when a Pod is removed or restarted. The kubelet may evict a Pod if an ephemeral container causes the Pod to exceed its resource allocation.\n\nTo add an ephemeral container, use the ephemeralcontainers subresource of an existing Pod. Ephemeral containers may not be removed or restarted.\n\nThis is a beta feature available on clusters that haven't disabled the EphemeralContainers feature gate.",
                    properties: {
                      args: {
                        description:
                          'Arguments to the entrypoint. The image\'s CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container\'s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell',
                        items: {
                          type: ["string", "null"],
                        },
                        type: ["array", "null"],
                      },
                      command: {
                        description:
                          'Entrypoint array. Not executed within a shell. The image\'s ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container\'s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell',
                        items: {
                          type: ["string", "null"],
                        },
                        type: ["array", "null"],
                      },
                      env: {
                        description:
                          "List of environment variables to set in the container. Cannot be updated.",
                        items: {
                          description:
                            "EnvVar represents an environment variable present in a Container.",
                          properties: {
                            name: {
                              description:
                                "Name of the environment variable. Must be a C_IDENTIFIER.",
                              type: "string",
                            },
                            value: {
                              description:
                                'Variable references $(VAR_NAME) are expanded using the previously defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".',
                              type: ["string", "null"],
                            },
                            valueFrom: {
                              description:
                                "EnvVarSource represents a source for the value of an EnvVar.",
                              properties: {
                                configMapKeyRef: {
                                  description:
                                    "Selects a key from a ConfigMap.",
                                  properties: {
                                    key: {
                                      description: "The key to select.",
                                      type: "string",
                                    },
                                    name: {
                                      description:
                                        "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                      type: ["string", "null"],
                                    },
                                    optional: {
                                      description:
                                        "Specify whether the ConfigMap or its key must be defined",
                                      type: ["boolean", "null"],
                                    },
                                  },
                                  required: ["key"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                fieldRef: {
                                  description:
                                    "ObjectFieldSelector selects an APIVersioned field of an object.",
                                  properties: {
                                    apiVersion: {
                                      description:
                                        'Version of the schema the FieldPath is written in terms of, defaults to "v1".',
                                      type: ["string", "null"],
                                    },
                                    fieldPath: {
                                      description:
                                        "Path of the field to select in the specified API version.",
                                      type: "string",
                                    },
                                  },
                                  required: ["fieldPath"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                resourceFieldRef: {
                                  description:
                                    "ResourceFieldSelector represents container resources (cpu, memory) and their output format",
                                  properties: {
                                    containerName: {
                                      description:
                                        "Container name: required for volumes, optional for env vars",
                                      type: ["string", "null"],
                                    },
                                    divisor: {
                                      oneOf: [
                                        {
                                          type: ["string", "null"],
                                        },
                                        {
                                          type: ["number", "null"],
                                        },
                                      ],
                                    },
                                    resource: {
                                      description:
                                        "Required: resource to select",
                                      type: "string",
                                    },
                                  },
                                  required: ["resource"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                secretKeyRef: {
                                  description:
                                    "SecretKeySelector selects a key of a Secret.",
                                  properties: {
                                    key: {
                                      description:
                                        "The key of the secret to select from.  Must be a valid secret key.",
                                      type: "string",
                                    },
                                    name: {
                                      description:
                                        "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                      type: ["string", "null"],
                                    },
                                    optional: {
                                      description:
                                        "Specify whether the Secret or its key must be defined",
                                      type: ["boolean", "null"],
                                    },
                                  },
                                  required: ["key"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                              },
                              type: ["object", "null"],
                            },
                          },
                          required: ["name"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "name",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      envFrom: {
                        description:
                          "List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.",
                        items: {
                          description:
                            "EnvFromSource represents the source of a set of ConfigMaps",
                          properties: {
                            configMapRef: {
                              description:
                                "ConfigMapEnvSource selects a ConfigMap to populate the environment variables with.\n\nThe contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables.",
                              properties: {
                                name: {
                                  description:
                                    "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                  type: ["string", "null"],
                                },
                                optional: {
                                  description:
                                    "Specify whether the ConfigMap must be defined",
                                  type: ["boolean", "null"],
                                },
                              },
                              type: ["object", "null"],
                            },
                            prefix: {
                              description:
                                "An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.",
                              type: ["string", "null"],
                            },
                            secretRef: {
                              description:
                                "SecretEnvSource selects a Secret to populate the environment variables with.\n\nThe contents of the target Secret's Data field will represent the key-value pairs as environment variables.",
                              properties: {
                                name: {
                                  description:
                                    "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                  type: ["string", "null"],
                                },
                                optional: {
                                  description:
                                    "Specify whether the Secret must be defined",
                                  type: ["boolean", "null"],
                                },
                              },
                              type: ["object", "null"],
                            },
                          },
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                      },
                      image: {
                        description:
                          "Container image name. More info: https://kubernetes.io/docs/concepts/containers/images",
                        type: ["string", "null"],
                      },
                      imagePullPolicy: {
                        description:
                          "Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images\n\n",
                        type: ["string", "null"],
                      },
                      lifecycle: {
                        description:
                          "Lifecycle describes actions that the management system should take in response to container lifecycle events. For the PostStart and PreStop lifecycle handlers, management of the container blocks until the action is complete, unless the container process fails, in which case the handler is aborted.",
                        properties: {
                          postStart: {
                            description:
                              "LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.",
                            properties: {
                              exec: {
                                description:
                                  'ExecAction describes a "run in container" action.',
                                properties: {
                                  command: {
                                    description:
                                      "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                },
                                type: ["object", "null"],
                              },
                              httpGet: {
                                description:
                                  "HTTPGetAction describes an action based on HTTP Get requests.",
                                properties: {
                                  host: {
                                    description:
                                      'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                    type: ["string", "null"],
                                  },
                                  httpHeaders: {
                                    description:
                                      "Custom headers to set in the request. HTTP allows repeated headers.",
                                    items: {
                                      description:
                                        "HTTPHeader describes a custom header to be used in HTTP probes",
                                      properties: {
                                        name: {
                                          description: "The header field name",
                                          type: "string",
                                        },
                                        value: {
                                          description: "The header field value",
                                          type: "string",
                                        },
                                      },
                                      required: ["name", "value"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  path: {
                                    description:
                                      "Path to access on the HTTP server.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                  scheme: {
                                    description:
                                      "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                    type: ["string", "null"],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                              tcpSocket: {
                                description:
                                  "TCPSocketAction describes an action based on opening a socket",
                                properties: {
                                  host: {
                                    description:
                                      "Optional: Host name to connect to, defaults to the pod IP.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          preStop: {
                            description:
                              "LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.",
                            properties: {
                              exec: {
                                description:
                                  'ExecAction describes a "run in container" action.',
                                properties: {
                                  command: {
                                    description:
                                      "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                },
                                type: ["object", "null"],
                              },
                              httpGet: {
                                description:
                                  "HTTPGetAction describes an action based on HTTP Get requests.",
                                properties: {
                                  host: {
                                    description:
                                      'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                    type: ["string", "null"],
                                  },
                                  httpHeaders: {
                                    description:
                                      "Custom headers to set in the request. HTTP allows repeated headers.",
                                    items: {
                                      description:
                                        "HTTPHeader describes a custom header to be used in HTTP probes",
                                      properties: {
                                        name: {
                                          description: "The header field name",
                                          type: "string",
                                        },
                                        value: {
                                          description: "The header field value",
                                          type: "string",
                                        },
                                      },
                                      required: ["name", "value"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  path: {
                                    description:
                                      "Path to access on the HTTP server.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                  scheme: {
                                    description:
                                      "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                    type: ["string", "null"],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                              tcpSocket: {
                                description:
                                  "TCPSocketAction describes an action based on opening a socket",
                                properties: {
                                  host: {
                                    description:
                                      "Optional: Host name to connect to, defaults to the pod IP.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      livenessProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      name: {
                        description:
                          "Name of the ephemeral container specified as a DNS_LABEL. This name must be unique among all containers, init containers and ephemeral containers.",
                        type: "string",
                      },
                      ports: {
                        description:
                          "Ports are not allowed for ephemeral containers.",
                        items: {
                          description:
                            "ContainerPort represents a network port in a single container.",
                          properties: {
                            containerPort: {
                              description:
                                "Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.",
                              format: "int32",
                              type: "integer",
                            },
                            hostIP: {
                              description:
                                "What host IP to bind the external port to.",
                              type: ["string", "null"],
                            },
                            hostPort: {
                              description:
                                "Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.",
                              format: "int32",
                              type: ["integer", "null"],
                            },
                            name: {
                              description:
                                "If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.",
                              type: ["string", "null"],
                            },
                            protocol: {
                              description:
                                'Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".\n\n',
                              type: ["string", "null"],
                            },
                          },
                          required: ["containerPort"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-list-map-keys": [
                          "containerPort",
                          "protocol",
                        ],
                        "x-kubernetes-list-type": "map",
                        "x-kubernetes-patch-merge-key": "containerPort",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      readinessProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      resources: {
                        description:
                          "ResourceRequirements describes the compute resource requirements.",
                        properties: {
                          limits: {
                            additionalProperties: {
                              oneOf: [
                                {
                                  type: ["string", "null"],
                                },
                                {
                                  type: ["number", "null"],
                                },
                              ],
                            },
                            description:
                              "Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                            type: ["object", "null"],
                          },
                          requests: {
                            additionalProperties: {
                              oneOf: [
                                {
                                  type: ["string", "null"],
                                },
                                {
                                  type: ["number", "null"],
                                },
                              ],
                            },
                            description:
                              "Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      securityContext: {
                        description:
                          "SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence.",
                        properties: {
                          allowPrivilegeEscalation: {
                            description:
                              "AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          capabilities: {
                            description:
                              "Adds and removes POSIX capabilities from running containers.",
                            properties: {
                              add: {
                                description: "Added capabilities",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                              drop: {
                                description: "Removed capabilities",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          privileged: {
                            description:
                              "Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          procMount: {
                            description:
                              "procMount denotes the type of proc mount to use for the containers. The default is DefaultProcMount which uses the container runtime defaults for readonly paths and masked paths. This requires the ProcMountType feature flag to be enabled. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["string", "null"],
                          },
                          readOnlyRootFilesystem: {
                            description:
                              "Whether this container has a read-only root filesystem. Default is false. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          runAsGroup: {
                            description:
                              "The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          runAsNonRoot: {
                            description:
                              "Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
                            type: ["boolean", "null"],
                          },
                          runAsUser: {
                            description:
                              "The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          seLinuxOptions: {
                            description:
                              "SELinuxOptions are the labels to be applied to the container",
                            properties: {
                              level: {
                                description:
                                  "Level is SELinux level label that applies to the container.",
                                type: ["string", "null"],
                              },
                              role: {
                                description:
                                  "Role is a SELinux role label that applies to the container.",
                                type: ["string", "null"],
                              },
                              type: {
                                description:
                                  "Type is a SELinux type label that applies to the container.",
                                type: ["string", "null"],
                              },
                              user: {
                                description:
                                  "User is a SELinux user label that applies to the container.",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          seccompProfile: {
                            description:
                              "SeccompProfile defines a pod/container's seccomp profile settings. Only one profile source may be set.",
                            properties: {
                              localhostProfile: {
                                description:
                                  'localhostProfile indicates a profile defined in a file on the node should be used. The profile must be preconfigured on the node to work. Must be a descending path, relative to the kubelet\'s configured seccomp profile location. Must only be set if type is "Localhost".',
                                type: ["string", "null"],
                              },
                              type: {
                                description:
                                  "type indicates which kind of seccomp profile will be applied. Valid options are:\n\nLocalhost - a profile defined in a file on the node should be used. RuntimeDefault - the container runtime default profile should be used. Unconfined - no profile should be applied.\n\n",
                                type: "string",
                              },
                            },
                            required: ["type"],
                            type: ["object", "null"],
                            "x-kubernetes-unions": [
                              {
                                discriminator: "type",
                                "fields-to-discriminateBy": {
                                  localhostProfile: "LocalhostProfile",
                                },
                              },
                            ],
                          },
                          windowsOptions: {
                            description:
                              "WindowsSecurityContextOptions contain Windows-specific options and credentials.",
                            properties: {
                              gmsaCredentialSpec: {
                                description:
                                  "GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.",
                                type: ["string", "null"],
                              },
                              gmsaCredentialSpecName: {
                                description:
                                  "GMSACredentialSpecName is the name of the GMSA credential spec to use.",
                                type: ["string", "null"],
                              },
                              hostProcess: {
                                description:
                                  "HostProcess determines if a container should be run as a 'Host Process' container. This field is alpha-level and will only be honored by components that enable the WindowsHostProcessContainers feature flag. Setting this field without the feature flag will result in errors when validating the Pod. All of a Pod's containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).  In addition, if HostProcess is true then HostNetwork must also be set to true.",
                                type: ["boolean", "null"],
                              },
                              runAsUserName: {
                                description:
                                  "The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      startupProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      stdin: {
                        description:
                          "Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.",
                        type: ["boolean", "null"],
                      },
                      stdinOnce: {
                        description:
                          "Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false",
                        type: ["boolean", "null"],
                      },
                      targetContainerName: {
                        description:
                          "If set, the name of the container from PodSpec that this ephemeral container targets. The ephemeral container will be run in the namespaces (IPC, PID, etc) of this container. If not set then the ephemeral container uses the namespaces configured in the Pod spec.\n\nThe container runtime must implement support for this feature. If the runtime does not support namespace targeting then the result of setting this field is undefined.",
                        type: ["string", "null"],
                      },
                      terminationMessagePath: {
                        description:
                          "Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.",
                        type: ["string", "null"],
                      },
                      terminationMessagePolicy: {
                        description:
                          "Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.\n\n",
                        type: ["string", "null"],
                      },
                      tty: {
                        description:
                          "Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.",
                        type: ["boolean", "null"],
                      },
                      volumeDevices: {
                        description:
                          "volumeDevices is the list of block devices to be used by the container.",
                        items: {
                          description:
                            "volumeDevice describes a mapping of a raw block device within a container.",
                          properties: {
                            devicePath: {
                              description:
                                "devicePath is the path inside of the container that the device will be mapped to.",
                              type: "string",
                            },
                            name: {
                              description:
                                "name must match the name of a persistentVolumeClaim in the pod",
                              type: "string",
                            },
                          },
                          required: ["name", "devicePath"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "devicePath",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      volumeMounts: {
                        description:
                          "Pod volumes to mount into the container's filesystem. Subpath mounts are not allowed for ephemeral containers. Cannot be updated.",
                        items: {
                          description:
                            "VolumeMount describes a mounting of a Volume within a container.",
                          properties: {
                            mountPath: {
                              description:
                                "Path within the container at which the volume should be mounted.  Must not contain ':'.",
                              type: "string",
                            },
                            mountPropagation: {
                              description:
                                "mountPropagation determines how mounts are propagated from the host to container and the other way around. When not set, MountPropagationNone is used. This field is beta in 1.10.",
                              type: ["string", "null"],
                            },
                            name: {
                              description:
                                "This must match the Name of a Volume.",
                              type: "string",
                            },
                            readOnly: {
                              description:
                                "Mounted read-only if true, read-write otherwise (false or unspecified). Defaults to false.",
                              type: ["boolean", "null"],
                            },
                            subPath: {
                              description:
                                "Path within the volume from which the container's volume should be mounted. Defaults to \"\" (volume's root).",
                              type: ["string", "null"],
                            },
                            subPathExpr: {
                              description:
                                "Expanded path within the volume from which the container's volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment. Defaults to \"\" (volume's root). SubPathExpr and SubPath are mutually exclusive.",
                              type: ["string", "null"],
                            },
                          },
                          required: ["name", "mountPath"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "mountPath",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      workingDir: {
                        description:
                          "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.",
                        type: ["string", "null"],
                      },
                    },
                    required: ["name"],
                    type: ["object", "null"],
                  },
                  type: ["array", "null"],
                  "x-kubernetes-patch-merge-key": "name",
                  "x-kubernetes-patch-strategy": "merge",
                },
                hostAliases: {
                  description:
                    "HostAliases is an optional list of hosts and IPs that will be injected into the pod's hosts file if specified. This is only valid for non-hostNetwork pods.",
                  items: {
                    description:
                      "HostAlias holds the mapping between IP and hostnames that will be injected as an entry in the pod's hosts file.",
                    properties: {
                      hostnames: {
                        description: "Hostnames for the above IP address.",
                        items: {
                          type: ["string", "null"],
                        },
                        type: ["array", "null"],
                      },
                      ip: {
                        description: "IP address of the host file entry.",
                        type: ["string", "null"],
                      },
                    },
                    type: ["object", "null"],
                  },
                  type: ["array", "null"],
                  "x-kubernetes-patch-merge-key": "ip",
                  "x-kubernetes-patch-strategy": "merge",
                },
                hostIPC: {
                  description:
                    "Use the host's ipc namespace. Optional: Default to false.",
                  type: ["boolean", "null"],
                },
                hostNetwork: {
                  description:
                    "Host networking requested for this pod. Use the host's network namespace. If this option is set, the ports that will be used must be specified. Default to false.",
                  type: ["boolean", "null"],
                },
                hostPID: {
                  description:
                    "Use the host's pid namespace. Optional: Default to false.",
                  type: ["boolean", "null"],
                },
                hostname: {
                  description:
                    "Specifies the hostname of the Pod If not specified, the pod's hostname will be set to a system-defined value.",
                  type: ["string", "null"],
                },
                imagePullSecrets: {
                  description:
                    "ImagePullSecrets is an optional list of references to secrets in the same namespace to use for pulling any of the images used by this PodSpec. If specified, these secrets will be passed to individual puller implementations for them to use. More info: https://kubernetes.io/docs/concepts/containers/images#specifying-imagepullsecrets-on-a-pod",
                  items: {
                    description:
                      "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                    properties: {
                      name: {
                        description:
                          "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                        type: ["string", "null"],
                      },
                    },
                    type: ["object", "null"],
                    "x-kubernetes-map-type": "atomic",
                  },
                  type: ["array", "null"],
                  "x-kubernetes-patch-merge-key": "name",
                  "x-kubernetes-patch-strategy": "merge",
                },
                initContainers: {
                  description:
                    "List of initialization containers belonging to the pod. Init containers are executed in order prior to containers being started. If any init container fails, the pod is considered to have failed and is handled according to its restartPolicy. The name for an init container or normal container must be unique among all containers. Init containers may not have Lifecycle actions, Readiness probes, Liveness probes, or Startup probes. The resourceRequirements of an init container are taken into account during scheduling by finding the highest request/limit for each resource type, and then using the max of of that value or the sum of the normal containers. Limits are applied to init containers in a similar fashion. Init containers cannot currently be added or removed. Cannot be updated. More info: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/",
                  items: {
                    description:
                      "A single application container that you want to run within a pod.",
                    properties: {
                      args: {
                        description:
                          'Arguments to the entrypoint. The container image\'s CMD is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container\'s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell',
                        items: {
                          type: ["string", "null"],
                        },
                        type: ["array", "null"],
                      },
                      command: {
                        description:
                          'Entrypoint array. Not executed within a shell. The container image\'s ENTRYPOINT is used if this is not provided. Variable references $(VAR_NAME) are expanded using the container\'s environment. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Cannot be updated. More info: https://kubernetes.io/docs/tasks/inject-data-application/define-command-argument-container/#running-a-command-in-a-shell',
                        items: {
                          type: ["string", "null"],
                        },
                        type: ["array", "null"],
                      },
                      env: {
                        description:
                          "List of environment variables to set in the container. Cannot be updated.",
                        items: {
                          description:
                            "EnvVar represents an environment variable present in a Container.",
                          properties: {
                            name: {
                              description:
                                "Name of the environment variable. Must be a C_IDENTIFIER.",
                              type: "string",
                            },
                            value: {
                              description:
                                'Variable references $(VAR_NAME) are expanded using the previously defined environment variables in the container and any service environment variables. If a variable cannot be resolved, the reference in the input string will be unchanged. Double $$ are reduced to a single $, which allows for escaping the $(VAR_NAME) syntax: i.e. "$$(VAR_NAME)" will produce the string literal "$(VAR_NAME)". Escaped references will never be expanded, regardless of whether the variable exists or not. Defaults to "".',
                              type: ["string", "null"],
                            },
                            valueFrom: {
                              description:
                                "EnvVarSource represents a source for the value of an EnvVar.",
                              properties: {
                                configMapKeyRef: {
                                  description:
                                    "Selects a key from a ConfigMap.",
                                  properties: {
                                    key: {
                                      description: "The key to select.",
                                      type: "string",
                                    },
                                    name: {
                                      description:
                                        "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                      type: ["string", "null"],
                                    },
                                    optional: {
                                      description:
                                        "Specify whether the ConfigMap or its key must be defined",
                                      type: ["boolean", "null"],
                                    },
                                  },
                                  required: ["key"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                fieldRef: {
                                  description:
                                    "ObjectFieldSelector selects an APIVersioned field of an object.",
                                  properties: {
                                    apiVersion: {
                                      description:
                                        'Version of the schema the FieldPath is written in terms of, defaults to "v1".',
                                      type: ["string", "null"],
                                    },
                                    fieldPath: {
                                      description:
                                        "Path of the field to select in the specified API version.",
                                      type: "string",
                                    },
                                  },
                                  required: ["fieldPath"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                resourceFieldRef: {
                                  description:
                                    "ResourceFieldSelector represents container resources (cpu, memory) and their output format",
                                  properties: {
                                    containerName: {
                                      description:
                                        "Container name: required for volumes, optional for env vars",
                                      type: ["string", "null"],
                                    },
                                    divisor: {
                                      oneOf: [
                                        {
                                          type: ["string", "null"],
                                        },
                                        {
                                          type: ["number", "null"],
                                        },
                                      ],
                                    },
                                    resource: {
                                      description:
                                        "Required: resource to select",
                                      type: "string",
                                    },
                                  },
                                  required: ["resource"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                secretKeyRef: {
                                  description:
                                    "SecretKeySelector selects a key of a Secret.",
                                  properties: {
                                    key: {
                                      description:
                                        "The key of the secret to select from.  Must be a valid secret key.",
                                      type: "string",
                                    },
                                    name: {
                                      description:
                                        "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                      type: ["string", "null"],
                                    },
                                    optional: {
                                      description:
                                        "Specify whether the Secret or its key must be defined",
                                      type: ["boolean", "null"],
                                    },
                                  },
                                  required: ["key"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                              },
                              type: ["object", "null"],
                            },
                          },
                          required: ["name"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "name",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      envFrom: {
                        description:
                          "List of sources to populate environment variables in the container. The keys defined within a source must be a C_IDENTIFIER. All invalid keys will be reported as an event when the container is starting. When a key exists in multiple sources, the value associated with the last source will take precedence. Values defined by an Env with a duplicate key will take precedence. Cannot be updated.",
                        items: {
                          description:
                            "EnvFromSource represents the source of a set of ConfigMaps",
                          properties: {
                            configMapRef: {
                              description:
                                "ConfigMapEnvSource selects a ConfigMap to populate the environment variables with.\n\nThe contents of the target ConfigMap's Data field will represent the key-value pairs as environment variables.",
                              properties: {
                                name: {
                                  description:
                                    "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                  type: ["string", "null"],
                                },
                                optional: {
                                  description:
                                    "Specify whether the ConfigMap must be defined",
                                  type: ["boolean", "null"],
                                },
                              },
                              type: ["object", "null"],
                            },
                            prefix: {
                              description:
                                "An optional identifier to prepend to each key in the ConfigMap. Must be a C_IDENTIFIER.",
                              type: ["string", "null"],
                            },
                            secretRef: {
                              description:
                                "SecretEnvSource selects a Secret to populate the environment variables with.\n\nThe contents of the target Secret's Data field will represent the key-value pairs as environment variables.",
                              properties: {
                                name: {
                                  description:
                                    "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                  type: ["string", "null"],
                                },
                                optional: {
                                  description:
                                    "Specify whether the Secret must be defined",
                                  type: ["boolean", "null"],
                                },
                              },
                              type: ["object", "null"],
                            },
                          },
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                      },
                      image: {
                        description:
                          "Container image name. More info: https://kubernetes.io/docs/concepts/containers/images This field is optional to allow higher level config management to default or override container images in workload controllers like Deployments and StatefulSets.",
                        type: ["string", "null"],
                      },
                      imagePullPolicy: {
                        description:
                          "Image pull policy. One of Always, Never, IfNotPresent. Defaults to Always if :latest tag is specified, or IfNotPresent otherwise. Cannot be updated. More info: https://kubernetes.io/docs/concepts/containers/images#updating-images\n\n",
                        type: ["string", "null"],
                      },
                      lifecycle: {
                        description:
                          "Lifecycle describes actions that the management system should take in response to container lifecycle events. For the PostStart and PreStop lifecycle handlers, management of the container blocks until the action is complete, unless the container process fails, in which case the handler is aborted.",
                        properties: {
                          postStart: {
                            description:
                              "LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.",
                            properties: {
                              exec: {
                                description:
                                  'ExecAction describes a "run in container" action.',
                                properties: {
                                  command: {
                                    description:
                                      "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                },
                                type: ["object", "null"],
                              },
                              httpGet: {
                                description:
                                  "HTTPGetAction describes an action based on HTTP Get requests.",
                                properties: {
                                  host: {
                                    description:
                                      'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                    type: ["string", "null"],
                                  },
                                  httpHeaders: {
                                    description:
                                      "Custom headers to set in the request. HTTP allows repeated headers.",
                                    items: {
                                      description:
                                        "HTTPHeader describes a custom header to be used in HTTP probes",
                                      properties: {
                                        name: {
                                          description: "The header field name",
                                          type: "string",
                                        },
                                        value: {
                                          description: "The header field value",
                                          type: "string",
                                        },
                                      },
                                      required: ["name", "value"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  path: {
                                    description:
                                      "Path to access on the HTTP server.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                  scheme: {
                                    description:
                                      "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                    type: ["string", "null"],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                              tcpSocket: {
                                description:
                                  "TCPSocketAction describes an action based on opening a socket",
                                properties: {
                                  host: {
                                    description:
                                      "Optional: Host name to connect to, defaults to the pod IP.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          preStop: {
                            description:
                              "LifecycleHandler defines a specific action that should be taken in a lifecycle hook. One and only one of the fields, except TCPSocket must be specified.",
                            properties: {
                              exec: {
                                description:
                                  'ExecAction describes a "run in container" action.',
                                properties: {
                                  command: {
                                    description:
                                      "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                },
                                type: ["object", "null"],
                              },
                              httpGet: {
                                description:
                                  "HTTPGetAction describes an action based on HTTP Get requests.",
                                properties: {
                                  host: {
                                    description:
                                      'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                    type: ["string", "null"],
                                  },
                                  httpHeaders: {
                                    description:
                                      "Custom headers to set in the request. HTTP allows repeated headers.",
                                    items: {
                                      description:
                                        "HTTPHeader describes a custom header to be used in HTTP probes",
                                      properties: {
                                        name: {
                                          description: "The header field name",
                                          type: "string",
                                        },
                                        value: {
                                          description: "The header field value",
                                          type: "string",
                                        },
                                      },
                                      required: ["name", "value"],
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  path: {
                                    description:
                                      "Path to access on the HTTP server.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                  scheme: {
                                    description:
                                      "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                    type: ["string", "null"],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                              tcpSocket: {
                                description:
                                  "TCPSocketAction describes an action based on opening a socket",
                                properties: {
                                  host: {
                                    description:
                                      "Optional: Host name to connect to, defaults to the pod IP.",
                                    type: ["string", "null"],
                                  },
                                  port: {
                                    oneOf: [
                                      {
                                        type: ["string", "null"],
                                      },
                                      {
                                        type: ["integer", "null"],
                                      },
                                    ],
                                  },
                                },
                                required: ["port"],
                                type: ["object", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      livenessProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      name: {
                        description:
                          "Name of the container specified as a DNS_LABEL. Each container in a pod must have a unique name (DNS_LABEL). Cannot be updated.",
                        type: "string",
                      },
                      ports: {
                        description:
                          'List of ports to expose from the container. Exposing a port here gives the system additional information about the network connections a container uses, but is primarily informational. Not specifying a port here DOES NOT prevent that port from being exposed. Any port which is listening on the default "0.0.0.0" address inside a container will be accessible from the network. Cannot be updated.',
                        items: {
                          description:
                            "ContainerPort represents a network port in a single container.",
                          properties: {
                            containerPort: {
                              description:
                                "Number of port to expose on the pod's IP address. This must be a valid port number, 0 < x < 65536.",
                              format: "int32",
                              type: "integer",
                            },
                            hostIP: {
                              description:
                                "What host IP to bind the external port to.",
                              type: ["string", "null"],
                            },
                            hostPort: {
                              description:
                                "Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If HostNetwork is specified, this must match ContainerPort. Most containers do not need this.",
                              format: "int32",
                              type: ["integer", "null"],
                            },
                            name: {
                              description:
                                "If specified, this must be an IANA_SVC_NAME and unique within the pod. Each named port in a pod must have a unique name. Name for the port that can be referred to by services.",
                              type: ["string", "null"],
                            },
                            protocol: {
                              description:
                                'Protocol for port. Must be UDP, TCP, or SCTP. Defaults to "TCP".\n\n',
                              type: ["string", "null"],
                            },
                          },
                          required: ["containerPort"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-list-map-keys": [
                          "containerPort",
                          "protocol",
                        ],
                        "x-kubernetes-list-type": "map",
                        "x-kubernetes-patch-merge-key": "containerPort",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      readinessProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      resources: {
                        description:
                          "ResourceRequirements describes the compute resource requirements.",
                        properties: {
                          limits: {
                            additionalProperties: {
                              oneOf: [
                                {
                                  type: ["string", "null"],
                                },
                                {
                                  type: ["number", "null"],
                                },
                              ],
                            },
                            description:
                              "Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                            type: ["object", "null"],
                          },
                          requests: {
                            additionalProperties: {
                              oneOf: [
                                {
                                  type: ["string", "null"],
                                },
                                {
                                  type: ["number", "null"],
                                },
                              ],
                            },
                            description:
                              "Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      securityContext: {
                        description:
                          "SecurityContext holds security configuration that will be applied to a container. Some fields are present in both SecurityContext and PodSecurityContext.  When both are set, the values in SecurityContext take precedence.",
                        properties: {
                          allowPrivilegeEscalation: {
                            description:
                              "AllowPrivilegeEscalation controls whether a process can gain more privileges than its parent process. This bool directly controls if the no_new_privs flag will be set on the container process. AllowPrivilegeEscalation is true always when the container is: 1) run as Privileged 2) has CAP_SYS_ADMIN Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          capabilities: {
                            description:
                              "Adds and removes POSIX capabilities from running containers.",
                            properties: {
                              add: {
                                description: "Added capabilities",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                              drop: {
                                description: "Removed capabilities",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          privileged: {
                            description:
                              "Run container in privileged mode. Processes in privileged containers are essentially equivalent to root on the host. Defaults to false. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          procMount: {
                            description:
                              "procMount denotes the type of proc mount to use for the containers. The default is DefaultProcMount which uses the container runtime defaults for readonly paths and masked paths. This requires the ProcMountType feature flag to be enabled. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["string", "null"],
                          },
                          readOnlyRootFilesystem: {
                            description:
                              "Whether this container has a read-only root filesystem. Default is false. Note that this field cannot be set when spec.os.name is windows.",
                            type: ["boolean", "null"],
                          },
                          runAsGroup: {
                            description:
                              "The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          runAsNonRoot: {
                            description:
                              "Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
                            type: ["boolean", "null"],
                          },
                          runAsUser: {
                            description:
                              "The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in PodSecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence. Note that this field cannot be set when spec.os.name is windows.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          seLinuxOptions: {
                            description:
                              "SELinuxOptions are the labels to be applied to the container",
                            properties: {
                              level: {
                                description:
                                  "Level is SELinux level label that applies to the container.",
                                type: ["string", "null"],
                              },
                              role: {
                                description:
                                  "Role is a SELinux role label that applies to the container.",
                                type: ["string", "null"],
                              },
                              type: {
                                description:
                                  "Type is a SELinux type label that applies to the container.",
                                type: ["string", "null"],
                              },
                              user: {
                                description:
                                  "User is a SELinux user label that applies to the container.",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          seccompProfile: {
                            description:
                              "SeccompProfile defines a pod/container's seccomp profile settings. Only one profile source may be set.",
                            properties: {
                              localhostProfile: {
                                description:
                                  'localhostProfile indicates a profile defined in a file on the node should be used. The profile must be preconfigured on the node to work. Must be a descending path, relative to the kubelet\'s configured seccomp profile location. Must only be set if type is "Localhost".',
                                type: ["string", "null"],
                              },
                              type: {
                                description:
                                  "type indicates which kind of seccomp profile will be applied. Valid options are:\n\nLocalhost - a profile defined in a file on the node should be used. RuntimeDefault - the container runtime default profile should be used. Unconfined - no profile should be applied.\n\n",
                                type: "string",
                              },
                            },
                            required: ["type"],
                            type: ["object", "null"],
                            "x-kubernetes-unions": [
                              {
                                discriminator: "type",
                                "fields-to-discriminateBy": {
                                  localhostProfile: "LocalhostProfile",
                                },
                              },
                            ],
                          },
                          windowsOptions: {
                            description:
                              "WindowsSecurityContextOptions contain Windows-specific options and credentials.",
                            properties: {
                              gmsaCredentialSpec: {
                                description:
                                  "GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.",
                                type: ["string", "null"],
                              },
                              gmsaCredentialSpecName: {
                                description:
                                  "GMSACredentialSpecName is the name of the GMSA credential spec to use.",
                                type: ["string", "null"],
                              },
                              hostProcess: {
                                description:
                                  "HostProcess determines if a container should be run as a 'Host Process' container. This field is alpha-level and will only be honored by components that enable the WindowsHostProcessContainers feature flag. Setting this field without the feature flag will result in errors when validating the Pod. All of a Pod's containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).  In addition, if HostProcess is true then HostNetwork must also be set to true.",
                                type: ["boolean", "null"],
                              },
                              runAsUserName: {
                                description:
                                  "The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      startupProbe: {
                        description:
                          "Probe describes a health check to be performed against a container to determine whether it is alive or ready to receive traffic.",
                        properties: {
                          exec: {
                            description:
                              'ExecAction describes a "run in container" action.',
                            properties: {
                              command: {
                                description:
                                  "Command is the command line to execute inside the container, the working directory for the command  is root ('/') in the container's filesystem. The command is simply exec'd, it is not run inside a shell, so traditional shell instructions ('|', etc) won't work. To use a shell, you need to explicitly call out to that shell. Exit status of 0 is treated as live/healthy and non-zero is unhealthy.",
                                items: {
                                  type: ["string", "null"],
                                },
                                type: ["array", "null"],
                              },
                            },
                            type: ["object", "null"],
                          },
                          failureThreshold: {
                            description:
                              "Minimum consecutive failures for the probe to be considered failed after having succeeded. Defaults to 3. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          grpc: {
                            properties: {
                              port: {
                                description:
                                  "Port number of the gRPC service. Number must be in the range 1 to 65535.",
                                format: "int32",
                                type: "integer",
                              },
                              service: {
                                description:
                                  "Service is the name of the service to place in the gRPC HealthCheckRequest (see https://github.com/grpc/grpc/blob/master/doc/health-checking.md).\n\nIf this is not specified, the default behavior is defined by gRPC.",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          httpGet: {
                            description:
                              "HTTPGetAction describes an action based on HTTP Get requests.",
                            properties: {
                              host: {
                                description:
                                  'Host name to connect to, defaults to the pod IP. You probably want to set "Host" in httpHeaders instead.',
                                type: ["string", "null"],
                              },
                              httpHeaders: {
                                description:
                                  "Custom headers to set in the request. HTTP allows repeated headers.",
                                items: {
                                  description:
                                    "HTTPHeader describes a custom header to be used in HTTP probes",
                                  properties: {
                                    name: {
                                      description: "The header field name",
                                      type: "string",
                                    },
                                    value: {
                                      description: "The header field value",
                                      type: "string",
                                    },
                                  },
                                  required: ["name", "value"],
                                  type: ["object", "null"],
                                },
                                type: ["array", "null"],
                              },
                              path: {
                                description:
                                  "Path to access on the HTTP server.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                              scheme: {
                                description:
                                  "Scheme to use for connecting to the host. Defaults to HTTP.\n\n",
                                type: ["string", "null"],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          initialDelaySeconds: {
                            description:
                              "Number of seconds after the container has started before liveness probes are initiated. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          periodSeconds: {
                            description:
                              "How often (in seconds) to perform the probe. Default to 10 seconds. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          successThreshold: {
                            description:
                              "Minimum consecutive successes for the probe to be considered successful after having failed. Defaults to 1. Must be 1 for liveness and startup. Minimum value is 1.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          tcpSocket: {
                            description:
                              "TCPSocketAction describes an action based on opening a socket",
                            properties: {
                              host: {
                                description:
                                  "Optional: Host name to connect to, defaults to the pod IP.",
                                type: ["string", "null"],
                              },
                              port: {
                                oneOf: [
                                  {
                                    type: ["string", "null"],
                                  },
                                  {
                                    type: ["integer", "null"],
                                  },
                                ],
                              },
                            },
                            required: ["port"],
                            type: ["object", "null"],
                          },
                          terminationGracePeriodSeconds: {
                            description:
                              "Optional duration in seconds the pod needs to terminate gracefully upon probe failure. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. If this value is nil, the pod's terminationGracePeriodSeconds will be used. Otherwise, this value overrides the value provided by the pod spec. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). This is a beta field and requires enabling ProbeTerminationGracePeriod feature gate. Minimum value is 1. spec.terminationGracePeriodSeconds is used if unset.",
                            format: "int64",
                            type: ["integer", "null"],
                          },
                          timeoutSeconds: {
                            description:
                              "Number of seconds after which the probe times out. Defaults to 1 second. Minimum value is 1. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle#container-probes",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      stdin: {
                        description:
                          "Whether this container should allocate a buffer for stdin in the container runtime. If this is not set, reads from stdin in the container will always result in EOF. Default is false.",
                        type: ["boolean", "null"],
                      },
                      stdinOnce: {
                        description:
                          "Whether the container runtime should close the stdin channel after it has been opened by a single attach. When stdin is true the stdin stream will remain open across multiple attach sessions. If stdinOnce is set to true, stdin is opened on container start, is empty until the first client attaches to stdin, and then remains open and accepts data until the client disconnects, at which time stdin is closed and remains closed until the container is restarted. If this flag is false, a container processes that reads from stdin will never receive an EOF. Default is false",
                        type: ["boolean", "null"],
                      },
                      terminationMessagePath: {
                        description:
                          "Optional: Path at which the file to which the container's termination message will be written is mounted into the container's filesystem. Message written is intended to be brief final status, such as an assertion failure message. Will be truncated by the node if greater than 4096 bytes. The total message length across all containers will be limited to 12kb. Defaults to /dev/termination-log. Cannot be updated.",
                        type: ["string", "null"],
                      },
                      terminationMessagePolicy: {
                        description:
                          "Indicate how the termination message should be populated. File will use the contents of terminationMessagePath to populate the container status message on both success and failure. FallbackToLogsOnError will use the last chunk of container log output if the termination message file is empty and the container exited with an error. The log output is limited to 2048 bytes or 80 lines, whichever is smaller. Defaults to File. Cannot be updated.\n\n",
                        type: ["string", "null"],
                      },
                      tty: {
                        description:
                          "Whether this container should allocate a TTY for itself, also requires 'stdin' to be true. Default is false.",
                        type: ["boolean", "null"],
                      },
                      volumeDevices: {
                        description:
                          "volumeDevices is the list of block devices to be used by the container.",
                        items: {
                          description:
                            "volumeDevice describes a mapping of a raw block device within a container.",
                          properties: {
                            devicePath: {
                              description:
                                "devicePath is the path inside of the container that the device will be mapped to.",
                              type: "string",
                            },
                            name: {
                              description:
                                "name must match the name of a persistentVolumeClaim in the pod",
                              type: "string",
                            },
                          },
                          required: ["name", "devicePath"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "devicePath",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      volumeMounts: {
                        description:
                          "Pod volumes to mount into the container's filesystem. Cannot be updated.",
                        items: {
                          description:
                            "VolumeMount describes a mounting of a Volume within a container.",
                          properties: {
                            mountPath: {
                              description:
                                "Path within the container at which the volume should be mounted.  Must not contain ':'.",
                              type: "string",
                            },
                            mountPropagation: {
                              description:
                                "mountPropagation determines how mounts are propagated from the host to container and the other way around. When not set, MountPropagationNone is used. This field is beta in 1.10.",
                              type: ["string", "null"],
                            },
                            name: {
                              description:
                                "This must match the Name of a Volume.",
                              type: "string",
                            },
                            readOnly: {
                              description:
                                "Mounted read-only if true, read-write otherwise (false or unspecified). Defaults to false.",
                              type: ["boolean", "null"],
                            },
                            subPath: {
                              description:
                                "Path within the volume from which the container's volume should be mounted. Defaults to \"\" (volume's root).",
                              type: ["string", "null"],
                            },
                            subPathExpr: {
                              description:
                                "Expanded path within the volume from which the container's volume should be mounted. Behaves similarly to SubPath but environment variable references $(VAR_NAME) are expanded using the container's environment. Defaults to \"\" (volume's root). SubPathExpr and SubPath are mutually exclusive.",
                              type: ["string", "null"],
                            },
                          },
                          required: ["name", "mountPath"],
                          type: ["object", "null"],
                        },
                        type: ["array", "null"],
                        "x-kubernetes-patch-merge-key": "mountPath",
                        "x-kubernetes-patch-strategy": "merge",
                      },
                      workingDir: {
                        description:
                          "Container's working directory. If not specified, the container runtime's default will be used, which might be configured in the container image. Cannot be updated.",
                        type: ["string", "null"],
                      },
                    },
                    required: ["name"],
                    type: ["object", "null"],
                  },
                  type: ["array", "null"],
                  "x-kubernetes-patch-merge-key": "name",
                  "x-kubernetes-patch-strategy": "merge",
                },
                nodeName: {
                  description:
                    "NodeName is a request to schedule this pod onto a specific node. If it is non-empty, the scheduler simply schedules this pod onto that node, assuming that it fits resource requirements.",
                  type: ["string", "null"],
                },
                nodeSelector: {
                  additionalProperties: {
                    type: ["string", "null"],
                  },
                  description:
                    "NodeSelector is a selector which must be true for the pod to fit on a node. Selector which must match a node's labels for the pod to be scheduled on that node. More info: https://kubernetes.io/docs/concepts/configuration/assign-pod-node/",
                  type: ["object", "null"],
                  "x-kubernetes-map-type": "atomic",
                },
                os: {
                  description: "PodOS defines the OS parameters of a pod.",
                  properties: {
                    name: {
                      description:
                        "Name is the name of the operating system. The currently supported values are linux and windows. Additional value may be defined in future and can be one of: https://github.com/opencontainers/runtime-spec/blob/master/config.md#platform-specific-configuration Clients should expect to handle additional values and treat unrecognized values in this field as os: null",
                      type: "string",
                    },
                  },
                  required: ["name"],
                  type: ["object", "null"],
                },
                overhead: {
                  additionalProperties: {
                    oneOf: [
                      {
                        type: ["string", "null"],
                      },
                      {
                        type: ["number", "null"],
                      },
                    ],
                  },
                  description:
                    "Overhead represents the resource overhead associated with running a pod for a given RuntimeClass. This field will be autopopulated at admission time by the RuntimeClass admission controller. If the RuntimeClass admission controller is enabled, overhead must not be set in Pod create requests. The RuntimeClass admission controller will reject Pod create requests which have the overhead already set. If RuntimeClass is configured and selected in the PodSpec, Overhead will be set to the value defined in the corresponding RuntimeClass, otherwise it will remain unset and treated as zero. More info: https://git.k8s.io/enhancements/keps/sig-node/688-pod-overhead/README.md",
                  type: ["object", "null"],
                },
                preemptionPolicy: {
                  description:
                    "PreemptionPolicy is the Policy for preempting pods with lower priority. One of Never, PreemptLowerPriority. Defaults to PreemptLowerPriority if unset.",
                  type: ["string", "null"],
                },
                priority: {
                  description:
                    "The priority value. Various system components use this field to find the priority of the pod. When Priority Admission Controller is enabled, it prevents users from setting this field. The admission controller populates this field from PriorityClassName. The higher the value, the higher the priority.",
                  format: "int32",
                  type: ["integer", "null"],
                },
                priorityClassName: {
                  description:
                    'If specified, indicates the pod\'s priority. "system-node-critical" and "system-cluster-critical" are two special keywords which indicate the highest priorities with the former being the highest priority. Any other name must be defined by creating a PriorityClass object with that name. If not specified, the pod priority will be default or zero if there is no default.',
                  type: ["string", "null"],
                },
                readinessGates: {
                  description:
                    'If specified, all readiness gates will be evaluated for pod readiness. A pod is ready when all its containers are ready AND all conditions specified in the readiness gates have status equal to "True" More info: https://git.k8s.io/enhancements/keps/sig-network/580-pod-readiness-gates',
                  items: {
                    description:
                      "PodReadinessGate contains the reference to a pod condition",
                    properties: {
                      conditionType: {
                        description:
                          "ConditionType refers to a condition in the pod's condition list with matching type.",
                        type: "string",
                      },
                    },
                    required: ["conditionType"],
                    type: ["object", "null"],
                  },
                  type: ["array", "null"],
                },
                restartPolicy: {
                  description:
                    "Restart policy for all containers within the pod. One of Always, OnFailure, Never. Default to Always. More info: https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#restart-policy\n\n",
                  type: ["string", "null"],
                },
                runtimeClassName: {
                  description:
                    'RuntimeClassName refers to a RuntimeClass object in the node.k8s.io group, which should be used to run this pod.  If no RuntimeClass resource matches the named class, the pod will not be run. If unset or empty, the "legacy" RuntimeClass will be used, which is an implicit class with an empty definition that uses the default runtime handler. More info: https://git.k8s.io/enhancements/keps/sig-node/585-runtime-class',
                  type: ["string", "null"],
                },
                schedulerName: {
                  description:
                    "If specified, the pod will be dispatched by specified scheduler. If not specified, the pod will be dispatched by default scheduler.",
                  type: ["string", "null"],
                },
                securityContext: {
                  description:
                    "PodSecurityContext holds pod-level security attributes and common container settings. Some fields are also present in container.securityContext.  Field values of container.securityContext take precedence over field values of PodSecurityContext.",
                  properties: {
                    fsGroup: {
                      description:
                        "A special supplemental group that applies to all containers in a pod. Some volume types allow the Kubelet to change the ownership of that volume to be owned by the pod:\n\n1. The owning GID will be the FSGroup 2. The setgid bit is set (new files created in the volume will be owned by FSGroup) 3. The permission bits are OR'd with rw-rw----\n\nIf unset, the Kubelet will not modify the ownership and permissions of any volume. Note that this field cannot be set when spec.os.name is windows.",
                      format: "int64",
                      type: ["integer", "null"],
                    },
                    fsGroupChangePolicy: {
                      description:
                        'fsGroupChangePolicy defines behavior of changing ownership and permission of the volume before being exposed inside Pod. This field will only apply to volume types which support fsGroup based ownership(and permissions). It will have no effect on ephemeral volume types such as: secret, configmaps and emptydir. Valid values are "OnRootMismatch" and "Always". If not specified, "Always" is used. Note that this field cannot be set when spec.os.name is windows.',
                      type: ["string", "null"],
                    },
                    runAsGroup: {
                      description:
                        "The GID to run the entrypoint of the container process. Uses runtime default if unset. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.",
                      format: "int64",
                      type: ["integer", "null"],
                    },
                    runAsNonRoot: {
                      description:
                        "Indicates that the container must run as a non-root user. If true, the Kubelet will validate the image at runtime to ensure that it does not run as UID 0 (root) and fail to start the container if it does. If unset or false, no such validation will be performed. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
                      type: ["boolean", "null"],
                    },
                    runAsUser: {
                      description:
                        "The UID to run the entrypoint of the container process. Defaults to user specified in image metadata if unspecified. May also be set in SecurityContext.  If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence for that container. Note that this field cannot be set when spec.os.name is windows.",
                      format: "int64",
                      type: ["integer", "null"],
                    },
                    seLinuxOptions: {
                      description:
                        "SELinuxOptions are the labels to be applied to the container",
                      properties: {
                        level: {
                          description:
                            "Level is SELinux level label that applies to the container.",
                          type: ["string", "null"],
                        },
                        role: {
                          description:
                            "Role is a SELinux role label that applies to the container.",
                          type: ["string", "null"],
                        },
                        type: {
                          description:
                            "Type is a SELinux type label that applies to the container.",
                          type: ["string", "null"],
                        },
                        user: {
                          description:
                            "User is a SELinux user label that applies to the container.",
                          type: ["string", "null"],
                        },
                      },
                      type: ["object", "null"],
                    },
                    seccompProfile: {
                      description:
                        "SeccompProfile defines a pod/container's seccomp profile settings. Only one profile source may be set.",
                      properties: {
                        localhostProfile: {
                          description:
                            'localhostProfile indicates a profile defined in a file on the node should be used. The profile must be preconfigured on the node to work. Must be a descending path, relative to the kubelet\'s configured seccomp profile location. Must only be set if type is "Localhost".',
                          type: ["string", "null"],
                        },
                        type: {
                          description:
                            "type indicates which kind of seccomp profile will be applied. Valid options are:\n\nLocalhost - a profile defined in a file on the node should be used. RuntimeDefault - the container runtime default profile should be used. Unconfined - no profile should be applied.\n\n",
                          type: "string",
                        },
                      },
                      required: ["type"],
                      type: ["object", "null"],
                      "x-kubernetes-unions": [
                        {
                          discriminator: "type",
                          "fields-to-discriminateBy": {
                            localhostProfile: "LocalhostProfile",
                          },
                        },
                      ],
                    },
                    supplementalGroups: {
                      description:
                        "A list of groups applied to the first process run in each container, in addition to the container's primary GID.  If unspecified, no groups will be added to any container. Note that this field cannot be set when spec.os.name is windows.",
                      items: {
                        format: "int64",
                        type: ["integer", "null"],
                      },
                      type: ["array", "null"],
                    },
                    sysctls: {
                      description:
                        "Sysctls hold a list of namespaced sysctls used for the pod. Pods with unsupported sysctls (by the container runtime) might fail to launch. Note that this field cannot be set when spec.os.name is windows.",
                      items: {
                        description:
                          "Sysctl defines a kernel parameter to be set",
                        properties: {
                          name: {
                            description: "Name of a property to set",
                            type: "string",
                          },
                          value: {
                            description: "Value of a property to set",
                            type: "string",
                          },
                        },
                        required: ["name", "value"],
                        type: ["object", "null"],
                      },
                      type: ["array", "null"],
                    },
                    windowsOptions: {
                      description:
                        "WindowsSecurityContextOptions contain Windows-specific options and credentials.",
                      properties: {
                        gmsaCredentialSpec: {
                          description:
                            "GMSACredentialSpec is where the GMSA admission webhook (https://github.com/kubernetes-sigs/windows-gmsa) inlines the contents of the GMSA credential spec named by the GMSACredentialSpecName field.",
                          type: ["string", "null"],
                        },
                        gmsaCredentialSpecName: {
                          description:
                            "GMSACredentialSpecName is the name of the GMSA credential spec to use.",
                          type: ["string", "null"],
                        },
                        hostProcess: {
                          description:
                            "HostProcess determines if a container should be run as a 'Host Process' container. This field is alpha-level and will only be honored by components that enable the WindowsHostProcessContainers feature flag. Setting this field without the feature flag will result in errors when validating the Pod. All of a Pod's containers must have the same effective HostProcess value (it is not allowed to have a mix of HostProcess containers and non-HostProcess containers).  In addition, if HostProcess is true then HostNetwork must also be set to true.",
                          type: ["boolean", "null"],
                        },
                        runAsUserName: {
                          description:
                            "The UserName in Windows to run the entrypoint of the container process. Defaults to the user specified in image metadata if unspecified. May also be set in PodSecurityContext. If set in both SecurityContext and PodSecurityContext, the value specified in SecurityContext takes precedence.",
                          type: ["string", "null"],
                        },
                      },
                      type: ["object", "null"],
                    },
                  },
                  type: ["object", "null"],
                },
                serviceAccount: {
                  description:
                    "DeprecatedServiceAccount is a depreciated alias for ServiceAccountName. Deprecated: Use serviceAccountName instead.",
                  type: ["string", "null"],
                },
                serviceAccountName: {
                  description:
                    "ServiceAccountName is the name of the ServiceAccount to use to run this pod. More info: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/",
                  type: ["string", "null"],
                },
                setHostnameAsFQDN: {
                  description:
                    "If true the pod's hostname will be configured as the pod's FQDN, rather than the leaf name (the default). In Linux containers, this means setting the FQDN in the hostname field of the kernel (the nodename field of struct utsname). In Windows containers, this means setting the registry value of hostname for the registry key HKEY_LOCAL_MACHINE\\SYSTEM\\CurrentControlSet\\Services\\Tcpip\\Parameters to FQDN. If a pod does not have FQDN, this has no effect. Default to false.",
                  type: ["boolean", "null"],
                },
                shareProcessNamespace: {
                  description:
                    "Share a single process namespace between all of the containers in a pod. When this is set containers will be able to view and signal processes from other containers in the same pod, and the first process in each container will not be assigned PID 1. HostPID and ShareProcessNamespace cannot both be set. Optional: Default to false.",
                  type: ["boolean", "null"],
                },
                subdomain: {
                  description:
                    'If specified, the fully qualified Pod hostname will be "<hostname>.<subdomain>.<pod namespace>.svc.<cluster domain>". If not specified, the pod will not have a domainname at all.',
                  type: ["string", "null"],
                },
                terminationGracePeriodSeconds: {
                  description:
                    "Optional duration in seconds the pod needs to terminate gracefully. May be decreased in delete request. Value must be non-negative integer. The value zero indicates stop immediately via the kill signal (no opportunity to shut down). If this value is nil, the default grace period will be used instead. The grace period is the duration in seconds after the processes running in the pod are sent a termination signal and the time when the processes are forcibly halted with a kill signal. Set this value longer than the expected cleanup time for your process. Defaults to 30 seconds.",
                  format: "int64",
                  type: ["integer", "null"],
                },
                tolerations: {
                  description: "If specified, the pod's tolerations.",
                  items: {
                    description:
                      "The pod this Toleration is attached to tolerates any taint that matches the triple <key,value,effect> using the matching operator <operator>.",
                    properties: {
                      effect: {
                        description:
                          "Effect indicates the taint effect to match. Empty means match all taint effects. When specified, allowed values are NoSchedule, PreferNoSchedule and NoExecute.\n\n",
                        type: ["string", "null"],
                      },
                      key: {
                        description:
                          "Key is the taint key that the toleration applies to. Empty means match all taint keys. If the key is empty, operator must be Exists; this combination means to match all values and all keys.",
                        type: ["string", "null"],
                      },
                      operator: {
                        description:
                          "Operator represents a key's relationship to the value. Valid operators are Exists and Equal. Defaults to Equal. Exists is equivalent to wildcard for value, so that a pod can tolerate all taints of a particular category.\n\n",
                        type: ["string", "null"],
                      },
                      tolerationSeconds: {
                        description:
                          "TolerationSeconds represents the period of time the toleration (which must be of effect NoExecute, otherwise this field is ignored) tolerates the taint. By default, it is not set, which means tolerate the taint forever (do not evict). Zero and negative values will be treated as 0 (evict immediately) by the system.",
                        format: "int64",
                        type: ["integer", "null"],
                      },
                      value: {
                        description:
                          "Value is the taint value the toleration matches to. If the operator is Exists, the value should be empty, otherwise just a regular string.",
                        type: ["string", "null"],
                      },
                    },
                    type: ["object", "null"],
                  },
                  type: ["array", "null"],
                },
                topologySpreadConstraints: {
                  description:
                    "TopologySpreadConstraints describes how a group of pods ought to spread across topology domains. Scheduler will schedule pods in a way which abides by the constraints. All topologySpreadConstraints are ANDed.",
                  items: {
                    description:
                      "TopologySpreadConstraint specifies how to spread matching pods among the given topology.",
                    properties: {
                      labelSelector: {
                        description:
                          "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                        properties: {
                          matchExpressions: {
                            description:
                              "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                            items: {
                              description:
                                "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                              properties: {
                                key: {
                                  description:
                                    "key is the label key that the selector applies to.",
                                  type: "string",
                                  "x-kubernetes-patch-merge-key": "key",
                                  "x-kubernetes-patch-strategy": "merge",
                                },
                                operator: {
                                  description:
                                    "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                  type: "string",
                                },
                                values: {
                                  description:
                                    "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                  items: {
                                    type: ["string", "null"],
                                  },
                                  type: ["array", "null"],
                                },
                              },
                              required: ["key", "operator"],
                              type: ["object", "null"],
                            },
                            type: ["array", "null"],
                          },
                          matchLabels: {
                            additionalProperties: {
                              type: ["string", "null"],
                            },
                            description:
                              'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                        "x-kubernetes-map-type": "atomic",
                      },
                      maxSkew: {
                        description:
                          "MaxSkew describes the degree to which pods may be unevenly distributed. When `whenUnsatisfiable=DoNotSchedule`, it is the maximum permitted difference between the number of matching pods in the target topology and the global minimum. The global minimum is the minimum number of matching pods in an eligible domain or zero if the number of eligible domains is less than MinDomains. For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same labelSelector spread as 2/2/1: In this case, the global minimum is 1. | zone1 | zone2 | zone3 | |  P P  |  P P  |   P   | - if MaxSkew is 1, incoming pod can only be scheduled to zone3 to become 2/2/2; scheduling it onto zone1(zone2) would make the ActualSkew(3-1) on zone1(zone2) violate MaxSkew(1). - if MaxSkew is 2, incoming pod can be scheduled onto any zone. When `whenUnsatisfiable=ScheduleAnyway`, it is used to give higher precedence to topologies that satisfy it. It's a required field. Default value is 1 and 0 is not allowed.",
                        format: "int32",
                        type: "integer",
                      },
                      minDomains: {
                        description:
                          'MinDomains indicates a minimum number of eligible domains. When the number of eligible domains with matching topology keys is less than minDomains, Pod Topology Spread treats "global minimum" as 0, and then the calculation of Skew is performed. And when the number of eligible domains with matching topology keys equals or greater than minDomains, this value has no effect on scheduling. As a result, when the number of eligible domains is less than minDomains, scheduler won\'t schedule more than maxSkew Pods to those domains. If value is nil, the constraint behaves as if MinDomains is equal to 1. Valid values are integers greater than 0. When value is not nil, WhenUnsatisfiable must be DoNotSchedule.\n\nFor example, in a 3-zone cluster, MaxSkew is set to 2, MinDomains is set to 5 and pods with the same labelSelector spread as 2/2/2: | zone1 | zone2 | zone3 | |  P P  |  P P  |  P P  | The number of domains is less than 5(MinDomains), so "global minimum" is treated as 0. In this situation, new pod with the same labelSelector cannot be scheduled, because computed skew will be 3(3 - 0) if new Pod is scheduled to any of the three zones, it will violate MaxSkew.\n\nThis is an alpha field and requires enabling MinDomainsInPodTopologySpread feature gate.',
                        format: "int32",
                        type: ["integer", "null"],
                      },
                      topologyKey: {
                        description:
                          'TopologyKey is the key of node labels. Nodes that have a label with this key and identical values are considered to be in the same topology. We consider each <key, value> as a "bucket", and try to put balanced number of pods into each bucket. We define a domain as a particular instance of a topology. Also, we define an eligible domain as a domain whose nodes match the node selector. e.g. If TopologyKey is "kubernetes.io/hostname", each Node is a domain of that topology. And, if TopologyKey is "topology.kubernetes.io/zone", each zone is a domain of that topology. It\'s a required field.',
                        type: "string",
                      },
                      whenUnsatisfiable: {
                        description:
                          'WhenUnsatisfiable indicates how to deal with a pod if it doesn\'t satisfy the spread constraint. - DoNotSchedule (default) tells the scheduler not to schedule it. - ScheduleAnyway tells the scheduler to schedule the pod in any location,\n  but giving higher precedence to topologies that would help reduce the\n  skew.\nA constraint is considered "Unsatisfiable" for an incoming pod if and only if every possible node assignment for that pod would violate "MaxSkew" on some topology. For example, in a 3-zone cluster, MaxSkew is set to 1, and pods with the same labelSelector spread as 3/1/1: | zone1 | zone2 | zone3 | | P P P |   P   |   P   | If WhenUnsatisfiable is set to DoNotSchedule, incoming pod can only be scheduled to zone2(zone3) to become 3/2/1(3/1/2) as ActualSkew(2-1) on zone2(zone3) satisfies MaxSkew(1). In other words, the cluster can still be imbalanced, but scheduler won\'t make it *more* imbalanced. It\'s a required field.\n\n',
                        type: "string",
                      },
                    },
                    required: ["maxSkew", "topologyKey", "whenUnsatisfiable"],
                    type: ["object", "null"],
                  },
                  type: ["array", "null"],
                  "x-kubernetes-list-map-keys": [
                    "topologyKey",
                    "whenUnsatisfiable",
                  ],
                  "x-kubernetes-list-type": "map",
                  "x-kubernetes-patch-merge-key": "topologyKey",
                  "x-kubernetes-patch-strategy": "merge",
                },
                volumes: {
                  description:
                    "List of volumes that can be mounted by containers belonging to the pod. More info: https://kubernetes.io/docs/concepts/storage/volumes",
                  items: {
                    description:
                      "Volume represents a named volume in a pod that may be accessed by any container in the pod.",
                    properties: {
                      awsElasticBlockStore: {
                        description:
                          "Represents a Persistent Disk resource in AWS.\n\nAn AWS EBS disk must exist before mounting to a container. The disk must also be in the same AWS zone as the kubelet. An AWS EBS disk can only be mounted as read/write once. AWS EBS volumes support ownership management and SELinux relabeling.",
                        properties: {
                          fsType: {
                            description:
                              'fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore',
                            type: ["string", "null"],
                          },
                          partition: {
                            description:
                              'partition is the partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty).',
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly value true will force the readOnly setting in VolumeMounts. More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore",
                            type: ["boolean", "null"],
                          },
                          volumeID: {
                            description:
                              "volumeID is unique ID of the persistent disk resource in AWS (Amazon EBS volume). More info: https://kubernetes.io/docs/concepts/storage/volumes#awselasticblockstore",
                            type: "string",
                          },
                        },
                        required: ["volumeID"],
                        type: ["object", "null"],
                      },
                      azureDisk: {
                        description:
                          "AzureDisk represents an Azure Data Disk mount on the host and bind mount to the pod.",
                        properties: {
                          cachingMode: {
                            description:
                              "cachingMode is the Host Caching mode: None, Read Only, Read Write.",
                            type: ["string", "null"],
                          },
                          diskName: {
                            description:
                              "diskName is the Name of the data disk in the blob storage",
                            type: "string",
                          },
                          diskURI: {
                            description:
                              "diskURI is the URI of data disk in the blob storage",
                            type: "string",
                          },
                          fsType: {
                            description:
                              'fsType is Filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.',
                            type: ["string", "null"],
                          },
                          kind: {
                            description:
                              "kind expected values are Shared: multiple blob disks per storage account  Dedicated: single blob disk per storage account  Managed: azure managed data disk (only in managed availability set). defaults to shared",
                            type: ["string", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.",
                            type: ["boolean", "null"],
                          },
                        },
                        required: ["diskName", "diskURI"],
                        type: ["object", "null"],
                      },
                      azureFile: {
                        description:
                          "AzureFile represents an Azure File Service mount on the host and bind mount to the pod.",
                        properties: {
                          readOnly: {
                            description:
                              "readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.",
                            type: ["boolean", "null"],
                          },
                          secretName: {
                            description:
                              "secretName is the  name of secret that contains Azure Storage Account Name and Key",
                            type: "string",
                          },
                          shareName: {
                            description: "shareName is the azure share Name",
                            type: "string",
                          },
                        },
                        required: ["secretName", "shareName"],
                        type: ["object", "null"],
                      },
                      cephfs: {
                        description:
                          "Represents a Ceph Filesystem mount that lasts the lifetime of a pod Cephfs volumes do not support ownership management or SELinux relabeling.",
                        properties: {
                          monitors: {
                            description:
                              "monitors is Required: Monitors is a collection of Ceph monitors More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it",
                            items: {
                              type: ["string", "null"],
                            },
                            type: "array",
                          },
                          path: {
                            description:
                              "path is Optional: Used as the mounted root, rather than the full Ceph tree, default is /",
                            type: ["string", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly is Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it",
                            type: ["boolean", "null"],
                          },
                          secretFile: {
                            description:
                              "secretFile is Optional: SecretFile is the path to key ring for User, default is /etc/ceph/user.secret More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it",
                            type: ["string", "null"],
                          },
                          secretRef: {
                            description:
                              "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                            properties: {
                              name: {
                                description:
                                  "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                            "x-kubernetes-map-type": "atomic",
                          },
                          user: {
                            description:
                              "user is optional: User is the rados user name, default is admin More info: https://examples.k8s.io/volumes/cephfs/README.md#how-to-use-it",
                            type: ["string", "null"],
                          },
                        },
                        required: ["monitors"],
                        type: ["object", "null"],
                      },
                      cinder: {
                        description:
                          "Represents a cinder volume resource in Openstack. A Cinder volume must exist before mounting to a container. The volume must also be in the same region as the kubelet. Cinder volumes support ownership management and SELinux relabeling.",
                        properties: {
                          fsType: {
                            description:
                              'fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://examples.k8s.io/mysql-cinder-pd/README.md',
                            type: ["string", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts. More info: https://examples.k8s.io/mysql-cinder-pd/README.md",
                            type: ["boolean", "null"],
                          },
                          secretRef: {
                            description:
                              "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                            properties: {
                              name: {
                                description:
                                  "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                            "x-kubernetes-map-type": "atomic",
                          },
                          volumeID: {
                            description:
                              "volumeID used to identify the volume in cinder. More info: https://examples.k8s.io/mysql-cinder-pd/README.md",
                            type: "string",
                          },
                        },
                        required: ["volumeID"],
                        type: ["object", "null"],
                      },
                      configMap: {
                        description:
                          "Adapts a ConfigMap into a volume.\n\nThe contents of the target ConfigMap's Data field will be presented in a volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. ConfigMap volumes support ownership management and SELinux relabeling.",
                        properties: {
                          defaultMode: {
                            description:
                              "defaultMode is optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          items: {
                            description:
                              "items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.",
                            items: {
                              description:
                                "Maps a string key to a path within a volume.",
                              properties: {
                                key: {
                                  description: "key is the key to project.",
                                  type: "string",
                                },
                                mode: {
                                  description:
                                    "mode is Optional: mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                                  format: "int32",
                                  type: ["integer", "null"],
                                },
                                path: {
                                  description:
                                    "path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.",
                                  type: "string",
                                },
                              },
                              required: ["key", "path"],
                              type: ["object", "null"],
                            },
                            type: ["array", "null"],
                          },
                          name: {
                            description:
                              "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                            type: ["string", "null"],
                          },
                          optional: {
                            description:
                              "optional specify whether the ConfigMap or its keys must be defined",
                            type: ["boolean", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      csi: {
                        description:
                          "Represents a source location of a volume to mount, managed by an external CSI driver",
                        properties: {
                          driver: {
                            description:
                              "driver is the name of the CSI driver that handles this volume. Consult with your admin for the correct name as registered in the cluster.",
                            type: "string",
                          },
                          fsType: {
                            description:
                              'fsType to mount. Ex. "ext4", "xfs", "ntfs". If not provided, the empty value is passed to the associated CSI driver which will determine the default filesystem to apply.',
                            type: ["string", "null"],
                          },
                          nodePublishSecretRef: {
                            description:
                              "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                            properties: {
                              name: {
                                description:
                                  "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                            "x-kubernetes-map-type": "atomic",
                          },
                          readOnly: {
                            description:
                              "readOnly specifies a read-only configuration for the volume. Defaults to false (read/write).",
                            type: ["boolean", "null"],
                          },
                          volumeAttributes: {
                            additionalProperties: {
                              type: ["string", "null"],
                            },
                            description:
                              "volumeAttributes stores driver-specific properties that are passed to the CSI driver. Consult your driver's documentation for supported values.",
                            type: ["object", "null"],
                          },
                        },
                        required: ["driver"],
                        type: ["object", "null"],
                      },
                      downwardAPI: {
                        description:
                          "DownwardAPIVolumeSource represents a volume containing downward API info. Downward API volumes support ownership management and SELinux relabeling.",
                        properties: {
                          defaultMode: {
                            description:
                              "Optional: mode bits to use on created files by default. Must be a Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          items: {
                            description:
                              "Items is a list of downward API volume file",
                            items: {
                              description:
                                "DownwardAPIVolumeFile represents information to create the file containing the pod field",
                              properties: {
                                fieldRef: {
                                  description:
                                    "ObjectFieldSelector selects an APIVersioned field of an object.",
                                  properties: {
                                    apiVersion: {
                                      description:
                                        'Version of the schema the FieldPath is written in terms of, defaults to "v1".',
                                      type: ["string", "null"],
                                    },
                                    fieldPath: {
                                      description:
                                        "Path of the field to select in the specified API version.",
                                      type: "string",
                                    },
                                  },
                                  required: ["fieldPath"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                                mode: {
                                  description:
                                    "Optional: mode bits used to set permissions on this file, must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                                  format: "int32",
                                  type: ["integer", "null"],
                                },
                                path: {
                                  description:
                                    "Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'",
                                  type: "string",
                                },
                                resourceFieldRef: {
                                  description:
                                    "ResourceFieldSelector represents container resources (cpu, memory) and their output format",
                                  properties: {
                                    containerName: {
                                      description:
                                        "Container name: required for volumes, optional for env vars",
                                      type: ["string", "null"],
                                    },
                                    divisor: {
                                      oneOf: [
                                        {
                                          type: ["string", "null"],
                                        },
                                        {
                                          type: ["number", "null"],
                                        },
                                      ],
                                    },
                                    resource: {
                                      description:
                                        "Required: resource to select",
                                      type: "string",
                                    },
                                  },
                                  required: ["resource"],
                                  type: ["object", "null"],
                                  "x-kubernetes-map-type": "atomic",
                                },
                              },
                              required: ["path"],
                              type: ["object", "null"],
                            },
                            type: ["array", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      emptyDir: {
                        description:
                          "Represents an empty directory for a pod. Empty directory volumes support ownership management and SELinux relabeling.",
                        properties: {
                          medium: {
                            description:
                              'medium represents what type of storage medium should back this directory. The default is "" which means to use the node\'s default medium. Must be an empty string (default) or Memory. More info: https://kubernetes.io/docs/concepts/storage/volumes#emptydir',
                            type: ["string", "null"],
                          },
                          sizeLimit: {
                            oneOf: [
                              {
                                type: ["string", "null"],
                              },
                              {
                                type: ["number", "null"],
                              },
                            ],
                          },
                        },
                        type: ["object", "null"],
                      },
                      ephemeral: {
                        description:
                          "Represents an ephemeral volume that is handled by a normal storage driver.",
                        properties: {
                          volumeClaimTemplate: {
                            description:
                              "PersistentVolumeClaimTemplate is used to produce PersistentVolumeClaim objects as part of an EphemeralVolumeSource.",
                            properties: {
                              metadata: {
                                description:
                                  "ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.",
                                properties: {
                                  annotations: {
                                    additionalProperties: {
                                      type: ["string", "null"],
                                    },
                                    description:
                                      "Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations",
                                    type: ["object", "null"],
                                  },
                                  clusterName: {
                                    description:
                                      "Deprecated: ClusterName is a legacy field that was always cleared by the system and never used; it will be removed completely in 1.25.\n\nThe name in the go struct is changed to help clients detect accidental use.",
                                    type: ["string", "null"],
                                  },
                                  creationTimestamp: {
                                    description:
                                      "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                                    format: "date-time",
                                    type: ["string", "null"],
                                  },
                                  deletionGracePeriodSeconds: {
                                    description:
                                      "Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.",
                                    format: "int64",
                                    type: ["integer", "null"],
                                  },
                                  deletionTimestamp: {
                                    description:
                                      "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                                    format: "date-time",
                                    type: ["string", "null"],
                                  },
                                  finalizers: {
                                    description:
                                      "Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.",
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                    "x-kubernetes-patch-strategy": "merge",
                                  },
                                  generateName: {
                                    description:
                                      "GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.\n\nIf this field is specified and the generated name exists, the server will return a 409.\n\nApplied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency",
                                    type: ["string", "null"],
                                  },
                                  generation: {
                                    description:
                                      "A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.",
                                    format: "int64",
                                    type: ["integer", "null"],
                                  },
                                  labels: {
                                    additionalProperties: {
                                      type: ["string", "null"],
                                    },
                                    description:
                                      "Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels",
                                    type: ["object", "null"],
                                  },
                                  managedFields: {
                                    description:
                                      "ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like \"ci-cd\". The set of fields is always in the version that the workflow used when modifying the object.",
                                    items: {
                                      description:
                                        "ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.",
                                      properties: {
                                        apiVersion: {
                                          description:
                                            'APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.',
                                          type: ["string", "null"],
                                        },
                                        fieldsType: {
                                          description:
                                            'FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"',
                                          type: ["string", "null"],
                                        },
                                        fieldsV1: {
                                          description:
                                            "FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.\n\nEach key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:<name>', where <name> is the name of a field in a struct, or key in a map 'v:<value>', where <value> is the exact json formatted value of a list item 'i:<index>', where <index> is position of a item in a list 'k:<keys>', where <keys> is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.\n\nThe exact format is defined in sigs.k8s.io/structured-merge-diff",
                                          type: ["object", "null"],
                                        },
                                        manager: {
                                          description:
                                            "Manager is an identifier of the workflow managing these fields.",
                                          type: ["string", "null"],
                                        },
                                        operation: {
                                          description:
                                            "Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.",
                                          type: ["string", "null"],
                                        },
                                        subresource: {
                                          description:
                                            "Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.",
                                          type: ["string", "null"],
                                        },
                                        time: {
                                          description:
                                            "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                                          format: "date-time",
                                          type: ["string", "null"],
                                        },
                                      },
                                      type: ["object", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  name: {
                                    description:
                                      "Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names",
                                    type: ["string", "null"],
                                  },
                                  namespace: {
                                    description:
                                      'Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.\n\nMust be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces',
                                    type: ["string", "null"],
                                  },
                                  ownerReferences: {
                                    description:
                                      "List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.",
                                    items: {
                                      description:
                                        "OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.",
                                      properties: {
                                        apiVersion: {
                                          description:
                                            "API version of the referent.",
                                          type: "string",
                                        },
                                        blockOwnerDeletion: {
                                          description:
                                            'If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. See https://kubernetes.io/docs/concepts/architecture/garbage-collection/#foreground-deletion for how the garbage collector interacts with this field and enforces the foreground deletion. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.',
                                          type: ["boolean", "null"],
                                        },
                                        controller: {
                                          description:
                                            "If true, this reference points to the managing controller.",
                                          type: ["boolean", "null"],
                                        },
                                        kind: {
                                          description:
                                            "Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                                          type: "string",
                                        },
                                        name: {
                                          description:
                                            "Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names",
                                          type: "string",
                                        },
                                        uid: {
                                          description:
                                            "UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
                                          type: "string",
                                        },
                                      },
                                      required: [
                                        "apiVersion",
                                        "kind",
                                        "name",
                                        "uid",
                                      ],
                                      type: ["object", "null"],
                                      "x-kubernetes-map-type": "atomic",
                                    },
                                    type: ["array", "null"],
                                    "x-kubernetes-patch-merge-key": "uid",
                                    "x-kubernetes-patch-strategy": "merge",
                                  },
                                  resourceVersion: {
                                    description:
                                      "An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.\n\nPopulated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency",
                                    type: ["string", "null"],
                                  },
                                  selfLink: {
                                    description:
                                      "Deprecated: selfLink is a legacy read-only field that is no longer populated by the system.",
                                    type: ["string", "null"],
                                  },
                                  uid: {
                                    description:
                                      "UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.\n\nPopulated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
                                    type: ["string", "null"],
                                  },
                                },
                                type: ["object", "null"],
                              },
                              spec: {
                                description:
                                  "PersistentVolumeClaimSpec describes the common attributes of storage devices and allows a Source for provider-specific attributes",
                                properties: {
                                  accessModes: {
                                    description:
                                      "accessModes contains the desired access modes the volume should have. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#access-modes-1",
                                    items: {
                                      type: ["string", "null"],
                                    },
                                    type: ["array", "null"],
                                  },
                                  dataSource: {
                                    description:
                                      "TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.",
                                    properties: {
                                      apiGroup: {
                                        description:
                                          "APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.",
                                        type: ["string", "null"],
                                      },
                                      kind: {
                                        description:
                                          "Kind is the type of resource being referenced",
                                        type: "string",
                                      },
                                      name: {
                                        description:
                                          "Name is the name of resource being referenced",
                                        type: "string",
                                      },
                                    },
                                    required: ["kind", "name"],
                                    type: ["object", "null"],
                                    "x-kubernetes-map-type": "atomic",
                                  },
                                  dataSourceRef: {
                                    description:
                                      "TypedLocalObjectReference contains enough information to let you locate the typed referenced object inside the same namespace.",
                                    properties: {
                                      apiGroup: {
                                        description:
                                          "APIGroup is the group for the resource being referenced. If APIGroup is not specified, the specified Kind must be in the core API group. For any other third-party types, APIGroup is required.",
                                        type: ["string", "null"],
                                      },
                                      kind: {
                                        description:
                                          "Kind is the type of resource being referenced",
                                        type: "string",
                                      },
                                      name: {
                                        description:
                                          "Name is the name of resource being referenced",
                                        type: "string",
                                      },
                                    },
                                    required: ["kind", "name"],
                                    type: ["object", "null"],
                                    "x-kubernetes-map-type": "atomic",
                                  },
                                  resources: {
                                    description:
                                      "ResourceRequirements describes the compute resource requirements.",
                                    properties: {
                                      limits: {
                                        additionalProperties: {
                                          oneOf: [
                                            {
                                              type: ["string", "null"],
                                            },
                                            {
                                              type: ["number", "null"],
                                            },
                                          ],
                                        },
                                        description:
                                          "Limits describes the maximum amount of compute resources allowed. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                                        type: ["object", "null"],
                                      },
                                      requests: {
                                        additionalProperties: {
                                          oneOf: [
                                            {
                                              type: ["string", "null"],
                                            },
                                            {
                                              type: ["number", "null"],
                                            },
                                          ],
                                        },
                                        description:
                                          "Requests describes the minimum amount of compute resources required. If Requests is omitted for a container, it defaults to Limits if that is explicitly specified, otherwise to an implementation-defined value. More info: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/",
                                        type: ["object", "null"],
                                      },
                                    },
                                    type: ["object", "null"],
                                  },
                                  selector: {
                                    description:
                                      "A label selector is a label query over a set of resources. The result of matchLabels and matchExpressions are ANDed. An empty label selector matches all objects. A null label selector matches no objects.",
                                    properties: {
                                      matchExpressions: {
                                        description:
                                          "matchExpressions is a list of label selector requirements. The requirements are ANDed.",
                                        items: {
                                          description:
                                            "A label selector requirement is a selector that contains values, a key, and an operator that relates the key and values.",
                                          properties: {
                                            key: {
                                              description:
                                                "key is the label key that the selector applies to.",
                                              type: "string",
                                              "x-kubernetes-patch-merge-key":
                                                "key",
                                              "x-kubernetes-patch-strategy":
                                                "merge",
                                            },
                                            operator: {
                                              description:
                                                "operator represents a key's relationship to a set of values. Valid operators are In, NotIn, Exists and DoesNotExist.",
                                              type: "string",
                                            },
                                            values: {
                                              description:
                                                "values is an array of string values. If the operator is In or NotIn, the values array must be non-empty. If the operator is Exists or DoesNotExist, the values array must be empty. This array is replaced during a strategic merge patch.",
                                              items: {
                                                type: ["string", "null"],
                                              },
                                              type: ["array", "null"],
                                            },
                                          },
                                          required: ["key", "operator"],
                                          type: ["object", "null"],
                                        },
                                        type: ["array", "null"],
                                      },
                                      matchLabels: {
                                        additionalProperties: {
                                          type: ["string", "null"],
                                        },
                                        description:
                                          'matchLabels is a map of {key,value} pairs. A single {key,value} in the matchLabels map is equivalent to an element of matchExpressions, whose key field is "key", the operator is "In", and the values array contains only "value". The requirements are ANDed.',
                                        type: ["object", "null"],
                                      },
                                    },
                                    type: ["object", "null"],
                                    "x-kubernetes-map-type": "atomic",
                                  },
                                  storageClassName: {
                                    description:
                                      "storageClassName is the name of the StorageClass required by the claim. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#class-1",
                                    type: ["string", "null"],
                                  },
                                  volumeMode: {
                                    description:
                                      "volumeMode defines what type of volume is required by the claim. Value of Filesystem is implied when not included in claim spec.",
                                    type: ["string", "null"],
                                  },
                                  volumeName: {
                                    description:
                                      "volumeName is the binding reference to the PersistentVolume backing this claim.",
                                    type: ["string", "null"],
                                  },
                                },
                                type: "object",
                              },
                            },
                            required: ["spec"],
                            type: ["object", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      fc: {
                        description:
                          "Represents a Fibre Channel volume. Fibre Channel volumes can only be mounted as read/write once. Fibre Channel volumes support ownership management and SELinux relabeling.",
                        properties: {
                          fsType: {
                            description:
                              'fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.',
                            type: ["string", "null"],
                          },
                          lun: {
                            description:
                              "lun is Optional: FC target lun number",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly is Optional: Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.",
                            type: ["boolean", "null"],
                          },
                          targetWWNs: {
                            description:
                              "targetWWNs is Optional: FC target worldwide names (WWNs)",
                            items: {
                              type: ["string", "null"],
                            },
                            type: ["array", "null"],
                          },
                          wwids: {
                            description:
                              "wwids Optional: FC volume world wide identifiers (wwids) Either wwids or combination of targetWWNs and lun must be set, but not both simultaneously.",
                            items: {
                              type: ["string", "null"],
                            },
                            type: ["array", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      flexVolume: {
                        description:
                          "FlexVolume represents a generic volume resource that is provisioned/attached using an exec based plugin.",
                        properties: {
                          driver: {
                            description:
                              "driver is the name of the driver to use for this volume.",
                            type: "string",
                          },
                          fsType: {
                            description:
                              'fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". The default filesystem depends on FlexVolume script.',
                            type: ["string", "null"],
                          },
                          options: {
                            additionalProperties: {
                              type: ["string", "null"],
                            },
                            description:
                              "options is Optional: this field holds extra command options if any.",
                            type: ["object", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly is Optional: defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.",
                            type: ["boolean", "null"],
                          },
                          secretRef: {
                            description:
                              "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                            properties: {
                              name: {
                                description:
                                  "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                            "x-kubernetes-map-type": "atomic",
                          },
                        },
                        required: ["driver"],
                        type: ["object", "null"],
                      },
                      flocker: {
                        description:
                          "Represents a Flocker volume mounted by the Flocker agent. One and only one of datasetName and datasetUUID should be set. Flocker volumes do not support ownership management or SELinux relabeling.",
                        properties: {
                          datasetName: {
                            description:
                              "datasetName is Name of the dataset stored as metadata -> name on the dataset for Flocker should be considered as deprecated",
                            type: ["string", "null"],
                          },
                          datasetUUID: {
                            description:
                              "datasetUUID is the UUID of the dataset. This is unique identifier of a Flocker dataset",
                            type: ["string", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      gcePersistentDisk: {
                        description:
                          "Represents a Persistent Disk resource in Google Compute Engine.\n\nA GCE PD must exist before mounting to a container. The disk must also be in the same GCE project and zone as the kubelet. A GCE PD can only be mounted as read/write once or read-only many times. GCE PDs support ownership management and SELinux relabeling.",
                        properties: {
                          fsType: {
                            description:
                              'fsType is filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk',
                            type: ["string", "null"],
                          },
                          partition: {
                            description:
                              'partition is the partition in the volume that you want to mount. If omitted, the default is to mount by volume name. Examples: For volume /dev/sda1, you specify the partition as "1". Similarly, the volume partition for /dev/sda is "0" (or you can leave the property empty). More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk',
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          pdName: {
                            description:
                              "pdName is unique name of the PD resource in GCE. Used to identify the disk in GCE. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk",
                            type: "string",
                          },
                          readOnly: {
                            description:
                              "readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#gcepersistentdisk",
                            type: ["boolean", "null"],
                          },
                        },
                        required: ["pdName"],
                        type: ["object", "null"],
                      },
                      gitRepo: {
                        description:
                          "Represents a volume that is populated with the contents of a git repository. Git repo volumes do not support ownership management. Git repo volumes support SELinux relabeling.\n\nDEPRECATED: GitRepo is deprecated. To provision a container with a git repo, mount an EmptyDir into an InitContainer that clones the repo using git, then mount the EmptyDir into the Pod's container.",
                        properties: {
                          directory: {
                            description:
                              "directory is the target directory name. Must not contain or start with '..'.  If '.' is supplied, the volume directory will be the git repository.  Otherwise, if specified, the volume will contain the git repository in the subdirectory with the given name.",
                            type: ["string", "null"],
                          },
                          repository: {
                            description: "repository is the URL",
                            type: "string",
                          },
                          revision: {
                            description:
                              "revision is the commit hash for the specified revision.",
                            type: ["string", "null"],
                          },
                        },
                        required: ["repository"],
                        type: ["object", "null"],
                      },
                      glusterfs: {
                        description:
                          "Represents a Glusterfs mount that lasts the lifetime of a pod. Glusterfs volumes do not support ownership management or SELinux relabeling.",
                        properties: {
                          endpoints: {
                            description:
                              "endpoints is the endpoint name that details Glusterfs topology. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod",
                            type: "string",
                          },
                          path: {
                            description:
                              "path is the Glusterfs volume path. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod",
                            type: "string",
                          },
                          readOnly: {
                            description:
                              "readOnly here will force the Glusterfs volume to be mounted with read-only permissions. Defaults to false. More info: https://examples.k8s.io/volumes/glusterfs/README.md#create-a-pod",
                            type: ["boolean", "null"],
                          },
                        },
                        required: ["endpoints", "path"],
                        type: ["object", "null"],
                      },
                      hostPath: {
                        description:
                          "Represents a host path mapped into a pod. Host path volumes do not support ownership management or SELinux relabeling.",
                        properties: {
                          path: {
                            description:
                              "path of the directory on the host. If the path is a symlink, it will follow the link to the real path. More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath",
                            type: "string",
                          },
                          type: {
                            description:
                              'type for HostPath Volume Defaults to "" More info: https://kubernetes.io/docs/concepts/storage/volumes#hostpath',
                            type: ["string", "null"],
                          },
                        },
                        required: ["path"],
                        type: ["object", "null"],
                      },
                      iscsi: {
                        description:
                          "Represents an ISCSI disk. ISCSI volumes can only be mounted as read/write once. ISCSI volumes support ownership management and SELinux relabeling.",
                        properties: {
                          chapAuthDiscovery: {
                            description:
                              "chapAuthDiscovery defines whether support iSCSI Discovery CHAP authentication",
                            type: ["boolean", "null"],
                          },
                          chapAuthSession: {
                            description:
                              "chapAuthSession defines whether support iSCSI Session CHAP authentication",
                            type: ["boolean", "null"],
                          },
                          fsType: {
                            description:
                              'fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#iscsi',
                            type: ["string", "null"],
                          },
                          initiatorName: {
                            description:
                              "initiatorName is the custom iSCSI Initiator Name. If initiatorName is specified with iscsiInterface simultaneously, new iSCSI interface <target portal>:<volume name> will be created for the connection.",
                            type: ["string", "null"],
                          },
                          iqn: {
                            description:
                              "iqn is the target iSCSI Qualified Name.",
                            type: "string",
                          },
                          iscsiInterface: {
                            description:
                              "iscsiInterface is the interface Name that uses an iSCSI transport. Defaults to 'default' (tcp).",
                            type: ["string", "null"],
                          },
                          lun: {
                            description:
                              "lun represents iSCSI Target Lun number.",
                            format: "int32",
                            type: "integer",
                          },
                          portals: {
                            description:
                              "portals is the iSCSI Target Portal List. The portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).",
                            items: {
                              type: ["string", "null"],
                            },
                            type: ["array", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false.",
                            type: ["boolean", "null"],
                          },
                          secretRef: {
                            description:
                              "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                            properties: {
                              name: {
                                description:
                                  "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                            "x-kubernetes-map-type": "atomic",
                          },
                          targetPortal: {
                            description:
                              "targetPortal is iSCSI Target Portal. The Portal is either an IP or ip_addr:port if the port is other than default (typically TCP ports 860 and 3260).",
                            type: "string",
                          },
                        },
                        required: ["targetPortal", "iqn", "lun"],
                        type: ["object", "null"],
                      },
                      name: {
                        description:
                          "name of the volume. Must be a DNS_LABEL and unique within the pod. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                        type: "string",
                      },
                      nfs: {
                        description:
                          "Represents an NFS mount that lasts the lifetime of a pod. NFS volumes do not support ownership management or SELinux relabeling.",
                        properties: {
                          path: {
                            description:
                              "path that is exported by the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs",
                            type: "string",
                          },
                          readOnly: {
                            description:
                              "readOnly here will force the NFS export to be mounted with read-only permissions. Defaults to false. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs",
                            type: ["boolean", "null"],
                          },
                          server: {
                            description:
                              "server is the hostname or IP address of the NFS server. More info: https://kubernetes.io/docs/concepts/storage/volumes#nfs",
                            type: "string",
                          },
                        },
                        required: ["server", "path"],
                        type: ["object", "null"],
                      },
                      persistentVolumeClaim: {
                        description:
                          "PersistentVolumeClaimVolumeSource references the user's PVC in the same namespace. This volume finds the bound PV and mounts that volume for the pod. A PersistentVolumeClaimVolumeSource is, essentially, a wrapper around another type of volume that is owned by someone else (the system).",
                        properties: {
                          claimName: {
                            description:
                              "claimName is the name of a PersistentVolumeClaim in the same namespace as the pod using this volume. More info: https://kubernetes.io/docs/concepts/storage/persistent-volumes#persistentvolumeclaims",
                            type: "string",
                          },
                          readOnly: {
                            description:
                              "readOnly Will force the ReadOnly setting in VolumeMounts. Default false.",
                            type: ["boolean", "null"],
                          },
                        },
                        required: ["claimName"],
                        type: ["object", "null"],
                      },
                      photonPersistentDisk: {
                        description:
                          "Represents a Photon Controller persistent disk resource.",
                        properties: {
                          fsType: {
                            description:
                              'fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.',
                            type: ["string", "null"],
                          },
                          pdID: {
                            description:
                              "pdID is the ID that identifies Photon Controller persistent disk",
                            type: "string",
                          },
                        },
                        required: ["pdID"],
                        type: ["object", "null"],
                      },
                      portworxVolume: {
                        description:
                          "PortworxVolumeSource represents a Portworx volume resource.",
                        properties: {
                          fsType: {
                            description:
                              'fSType represents the filesystem type to mount Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs". Implicitly inferred to be "ext4" if unspecified.',
                            type: ["string", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.",
                            type: ["boolean", "null"],
                          },
                          volumeID: {
                            description:
                              "volumeID uniquely identifies a Portworx volume",
                            type: "string",
                          },
                        },
                        required: ["volumeID"],
                        type: ["object", "null"],
                      },
                      projected: {
                        description: "Represents a projected volume source",
                        properties: {
                          defaultMode: {
                            description:
                              "defaultMode are the mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          sources: {
                            description:
                              "sources is the list of volume projections",
                            items: {
                              description:
                                "Projection that may be projected along with other supported volume types",
                              properties: {
                                configMap: {
                                  description:
                                    "Adapts a ConfigMap into a projected volume.\n\nThe contents of the target ConfigMap's Data field will be presented in a projected volume as files using the keys in the Data field as the file names, unless the items element is populated with specific mappings of keys to paths. Note that this is identical to a configmap volume source without the default mode.",
                                  properties: {
                                    items: {
                                      description:
                                        "items if unspecified, each key-value pair in the Data field of the referenced ConfigMap will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the ConfigMap, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.",
                                      items: {
                                        description:
                                          "Maps a string key to a path within a volume.",
                                        properties: {
                                          key: {
                                            description:
                                              "key is the key to project.",
                                            type: "string",
                                          },
                                          mode: {
                                            description:
                                              "mode is Optional: mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                                            format: "int32",
                                            type: ["integer", "null"],
                                          },
                                          path: {
                                            description:
                                              "path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.",
                                            type: "string",
                                          },
                                        },
                                        required: ["key", "path"],
                                        type: ["object", "null"],
                                      },
                                      type: ["array", "null"],
                                    },
                                    name: {
                                      description:
                                        "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                      type: ["string", "null"],
                                    },
                                    optional: {
                                      description:
                                        "optional specify whether the ConfigMap or its keys must be defined",
                                      type: ["boolean", "null"],
                                    },
                                  },
                                  type: ["object", "null"],
                                },
                                downwardAPI: {
                                  description:
                                    "Represents downward API info for projecting into a projected volume. Note that this is identical to a downwardAPI volume source without the default mode.",
                                  properties: {
                                    items: {
                                      description:
                                        "Items is a list of DownwardAPIVolume file",
                                      items: {
                                        description:
                                          "DownwardAPIVolumeFile represents information to create the file containing the pod field",
                                        properties: {
                                          fieldRef: {
                                            description:
                                              "ObjectFieldSelector selects an APIVersioned field of an object.",
                                            properties: {
                                              apiVersion: {
                                                description:
                                                  'Version of the schema the FieldPath is written in terms of, defaults to "v1".',
                                                type: ["string", "null"],
                                              },
                                              fieldPath: {
                                                description:
                                                  "Path of the field to select in the specified API version.",
                                                type: "string",
                                              },
                                            },
                                            required: ["fieldPath"],
                                            type: ["object", "null"],
                                            "x-kubernetes-map-type": "atomic",
                                          },
                                          mode: {
                                            description:
                                              "Optional: mode bits used to set permissions on this file, must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                                            format: "int32",
                                            type: ["integer", "null"],
                                          },
                                          path: {
                                            description:
                                              "Required: Path is  the relative path name of the file to be created. Must not be absolute or contain the '..' path. Must be utf-8 encoded. The first item of the relative path must not start with '..'",
                                            type: "string",
                                          },
                                          resourceFieldRef: {
                                            description:
                                              "ResourceFieldSelector represents container resources (cpu, memory) and their output format",
                                            properties: {
                                              containerName: {
                                                description:
                                                  "Container name: required for volumes, optional for env vars",
                                                type: ["string", "null"],
                                              },
                                              divisor: {
                                                oneOf: [
                                                  {
                                                    type: ["string", "null"],
                                                  },
                                                  {
                                                    type: ["number", "null"],
                                                  },
                                                ],
                                              },
                                              resource: {
                                                description:
                                                  "Required: resource to select",
                                                type: "string",
                                              },
                                            },
                                            required: ["resource"],
                                            type: ["object", "null"],
                                            "x-kubernetes-map-type": "atomic",
                                          },
                                        },
                                        required: ["path"],
                                        type: ["object", "null"],
                                      },
                                      type: ["array", "null"],
                                    },
                                  },
                                  type: ["object", "null"],
                                },
                                secret: {
                                  description:
                                    "Adapts a secret into a projected volume.\n\nThe contents of the target Secret's Data field will be presented in a projected volume as files using the keys in the Data field as the file names. Note that this is identical to a secret volume source without the default mode.",
                                  properties: {
                                    items: {
                                      description:
                                        "items if unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.",
                                      items: {
                                        description:
                                          "Maps a string key to a path within a volume.",
                                        properties: {
                                          key: {
                                            description:
                                              "key is the key to project.",
                                            type: "string",
                                          },
                                          mode: {
                                            description:
                                              "mode is Optional: mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                                            format: "int32",
                                            type: ["integer", "null"],
                                          },
                                          path: {
                                            description:
                                              "path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.",
                                            type: "string",
                                          },
                                        },
                                        required: ["key", "path"],
                                        type: ["object", "null"],
                                      },
                                      type: ["array", "null"],
                                    },
                                    name: {
                                      description:
                                        "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                      type: ["string", "null"],
                                    },
                                    optional: {
                                      description:
                                        "optional field specify whether the Secret or its key must be defined",
                                      type: ["boolean", "null"],
                                    },
                                  },
                                  type: ["object", "null"],
                                },
                                serviceAccountToken: {
                                  description:
                                    "ServiceAccountTokenProjection represents a projected service account token volume. This projection can be used to insert a service account token into the pods runtime filesystem for use against APIs (Kubernetes API Server or otherwise).",
                                  properties: {
                                    audience: {
                                      description:
                                        "audience is the intended audience of the token. A recipient of a token must identify itself with an identifier specified in the audience of the token, and otherwise should reject the token. The audience defaults to the identifier of the apiserver.",
                                      type: ["string", "null"],
                                    },
                                    expirationSeconds: {
                                      description:
                                        "expirationSeconds is the requested duration of validity of the service account token. As the token approaches expiration, the kubelet volume plugin will proactively rotate the service account token. The kubelet will start trying to rotate the token if the token is older than 80 percent of its time to live or if the token is older than 24 hours.Defaults to 1 hour and must be at least 10 minutes.",
                                      format: "int64",
                                      type: ["integer", "null"],
                                    },
                                    path: {
                                      description:
                                        "path is the path relative to the mount point of the file to project the token into.",
                                      type: "string",
                                    },
                                  },
                                  required: ["path"],
                                  type: ["object", "null"],
                                },
                              },
                              type: ["object", "null"],
                            },
                            type: ["array", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      quobyte: {
                        description:
                          "Represents a Quobyte mount that lasts the lifetime of a pod. Quobyte volumes do not support ownership management or SELinux relabeling.",
                        properties: {
                          group: {
                            description:
                              "group to map volume access to Default is no group",
                            type: ["string", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly here will force the Quobyte volume to be mounted with read-only permissions. Defaults to false.",
                            type: ["boolean", "null"],
                          },
                          registry: {
                            description:
                              "registry represents a single or multiple Quobyte Registry services specified as a string as host:port pair (multiple entries are separated with commas) which acts as the central registry for volumes",
                            type: "string",
                          },
                          tenant: {
                            description:
                              "tenant owning the given Quobyte volume in the Backend Used with dynamically provisioned Quobyte volumes, value is set by the plugin",
                            type: ["string", "null"],
                          },
                          user: {
                            description:
                              "user to map volume access to Defaults to serivceaccount user",
                            type: ["string", "null"],
                          },
                          volume: {
                            description:
                              "volume is a string that references an already created Quobyte volume by name.",
                            type: "string",
                          },
                        },
                        required: ["registry", "volume"],
                        type: ["object", "null"],
                      },
                      rbd: {
                        description:
                          "Represents a Rados Block Device mount that lasts the lifetime of a pod. RBD volumes support ownership management and SELinux relabeling.",
                        properties: {
                          fsType: {
                            description:
                              'fsType is the filesystem type of the volume that you want to mount. Tip: Ensure that the filesystem type is supported by the host operating system. Examples: "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified. More info: https://kubernetes.io/docs/concepts/storage/volumes#rbd',
                            type: ["string", "null"],
                          },
                          image: {
                            description:
                              "image is the rados image name. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it",
                            type: "string",
                          },
                          keyring: {
                            description:
                              "keyring is the path to key ring for RBDUser. Default is /etc/ceph/keyring. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it",
                            type: ["string", "null"],
                          },
                          monitors: {
                            description:
                              "monitors is a collection of Ceph monitors. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it",
                            items: {
                              type: ["string", "null"],
                            },
                            type: "array",
                          },
                          pool: {
                            description:
                              "pool is the rados pool name. Default is rbd. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it",
                            type: ["string", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly here will force the ReadOnly setting in VolumeMounts. Defaults to false. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it",
                            type: ["boolean", "null"],
                          },
                          secretRef: {
                            description:
                              "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                            properties: {
                              name: {
                                description:
                                  "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                            "x-kubernetes-map-type": "atomic",
                          },
                          user: {
                            description:
                              "user is the rados user name. Default is admin. More info: https://examples.k8s.io/volumes/rbd/README.md#how-to-use-it",
                            type: ["string", "null"],
                          },
                        },
                        required: ["monitors", "image"],
                        type: ["object", "null"],
                      },
                      scaleIO: {
                        description:
                          "ScaleIOVolumeSource represents a persistent ScaleIO volume",
                        properties: {
                          fsType: {
                            description:
                              'fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Default is "xfs".',
                            type: ["string", "null"],
                          },
                          gateway: {
                            description:
                              "gateway is the host address of the ScaleIO API Gateway.",
                            type: "string",
                          },
                          protectionDomain: {
                            description:
                              "protectionDomain is the name of the ScaleIO Protection Domain for the configured storage.",
                            type: ["string", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly Defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.",
                            type: ["boolean", "null"],
                          },
                          secretRef: {
                            description:
                              "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                            properties: {
                              name: {
                                description:
                                  "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                type: ["string", "null"],
                              },
                            },
                            type: "object",
                            "x-kubernetes-map-type": "atomic",
                          },
                          sslEnabled: {
                            description:
                              "sslEnabled Flag enable/disable SSL communication with Gateway, default false",
                            type: ["boolean", "null"],
                          },
                          storageMode: {
                            description:
                              "storageMode indicates whether the storage for a volume should be ThickProvisioned or ThinProvisioned. Default is ThinProvisioned.",
                            type: ["string", "null"],
                          },
                          storagePool: {
                            description:
                              "storagePool is the ScaleIO Storage Pool associated with the protection domain.",
                            type: ["string", "null"],
                          },
                          system: {
                            description:
                              "system is the name of the storage system as configured in ScaleIO.",
                            type: "string",
                          },
                          volumeName: {
                            description:
                              "volumeName is the name of a volume already created in the ScaleIO system that is associated with this volume source.",
                            type: ["string", "null"],
                          },
                        },
                        required: ["gateway", "system", "secretRef"],
                        type: ["object", "null"],
                      },
                      secret: {
                        description:
                          "Adapts a Secret into a volume.\n\nThe contents of the target Secret's Data field will be presented in a volume as files using the keys in the Data field as the file names. Secret volumes support ownership management and SELinux relabeling.",
                        properties: {
                          defaultMode: {
                            description:
                              "defaultMode is Optional: mode bits used to set permissions on created files by default. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. Defaults to 0644. Directories within the path are not affected by this setting. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                            format: "int32",
                            type: ["integer", "null"],
                          },
                          items: {
                            description:
                              "items If unspecified, each key-value pair in the Data field of the referenced Secret will be projected into the volume as a file whose name is the key and content is the value. If specified, the listed keys will be projected into the specified paths, and unlisted keys will not be present. If a key is specified which is not present in the Secret, the volume setup will error unless it is marked optional. Paths must be relative and may not contain the '..' path or start with '..'.",
                            items: {
                              description:
                                "Maps a string key to a path within a volume.",
                              properties: {
                                key: {
                                  description: "key is the key to project.",
                                  type: "string",
                                },
                                mode: {
                                  description:
                                    "mode is Optional: mode bits used to set permissions on this file. Must be an octal value between 0000 and 0777 or a decimal value between 0 and 511. YAML accepts both octal and decimal values, JSON requires decimal values for mode bits. If not specified, the volume defaultMode will be used. This might be in conflict with other options that affect the file mode, like fsGroup, and the result can be other mode bits set.",
                                  format: "int32",
                                  type: ["integer", "null"],
                                },
                                path: {
                                  description:
                                    "path is the relative path of the file to map the key to. May not be an absolute path. May not contain the path element '..'. May not start with the string '..'.",
                                  type: "string",
                                },
                              },
                              required: ["key", "path"],
                              type: ["object", "null"],
                            },
                            type: ["array", "null"],
                          },
                          optional: {
                            description:
                              "optional field specify whether the Secret or its keys must be defined",
                            type: ["boolean", "null"],
                          },
                          secretName: {
                            description:
                              "secretName is the name of the secret in the pod's namespace to use. More info: https://kubernetes.io/docs/concepts/storage/volumes#secret",
                            type: ["string", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      storageos: {
                        description:
                          "Represents a StorageOS persistent volume resource.",
                        properties: {
                          fsType: {
                            description:
                              'fsType is the filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.',
                            type: ["string", "null"],
                          },
                          readOnly: {
                            description:
                              "readOnly defaults to false (read/write). ReadOnly here will force the ReadOnly setting in VolumeMounts.",
                            type: ["boolean", "null"],
                          },
                          secretRef: {
                            description:
                              "LocalObjectReference contains enough information to let you locate the referenced object inside the same namespace.",
                            properties: {
                              name: {
                                description:
                                  "Name of the referent. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names",
                                type: ["string", "null"],
                              },
                            },
                            type: ["object", "null"],
                            "x-kubernetes-map-type": "atomic",
                          },
                          volumeName: {
                            description:
                              "volumeName is the human-readable name of the StorageOS volume.  Volume names are only unique within a namespace.",
                            type: ["string", "null"],
                          },
                          volumeNamespace: {
                            description:
                              'volumeNamespace specifies the scope of the volume within StorageOS.  If no namespace is specified then the Pod\'s namespace will be used.  This allows the Kubernetes name scoping to be mirrored within StorageOS for tighter integration. Set VolumeName to any name to override the default behaviour. Set to "default" if you are not using namespaces within StorageOS. Namespaces that do not pre-exist within StorageOS will be created.',
                            type: ["string", "null"],
                          },
                        },
                        type: ["object", "null"],
                      },
                      vsphereVolume: {
                        description: "Represents a vSphere volume resource.",
                        properties: {
                          fsType: {
                            description:
                              'fsType is filesystem type to mount. Must be a filesystem type supported by the host operating system. Ex. "ext4", "xfs", "ntfs". Implicitly inferred to be "ext4" if unspecified.',
                            type: ["string", "null"],
                          },
                          storagePolicyID: {
                            description:
                              "storagePolicyID is the storage Policy Based Management (SPBM) profile ID associated with the StoragePolicyName.",
                            type: ["string", "null"],
                          },
                          storagePolicyName: {
                            description:
                              "storagePolicyName is the storage Policy Based Management (SPBM) profile name.",
                            type: ["string", "null"],
                          },
                          volumePath: {
                            description:
                              "volumePath is the path that identifies vSphere volume vmdk",
                            type: "string",
                          },
                        },
                        required: ["volumePath"],
                        type: ["object", "null"],
                      },
                    },
                    required: ["name"],
                    type: ["object", "null"],
                  },
                  type: ["array", "null"],
                  "x-kubernetes-patch-merge-key": "name",
                  "x-kubernetes-patch-strategy": "merge,retainKeys",
                },
              },
              required: ["containers"],
              type: ["object", "null"],
            },
          },
          type: "object",
        },
      },
      required: ["selector", "template"],
      type: ["object", "null"],
    },
    status: {
      description:
        "DeploymentStatus is the most recently observed status of the Deployment.",
      properties: {
        availableReplicas: {
          description:
            "Total number of available pods (ready for at least minReadySeconds) targeted by this deployment.",
          format: "int32",
          type: ["integer", "null"],
        },
        collisionCount: {
          description:
            "Count of hash collisions for the Deployment. The Deployment controller uses this field as a collision avoidance mechanism when it needs to create the name for the newest ReplicaSet.",
          format: "int32",
          type: ["integer", "null"],
        },
        conditions: {
          description:
            "Represents the latest available observations of a deployment's current state.",
          items: {
            description:
              "DeploymentCondition describes the state of a deployment at a certain point.",
            properties: {
              lastTransitionTime: {
                description:
                  "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                format: "date-time",
                type: ["string", "null"],
              },
              lastUpdateTime: {
                description:
                  "Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.",
                format: "date-time",
                type: ["string", "null"],
              },
              message: {
                description:
                  "A human readable message indicating details about the transition.",
                type: ["string", "null"],
              },
              reason: {
                description: "The reason for the condition's last transition.",
                type: ["string", "null"],
              },
              status: {
                description:
                  "Status of the condition, one of True, False, Unknown.",
                type: "string",
              },
              type: {
                description: "Type of deployment condition.",
                type: "string",
              },
            },
            required: ["type", "status"],
            type: ["object", "null"],
          },
          type: ["array", "null"],
          "x-kubernetes-patch-merge-key": "type",
          "x-kubernetes-patch-strategy": "merge",
        },
        observedGeneration: {
          description: "The generation observed by the deployment controller.",
          format: "int64",
          type: ["integer", "null"],
        },
        readyReplicas: {
          description:
            "readyReplicas is the number of pods targeted by this Deployment with a Ready Condition.",
          format: "int32",
          type: ["integer", "null"],
        },
        replicas: {
          description:
            "Total number of non-terminated pods targeted by this deployment (their labels match the selector).",
          format: "int32",
          type: ["integer", "null"],
        },
        unavailableReplicas: {
          description:
            "Total number of unavailable pods targeted by this deployment. This is the total number of pods that are still required for the deployment to have 100% available capacity. They may either be pods that are running but not yet available or pods that still have not been created.",
          format: "int32",
          type: ["integer", "null"],
        },
        updatedReplicas: {
          description:
            "Total number of non-terminated pods targeted by this deployment that have the desired template spec.",
          format: "int32",
          type: ["integer", "null"],
        },
      },
      type: ["object", "null"],
    },
  },
  type: "object",
  "x-kubernetes-group-version-kind": [
    {
      group: "apps",
      kind: "Deployment",
      version: "v1",
    },
  ],
  $schema: "http://json-schema.org/schema#",
};
