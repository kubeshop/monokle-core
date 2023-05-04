import {Resource} from '../common/types.js';

export function extractSchema(crd: Resource, versionName: string | undefined) {
  if (crd.kind !== 'CustomResourceDefinition') {
    return undefined;
  }

  const versions: any[] = crd.content?.spec?.versions || [];
  const version = versions.find((v: any) => v.name === versionName);
  const schema = JSON.parse(JSON.stringify(version?.schema?.openAPIV3Schema));

  if (!schema) {
    return;
  }

  if (!schema.properties) {
    schema.properties = {};
  } else if (schema['x-kubernetes-preserve-unknown-fields'] !== true) {
    schema.additionalProperties = false;
  }

  schema.properties['apiVersion'] = objectMetadata.properties.apiVersion;
  schema.properties['kind'] = objectMetadata.properties.kind;
  schema.properties['metadata'] = objectMetadata.properties.metadata;

  Object.values(schema.properties).forEach((prop: any) => {
    if (prop.type && prop.type === 'object') {
      try {
        if (prop.additionalProperties) {
          delete prop['additionalProperties'];
        }

        prop['additionalProperties'] = prop['x-kubernetes-preserve-unknown-fields'];
        delete prop['x-kubernetes-preserve-unknown-fields'];
      } catch (e) {
        // this could fail - ignore
      }
    }
  });

  return schema;
}

const crdVersionRegex = /(v)(\d*)(alpha|beta)?(\d*)?/;

export function findDefaultVersion(crd: Resource) {
  if (!crd.content?.spec?.versions) {
    return undefined;
  }

  const versionNames: string[] = crd.content.spec.versions.map((v: any) => v.name);

  versionNames.sort((a, b) => {
    const m1 = crdVersionRegex.exec(a);
    const m2 = crdVersionRegex.exec(b);

    // do both versions match the regex?
    if (m1 && m2) {
      // do both have initial version number?
      if (m1[2] && m2[2]) {
        // is the initial version the same?
        if (m1[2] === m2[2]) {
          // do both have an alpha or beta tag?
          if (m1[3] && m2[3]) {
            // is the tag the same?
            if (m1[3] === m2[3]) {
              // do both have an alpha or beta version?
              if (m1[4] && m2[4]) {
                return parseInt(m1[4], 10) - parseInt(m2[4], 10);
              }
              return m1[4] ? 1 : -1;
            }
            // compare tags (negate for beta > alpha)
            return -m1[3].localeCompare(m2[3]);
          }
          return m1[3] ? 1 : -1;
        }
        // compare version numbers
        return parseInt(m2[2], 10) - parseInt(m1[2], 10);
      }
      return m1[2] ? 1 : -1;
    }
    if (m1) return 1;
    if (m2) return -1;

    return a.localeCompare(b);
  });

  return versionNames.length > 0 ? versionNames[0] : undefined;
}
export const objectMetadata = {
  description: 'Standalone Object Metadata schema merged into custom schemas when necessary',
  properties: {
    apiVersion: {
      description:
        'APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources',
      type: 'string',
    },
    kind: {
      description:
        'Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds',
      type: 'string',
    },
    metadata: {
      description:
        'ObjectMeta is metadata that all persisted resources must have, which includes all objects users must create.',
      properties: {
        annotations: {
          additionalProperties: {
            type: 'string',
          },
          description:
            'Annotations is an unstructured key value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: http://kubernetes.io/docs/user-guide/annotations',
          type: 'object',
        },
        clusterName: {
          description:
            'The name of the cluster which the object belongs to. This is used to distinguish resources with same name and namespace in different clusters. This field is not set anywhere right now and apiserver is going to ignore it if set in create or update request.',
          type: 'string',
        },
        creationTimestamp: {
          description:
            'Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.',
          format: 'date-time',
          type: 'string',
        },
        deletionGracePeriodSeconds: {
          description:
            'Number of seconds allowed for this object to gracefully terminate before it will be removed from the system. Only set when deletionTimestamp is also set. May only be shortened. Read-only.',
          format: 'int64',
          type: 'string',
        },
        deletionTimestamp: {
          description:
            'Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.',
          format: 'date-time',
          type: 'string',
        },
        finalizers: {
          description:
            'Must be empty before the object is deleted from the registry. Each entry is an identifier for the responsible component that will remove the entry from the list. If the deletionTimestamp of the object is non-nil, entries in this list can only be removed. Finalizers may be processed and removed in any order.  Order is NOT enforced because it introduces significant risk of stuck finalizers. finalizers is a shared field, any actor with permission can reorder it. If the finalizer list is processed in order, then this can lead to a situation in which the component responsible for the first finalizer in the list is waiting for a signal (field value, external system, or other) produced by a component responsible for a finalizer later in the list, resulting in a deadlock. Without enforced ordering finalizers are free to order amongst themselves and are not vulnerable to ordering changes in the list.',
          items: {
            type: 'string',
          },
          type: 'array',
        },
        generateName: {
          description:
            'GenerateName is an optional prefix, used by the server, to generate a unique name ONLY IF the Name field has not been provided. If this field is used, the name returned to the client will be different than the name passed. This value will also be combined with a unique suffix. The provided value has the same validation rules as the Name field, and may be truncated by the length of the suffix required to make the value unique on the server.\n\nIf this field is specified and the generated name exists, the server will NOT return a 409 - instead, it will either return 201 Created or 500 with Reason ServerTimeout indicating a unique name could not be found in the time allotted, and the client should retry (optionally after the time indicated in the Retry-After header).\n\nApplied only if Name is not specified. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#idempotency',
          type: 'string',
        },
        generation: {
          description:
            'A sequence number representing a specific generation of the desired state. Populated by the system. Read-only.',
          format: 'int64',
          type: 'integer',
        },
        labels: {
          additionalProperties: {
            type: 'string',
          },
          description:
            'Map of string keys and values that can be used to organize and categorize (scope and select) objects. May match selectors of replication controllers and services. More info: http://kubernetes.io/docs/user-guide/labels',
          type: 'object',
        },
        managedFields: {
          description:
            "ManagedFields maps workflow-id and version to the set of fields that are managed by that workflow. This is mostly for internal housekeeping, and users typically shouldn't need to set or understand this field. A workflow can be the user's name, a controller's name, or the name of a specific apply path like \"ci-cd\". The set of fields is always in the version that the workflow used when modifying the object.",
          items: {
            description:
              'ManagedFieldsEntry is a workflow-id, a FieldSet and the group version of the resource that the fieldset applies to.',
            properties: {
              apiVersion: {
                description:
                  'APIVersion defines the version of this resource that this field set applies to. The format is "group/version" just like the top-level APIVersion field. It is necessary to track the version of a field set because it cannot be automatically converted.',
                type: 'string',
              },
              fieldsType: {
                description:
                  'FieldsType is the discriminator for the different fields format and version. There is currently only one possible value: "FieldsV1"',
                type: 'string',
              },
              fieldsV1: {
                description:
                  "FieldsV1 stores a set of fields in a data structure like a Trie, in JSON format.\n\nEach key is either a '.' representing the field itself, and will always map to an empty set, or a string representing a sub-field or item. The string will follow one of these four formats: 'f:<name>', where <name> is the name of a field in a struct, or key in a map 'v:<value>', where <value> is the exact json formatted value of a list item 'i:<index>', where <index> is position of a item in a list 'k:<keys>', where <keys> is a map of  a list item's key fields to their unique values If a key maps to an empty Fields value, the field that key represents is part of the set.\n\nThe exact format is defined in sigs.k8s.io/structured-merge-diff",
                type: 'object',
              },
              manager: {
                description: 'Manager is an identifier of the workflow managing these fields.',
                type: 'string',
              },
              operation: {
                description:
                  "Operation is the type of operation which lead to this ManagedFieldsEntry being created. The only valid values for this field are 'Apply' and 'Update'.",
                type: 'string',
              },
              subresource: {
                description:
                  'Subresource is the name of the subresource used to update that object, or empty string if the object was updated through the main resource. The value of this field is used to distinguish between managers, even if they share the same name. For example, a status update will be distinct from a regular update using the same manager name. Note that the APIVersion field is not related to the Subresource field and it always corresponds to the version of the main resource.',
                type: 'string',
              },
              time: {
                description:
                  'Time is a wrapper around time.Time which supports correct marshaling to YAML and JSON.  Wrappers are provided for many of the factory methods that the time package offers.',
                format: 'date-time',
                type: 'string',
              },
            },
            type: 'object',
            additionalProperties: false,
          },
          type: 'array',
        },
        name: {
          description:
            'Name must be unique within a namespace. Is required when creating resources, although some resources may allow a client to request the generation of an appropriate name automatically. Name is primarily intended for creation idempotence and configuration definition. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/identifiers#names',
          type: 'string',
        },
        namespace: {
          description:
            'Namespace defines the space within which each name must be unique. An empty namespace is equivalent to the "default" namespace, but "default" is the canonical representation. Not all objects are required to be scoped to a namespace - the value of this field for those objects will be empty.\n\nMust be a DNS_LABEL. Cannot be updated. More info: http://kubernetes.io/docs/user-guide/namespaces',
          type: 'string',
        },
        ownerReferences: {
          description:
            'List of objects depended by this object. If ALL objects in the list have been deleted, this object will be garbage collected. If this object is managed by a controller, then an entry in this list will point to this controller, with the controller field set to true. There cannot be more than one managing controller.',
          items: {
            description:
              'OwnerReference contains enough information to let you identify an owning object. An owning object must be in the same namespace as the dependent, or be cluster-scoped, so there is no namespace field.',
            properties: {
              apiVersion: {
                description: 'API version of the referent.',
                type: 'string',
              },
              blockOwnerDeletion: {
                description:
                  'If true, AND if the owner has the "foregroundDeletion" finalizer, then the owner cannot be deleted from the key-value store until this reference is removed. Defaults to false. To set this field, a user needs "delete" permission of the owner, otherwise 422 (Unprocessable Entity) will be returned.',
                type: 'boolean',
              },
              controller: {
                description: 'If true, this reference points to the managing controller.',
                type: 'boolean',
              },
              kind: {
                description:
                  'Kind of the referent. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds',
                type: 'string',
              },
              name: {
                description: 'Name of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#names',
                type: 'string',
              },
              uid: {
                description: 'UID of the referent. More info: http://kubernetes.io/docs/user-guide/identifiers#uids',
                type: 'string',
              },
            },
            required: ['apiVersion', 'kind', 'name', 'uid'],
            type: 'object',
            'x-kubernetes-map-type': 'atomic',
            additionalProperties: false,
          },
          type: 'array',
        },
        resourceVersion: {
          description:
            'An opaque value that represents the internal version of this object that can be used by clients to determine when objects have changed. May be used for optimistic concurrency, change detection, and the watch operation on a resource or set of resources. Clients must treat these values as opaque and passed unmodified back to the server. They may only be valid for a particular resource or set of resources.\n\nPopulated by the system. Read-only. Value must be treated as opaque by clients and . More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency',
          type: 'string',
        },
        selfLink: {
          description:
            'SelfLink is a URL representing this object. Populated by the system. Read-only.\n\nDEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.',
          type: 'string',
        },
        uid: {
          description:
            'UID is the unique in time and space value for this object. It is typically generated by the server on successful creation of a resource and is not allowed to change on PUT operations.\n\nPopulated by the system. Read-only. More info: http://kubernetes.io/docs/user-guide/identifiers#uids',
          type: 'string',
        },
      },
      type: 'object',
      additionalProperties: false,
    },
  },
  type: 'object',
  additionalProperties: false,
};
