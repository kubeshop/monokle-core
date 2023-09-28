import {Resource} from '../../../common/types.js';

export const PARAMS_CONFIG_MAP: Resource = {
  fileId: '174d42e877a174',
  filePath: 'config-map.yaml',
  fileOffset: 0,
  text: 'apiVersion: v1\nkind: ConfigMap\nmetadata:\n  name: rule-config\n  namespace: demo\nmaxReplicas: 5\n',
  apiVersion: 'v1',
  kind: 'ConfigMap',
  content: {
    apiVersion: 'v1',
    kind: 'ConfigMap',
    metadata: {
      name: 'rule-config',
      namespace: 'demo',
    },
    maxReplicas: 5,
  },
  id: '174d42e877a174-0',
  name: 'rule-config',
  namespace: 'demo',
};

export const PARAMS_DEPLOYMENT: Resource = {
  fileId: '2f92c46b9eb02',
  filePath: 'deployment.yaml',
  fileOffset: 0,
  text: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\n  namespace: demo\n  labels:\n    app: nginx\nspec:\n  replicas: 5\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n        - name: nginx\n          image: nginx:1.14.2\n          ports:\n            - containerPort: 80\n',
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  content: {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      name: 'nginx-deployment',
      namespace: 'demo',
      labels: {
        app: 'nginx',
      },
    },
    spec: {
      replicas: 4,
      selector: {
        matchLabels: {
          app: 'nginx',
        },
      },
      template: {
        metadata: {
          labels: {
            app: 'nginx',
          },
        },
        spec: {
          containers: [
            {
              name: 'nginx',
              image: 'nginx:1.14.2',
              ports: [
                {
                  containerPort: 80,
                },
              ],
            },
          ],
        },
      },
    },
  },
  id: '2f92c46b9eb02-0',
  name: 'nginx-deployment',
  namespace: 'demo',
};

export const PARAMS_NAMESPACE: Resource = {
  fileId: '1926d9cf253e4c',
  filePath: 'namespace.yaml',
  fileOffset: 0,
  text: 'apiVersion: v1\nkind: Namespace\nmetadata:\n  name: demo\n  labels:\n    environment: test\n',
  apiVersion: 'v1',
  kind: 'Namespace',
  content: {
    apiVersion: 'v1',
    kind: 'Namespace',
    metadata: {
      name: 'demo',
      labels: {
        environment: 'test',
      },
    },
  },
  id: '1926d9cf253e4c-0',
  name: 'demo',
};

export const PARAMS_VALIDATING_ADMISSION_POLICY: Resource = {
  fileId: '18acb3eb78d60',
  filePath: 'policy.yaml',
  fileOffset: 0,
  text: 'apiVersion: admissionregistration.k8s.io/v1beta1\nkind: ValidatingAdmissionPolicy\nmetadata:\n  name: "demo-policy.example.com"\nspec:\n  paramKind:\n    apiVersion: v1\n    kind: ConfigMap\n  matchConstraints:\n    resourceRules:\n      - apiGroups: [ "apps" ]\n        apiVersions: [ "v1" ]\n        operations: [ "CREATE", "UPDATE" ]\n        resources: [ "deployments" ]\n  validations:\n    - expression: "object.spec.replicas > 6"\n',
  apiVersion: 'admissionregistration.k8s.io/v1beta1',
  kind: 'ValidatingAdmissionPolicy',
  content: {
    apiVersion: 'admissionregistration.k8s.io/v1beta1',
    kind: 'ValidatingAdmissionPolicy',
    metadata: {
      name: 'demo-policy.example.com',
    },
    spec: {
      paramKind: {
        apiVersion: 'v1',
        kind: 'ConfigMap',
      },
      matchConstraints: {
        resourceRules: [
          {
            apiGroups: ['apps'],
            apiVersions: ['v1'],
            operations: ['CREATE', 'UPDATE'],
            resources: ['deployments'],
          },
        ],
      },
      validations: [
        {
          expression: 'object.spec.replicas > params.maxReplicas',
        },
      ],
    },
  },
  id: '18acb3eb78d60-0',
  name: 'demo-policy.example.com',
};

export const PARAMS_VALIDATING_ADMISSION_POLICY_BINDING: Resource = {
  fileId: '19b972898cc6be',
  filePath: 'policy-binding.yaml',
  fileOffset: 0,
  text: 'apiVersion: admissionregistration.k8s.io/v1beta1\nkind: ValidatingAdmissionPolicyBinding\nmetadata:\n  name: "demo-binding-test.example.com"\nspec:\n  policyName: "demo-policy.example.com"\n  paramRef:\n    name: rule-config\n    namespace: demo\n  validationActions: [ Deny ]\n  matchResources:\n    namespaceSelector:\n      matchLabels:\n        environment: test\n',
  apiVersion: 'admissionregistration.k8s.io/v1beta1',
  kind: 'ValidatingAdmissionPolicyBinding',
  content: {
    apiVersion: 'admissionregistration.k8s.io/v1beta1',
    kind: 'ValidatingAdmissionPolicyBinding',
    metadata: {
      name: 'demo-binding-test.example.com',
    },
    spec: {
      policyName: 'demo-policy.example.com',
      paramRef: {
        name: 'rule-config',
        namespace: 'demo',
      },
      validationActions: ['Deny'],
      matchResources: {
        namespaceSelector: {
          matchLabels: {
            environment: 'test',
          },
        },
      },
    },
  },
  id: '19b972898cc6be-0',
  name: 'demo-binding-test.example.com',
};
