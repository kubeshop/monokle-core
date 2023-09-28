import {Resource} from '../../../common/types.js';

export const VALIDATING_ADMISSION_POLICY: Resource = {
  fileId: '18acb3eb78d60',
  filePath: 'policy.yaml',
  fileOffset: 0,
  text: 'apiVersion: admissionregistration.k8s.io/v1beta1\nkind: ValidatingAdmissionPolicy\nmetadata:\n  name: "demo-policy.example.com"\nspec:\n  failurePolicy: Fail\n  matchConstraints:\n    resourceRules:\n      - apiGroups: [ "apps" ]\n        apiVersions: [ "v1" ]\n        operations: [ "CREATE", "UPDATE" ]\n        resources: [ "deployments" ]\n  validations:\n    - expression: "object.spec.replicas > 3"\n',
  apiVersion: 'admissionregistration.k8s.io/v1beta1',
  kind: 'ValidatingAdmissionPolicy',
  content: {
    apiVersion: 'admissionregistration.k8s.io/v1beta1',
    kind: 'ValidatingAdmissionPolicy',
    metadata: {
      name: 'demo-policy.example.com',
    },
    spec: {
      failurePolicy: 'Fail',
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
          expression: 'object.spec.replicas > 3',
        },
      ],
    },
  },
  id: '18acb3eb78d60-0',
  name: 'demo-policy.example.com',
};

export const VALIDATING_ADMISSION_POLICY_BINDING: Resource = {
  fileId: '19b972898cc6be',
  filePath: 'policy-binding.yaml',
  fileOffset: 0,
  text: 'apiVersion: admissionregistration.k8s.io/v1beta1\nkind: ValidatingAdmissionPolicyBinding\nmetadata:\n  name: "demo-binding-test.example.com"\nspec:\n  policyName: "demo-policy.example.com"\n  validationActions: [ Deny ]\n  matchResources:\n    namespaceSelector:\n      matchLabels:\n        environment: test\n',
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

export const NAMESPACE: Resource = {
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

export const DEPLOYMENT: Resource = {
  fileId: '2f92c46b9eb02',
  filePath: 'deployment.yaml',
  fileOffset: 0,
  text: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\n  namespace: demo\n  labels:\n    app: nginx\nspec:\n  replicas: 5\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n        - name: nginx\n          image: nginx:1.14.2\n          ports:\n            - containerPort: 80\n          securityContext:\n            runAsNonRoot: true\n            capabilities:\n              drop:\n                - ALL\n            runAsUser: 10001\n            runAsGroup: 10001\n            readOnlyRootFilesystem: true\n      automountServiceAccountToken: false\n      securityContext:\n        seccompProfile:\n          type: RuntimeDefault\n',
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
      replicas: 2,
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
              securityContext: {
                runAsNonRoot: true,
                capabilities: {
                  drop: ['ALL'],
                },
                runAsUser: 10001,
                runAsGroup: 10001,
                readOnlyRootFilesystem: true,
              },
            },
          ],
          automountServiceAccountToken: false,
          securityContext: {
            seccompProfile: {
              type: 'RuntimeDefault',
            },
          },
        },
      },
    },
  },
  id: '2f92c46b9eb02-0',
  name: 'nginx-deployment',
  namespace: 'demo',
};
