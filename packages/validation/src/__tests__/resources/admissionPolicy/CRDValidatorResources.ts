import {Resource} from '../../../common/types.js';

export const CRD: Resource = {
  fileId: 'd4fc87d28c6bd',
  filePath: 'crd.yaml',
  fileOffset: 0,
  text: 'apiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata:\n  name: mycustomresources.example.com\nspec:\n  group: example.com\n  names:\n    kind: MyCustomResource\n    plural: mycustomresources\n    singular: mycustomresource\n    shortNames:\n      - mcr\n  scope: Namespaced\n  versions:\n    - name: v1\n      schema:\n        openAPIV3Schema:\n          type: object\n          properties:\n            spec:\n              type: object\n              x-kubernetes-validation:\n                - rule: "self.replicas <= self.maxReplicas"\n                  message: "replicas must be less than or equal to maxReplicas"\n              properties:\n                replicas:\n                  type: integer\n                maxReplicas:\n                  type: integer\n              required:\n                - replicas\n                - maxReplicas\n',
  apiVersion: 'apiextensions.k8s.io/v1',
  kind: 'CustomResourceDefinition',
  content: {
    apiVersion: 'apiextensions.k8s.io/v1',
    kind: 'CustomResourceDefinition',
    metadata: {
      name: 'mycustomresources.example.com',
    },
    spec: {
      group: 'example.com',
      names: {
        kind: 'MyCustomResource',
        plural: 'mycustomresources',
        singular: 'mycustomresource',
        shortNames: ['mcr'],
      },
      scope: 'Namespaced',
      versions: [
        {
          name: 'v1',
          schema: {
            openAPIV3Schema: {
              type: 'object',
              properties: {
                spec: {
                  type: 'object',
                  'x-kubernetes-validation': [
                    {
                      rule: 'self.replicas <= self.maxReplicas',
                      message: 'replicas must be less than or equal to maxReplicas',
                    },
                  ],
                  properties: {
                    replicas: {
                      type: 'integer',
                    },
                    maxReplicas: {
                      type: 'integer',
                    },
                  },
                  required: ['replicas', 'maxReplicas'],
                },
              },
            },
          },
        },
      ],
    },
  },
  id: 'd4fc87d28c6bd-0',
  name: 'mycustomresources.example.com',
};

export const CRD_2: Resource = {
  fileId: 'd4fc87d28c6bd',
  filePath: 'crd.yaml',
  fileOffset: 0,
  text: 'apiVersion: apiextensions.k8s.io/v1\nkind: CustomResourceDefinition\nmetadata:\n  name: mycustomresources.example.com\nspec:\n  group: example.com\n  names:\n    kind: MyCustomResource\n    plural: mycustomresources\n    singular: mycustomresource\n    shortNames:\n      - mcr\n  scope: Namespaced\n  versions:\n    - name: v1\n      schema:\n        openAPIV3Schema:\n          type: object\n          properties:\n            spec:\n              type: object\n              x-kubernetes-validation:\n                - rule: "self.replicas <= self.maxReplicas"\n                  message: "replicas must be less than or equal to maxReplicas"\n              properties:\n                replicas:\n                  type: integer\n                maxReplicas:\n                  type: integer\n              required:\n                - replicas\n                - maxReplicas\n',
  apiVersion: 'apiextensions.k8s.io/v1',
  kind: 'CustomResourceDefinition',
  content: {
    apiVersion: 'apiextensions.k8s.io/v1',
    kind: 'CustomResourceDefinition',
    metadata: {
      name: 'mycustomresources.example.com',
    },
    spec: {
      group: 'example.com',
      names: {
        kind: 'MyCustomResource',
        plural: 'mycustomresources',
        singular: 'mycustomresource',
        shortNames: ['mcr'],
      },
      scope: 'Namespaced',
      versions: [
        {
          name: 'v1',
          schema: {
            openAPIV3Schema: {
              type: 'object',
              'x-kubernetes-validation': [
                {
                  rule: 'self.spec.replicas <= self.status.maxReplicas',
                  message: 'replicas must be less than or equal to maxReplicas',
                },
              ],
              properties: {
                spec: {
                  type: 'object',
                  properties: {
                    replicas: {
                      type: 'integer',
                    },
                  },
                  required: ['replicas'],
                },
                status: {
                  type: 'object',
                  properties: {
                    maxReplicas: {
                      type: 'integer',
                    },
                  },
                  required: ['maxReplicas'],
                },
              },
            },
          },
        },
      ],
    },
  },
  id: 'd4fc87d28c6bd-0',
  name: 'mycustomresources.example.com',
};

export const CUSTOM_RESOURCE: Resource = {
  fileId: '13cf92c8d3181f',
  filePath: 'custom-resource.yaml',
  fileOffset: 0,
  text: 'apiVersion: example.com/v1\nkind: MyCustomResource\nmetadata:\n  name: my-new-cron-object\nspec:\n  replicas: 20\n  maxReplicas: 10\n',
  apiVersion: 'example.com/v1',
  kind: 'MyCustomResource',
  content: {
    apiVersion: 'example.com/v1',
    kind: 'MyCustomResource',
    metadata: {
      name: 'my-new-cron-object',
    },
    spec: {
      replicas: 20,
      maxReplicas: 10,
    },
  },
  id: '13cf92c8d3181f-0',
  name: 'my-new-cron-object',
};
