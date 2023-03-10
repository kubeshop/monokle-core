import {ResourceGraphProps} from './types';
import { ResourceRefType } from '@monokle/validation';
// @ts-ignore
import ElkWorker from 'elkjs/lib/elk-worker.min.js?worker';

export const ResourceGraphArgs: ResourceGraphProps = {
  resources: [
    {
      fileId: '1a98a97e8da5d3',
      filePath: 'kustomize-happy-cms/overlays/local/database.yaml',
      fileOffset: 15,
      text: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: happy-cms-database-headless\nspec:\n  type: ClusterIP\n  clusterIP: None\n  ports:\n    - name: tcp-postgresql\n      port: 5432\n      targetPort: tcp-postgresql\n  selector:\n    app: postgresql\n',
      apiVersion: 'v1',
      kind: 'Service',
      content: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: 'happy-cms-database-headless',
        },
        spec: {
          type: 'ClusterIP',
          clusterIP: 'None',
          ports: [
            {
              name: 'tcp-postgresql',
              port: 5432,
              targetPort: 'tcp-postgresql',
            },
          ],
          selector: {
            app: 'postgresql',
          },
        },
      },
      id: '1a98a97e8da5d3-1',
      name: 'happy-cms-database-headless',
      refs: [
        {
          type: ResourceRefType.Unsatisfied,
          name: 'postgresql',
          position: {
            line: 13,
            column: 10,
            length: 10,
          },
          target: {
            type: 'resource',
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '657442f457621-0',
          target: {
            type: 'resource',
            resourceId: '657442f457621-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
  ],
  resourceMap: {
    'c9cf721b174f5-0': {
      fileId: 'c9cf721b174f5',
      filePath: 'bundles/simple.yaml',
      fileOffset: 0,
      text: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: blue-cms\n  labels:\n    monokle.io/demo: vanilla-blue-cms\nspec:\n  replicas: "this-should-be-a-number"\n  selector:\n    matchLabels:\n      app: blue-cms\n  template:\n    metadata:\n      labels:\n        app: blue-cms\n    spec:\n      containers:\n        - name: blue-cms\n          image: blue-cms:latest\n          ports:\n            - name: http-web\n              containerPort: 8080\n',
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      content: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: 'blue-cms',
          labels: {
            'monokle.io/demo': 'vanilla-blue-cms',
          },
        },
        spec: {
          replicas: 'this-should-be-a-number',
          selector: {
            matchLabels: {
              app: 'blue-cms',
            },
          },
          template: {
            metadata: {
              labels: {
                app: 'blue-cms',
              },
            },
            spec: {
              containers: [
                {
                  name: 'blue-cms',
                  image: 'blue-cms:latest',
                  ports: [
                    {
                      name: 'http-web',
                      containerPort: 8080,
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      id: 'c9cf721b174f5-0',
      name: 'blue-cms',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'blue-cms',
          position: {
            line: 11,
            column: 12,
            length: 8,
          },
          target: {
            type: 'resource',
            resourceId: 'c9cf721b174f5-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: 'blue-cms',
          position: {
            line: 15,
            column: 14,
            length: 8,
          },
          target: {
            type: 'resource',
            resourceId: 'c9cf721b174f5-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'blue-cms',
          position: {
            line: 19,
            column: 18,
            length: 15,
          },
          target: {
            type: 'image',
            tag: 'latest',
          },
        },
      ],
    },
    'c9cf721b174f5-1': {
      fileId: 'c9cf721b174f5',
      filePath: 'bundles/simple.yaml',
      fileOffset: 23,
      text: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: blue-cms\n  labels:\n    monokle.io/demo: vanilla-blue-cms\nspec:\n  selector:\n    app: blue-INCORRECT_REFERENCE\n  ports:\n    - name: http-web\n      protocol: TCP\n      port: 81\n      targetPort: 8080\n',
      apiVersion: 'v1',
      kind: 'Service',
      content: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: 'blue-cms',
          labels: {
            'monokle.io/demo': 'vanilla-blue-cms',
          },
        },
        spec: {
          selector: {
            app: 'blue-INCORRECT_REFERENCE',
          },
          ports: [
            {
              name: 'http-web',
              protocol: 'TCP',
              port: 81,
              targetPort: 8080,
            },
          ],
        },
      },
      id: 'c9cf721b174f5-1',
      name: 'blue-cms',
      refs: [
        {
          type: ResourceRefType.Unsatisfied,
          name: 'blue-INCORRECT_REFERENCE',
          position: {
            line: 9,
            column: 10,
            length: 24,
          },
          target: {
            type: 'resource',
          },
        },
      ],
    },
    '8482cce672e2-0': {
      fileId: '8482cce672e2',
      filePath: 'crd/argo-application.yaml',
      fileOffset: 0,
      text: 'apiVersion: argoproj.io/v1alpha1\nkind: Application\nmetadata:\n  name: blog\nspec:\n  project: example\n  destination:\n    namespace: blog\n    server: https://kubernetes.default.svc\n  source:\n    path: apps/blog/base\n    repoURL: https://github.com/kubeshop/argo-demo\n    targetRevision: HEAD\n  syncPolicy:\n    automated:\n      prune: false\n      selfHeal: false\n',
      apiVersion: 'argoproj.io/v1alpha1',
      kind: 'Application',
      content: {
        apiVersion: 'argoproj.io/v1alpha1',
        kind: 'Application',
        metadata: {
          name: 'blog',
        },
        spec: {
          project: 'example',
          destination: {
            namespace: 'blog',
            server: 'https://kubernetes.default.svc',
          },
          source: {
            path: 'apps/blog/base',
            repoURL: 'https://github.com/kubeshop/argo-demo',
            targetRevision: 'HEAD',
          },
          syncPolicy: {
            automated: {
              prune: false,
              selfHeal: false,
            },
          },
        },
      },
      id: '8482cce672e2-0',
      name: 'blog',
    },
    '14a12d9a2a5ce-0': {
      fileId: '14a12d9a2a5ce',
      filePath: 'crd/prometheus.yaml',
      fileOffset: 0,
      text: 'apiVersion: monitoring.coreos.com/v1\nkind: Prometheus\nmetadata:\n  name: prometheus\nspec:\n  serviceAccountName: prometheus\n  serviceMonitorSelector:\n    matchLabels:\n      team: frontend\n  resources:\n    requests:\n      memory: 500Mi\n  enableAdminAPI: false\n',
      apiVersion: 'monitoring.coreos.com/v1',
      kind: 'Prometheus',
      content: {
        apiVersion: 'monitoring.coreos.com/v1',
        kind: 'Prometheus',
        metadata: {
          name: 'prometheus',
        },
        spec: {
          serviceAccountName: 'prometheus',
          serviceMonitorSelector: {
            matchLabels: {
              team: 'frontend',
            },
          },
          resources: {
            requests: {
              memory: '500Mi',
            },
          },
          enableAdminAPI: false,
        },
      },
      id: '14a12d9a2a5ce-0',
      name: 'prometheus',
    },
    '177b0b6483e353-0': {
      fileId: '177b0b6483e353',
      filePath: 'kustomize-happy-cms/base/deployment.yaml',
      fileOffset: 0,
      text: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: happy-cms\n  labels:\n    monokle.io/demo: kustomize-happy-cms\nspec:\n  replicas: 6\n  selector:\n    matchLabels:\n      app: happy-cms\n  template:\n    metadata:\n      labels:\n        app: happy-cms\n    spec:\n      containers:\n        - name: happy-cms\n          image: happy-cms:latest\n          ports:\n            - name: http-web\n              containerPort: 8080\n',
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      content: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: 'happy-cms',
          labels: {
            'monokle.io/demo': 'kustomize-happy-cms',
          },
        },
        spec: {
          replicas: 6,
          selector: {
            matchLabels: {
              app: 'happy-cms',
            },
          },
          template: {
            metadata: {
              labels: {
                app: 'happy-cms',
              },
            },
            spec: {
              containers: [
                {
                  name: 'happy-cms',
                  image: 'happy-cms:latest',
                  ports: [
                    {
                      name: 'http-web',
                      containerPort: 8080,
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      id: '177b0b6483e353-0',
      name: 'happy-cms',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'happy-cms',
          position: {
            line: 11,
            column: 12,
            length: 9,
          },
          target: {
            type: 'resource',
            resourceId: '177b0b6483e353-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: 'happy-cms',
          position: {
            line: 15,
            column: 14,
            length: 9,
          },
          target: {
            type: 'resource',
            resourceId: '177b0b6483e353-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'happy-cms',
          position: {
            line: 19,
            column: 18,
            length: 16,
          },
          target: {
            type: 'image',
            tag: 'latest',
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: 'happy-cms',
          position: {
            line: 15,
            column: 14,
            length: 9,
          },
          target: {
            type: 'resource',
            resourceId: '4ec1c5c0875f1-0',
            resourceKind: 'Service',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '1b05e8f11be751-0',
          target: {
            type: 'resource',
            resourceId: '1b05e8f11be751-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
    '1b05e8f11be751-0': {
      fileId: '1b05e8f11be751',
      filePath: 'kustomize-happy-cms/base/kustomization.yaml',
      fileOffset: 0,
      text: 'apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nresources:\n  - service.yaml\n  - deployment.yaml\n',
      apiVersion: 'kustomize.config.k8s.io/v1beta1',
      kind: 'Kustomization',
      content: {
        apiVersion: 'kustomize.config.k8s.io/v1beta1',
        kind: 'Kustomization',
        resources: ['service.yaml', 'deployment.yaml'],
      },
      id: '1b05e8f11be751-0',
      name: 'kustomize-happy-cms/base',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'service.yaml',
          position: {
            line: 4,
            column: 5,
            length: 12,
          },
          target: {
            type: 'resource',
            resourceId: '4ec1c5c0875f1-0',
            resourceKind: 'Service',
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'deployment.yaml',
          position: {
            line: 5,
            column: 5,
            length: 15,
          },
          target: {
            type: 'resource',
            resourceId: '177b0b6483e353-0',
            resourceKind: 'Deployment',
          },
        },
      ],
    },
    '4ec1c5c0875f1-0': {
      fileId: '4ec1c5c0875f1',
      filePath: 'kustomize-happy-cms/base/service.yaml',
      fileOffset: 0,
      text: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: happy-cms\n  labels:\n    monokle.io/demo: kustomize-happy-cms\nspec:\n  selector:\n    app: happy-cms\n  ports:\n    - name: http-web\n      protocol: TCP\n      port: 80\n      targetPort: 8080\n',
      apiVersion: 'v1',
      kind: 'Service',
      content: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: 'happy-cms',
          labels: {
            'monokle.io/demo': 'kustomize-happy-cms',
          },
        },
        spec: {
          selector: {
            app: 'happy-cms',
          },
          ports: [
            {
              name: 'http-web',
              protocol: 'TCP',
              port: 80,
              targetPort: 8080,
            },
          ],
        },
      },
      id: '4ec1c5c0875f1-0',
      name: 'happy-cms',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'happy-cms',
          position: {
            line: 9,
            column: 10,
            length: 9,
          },
          target: {
            type: 'resource',
            resourceId: '177b0b6483e353-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '1b05e8f11be751-0',
          target: {
            type: 'resource',
            resourceId: '1b05e8f11be751-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
    '1a98a97e8da5d3-0': {
      fileId: '1a98a97e8da5d3',
      filePath: 'kustomize-happy-cms/overlays/local/database.yaml',
      fileOffset: 0,
      text: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: happy-cms-database\n  labels:\n    monokle.io/demo: kustomize-happy-cms\nspec:\n  selector:\n    app: happy-cms-database\n  ports:\n    - name: pg\n      protocol: TCP\n      port: 5432\n      targetPort: 5432\n',
      apiVersion: 'v1',
      kind: 'Service',
      content: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: 'happy-cms-database',
          labels: {
            'monokle.io/demo': 'kustomize-happy-cms',
          },
        },
        spec: {
          selector: {
            app: 'happy-cms-database',
          },
          ports: [
            {
              name: 'pg',
              protocol: 'TCP',
              port: 5432,
              targetPort: 5432,
            },
          ],
        },
      },
      id: '1a98a97e8da5d3-0',
      name: 'happy-cms-database',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'happy-cms-database',
          position: {
            line: 9,
            column: 10,
            length: 18,
          },
          target: {
            type: 'resource',
            resourceId: '1a98a97e8da5d3-2',
            resourceKind: 'StatefulSet',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '657442f457621-0',
          target: {
            type: 'resource',
            resourceId: '657442f457621-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
    '1a98a97e8da5d3-1': {
      fileId: '1a98a97e8da5d3',
      filePath: 'kustomize-happy-cms/overlays/local/database.yaml',
      fileOffset: 15,
      text: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: happy-cms-database-headless\nspec:\n  type: ClusterIP\n  clusterIP: None\n  ports:\n    - name: tcp-postgresql\n      port: 5432\n      targetPort: tcp-postgresql\n  selector:\n    app: postgresql\n',
      apiVersion: 'v1',
      kind: 'Service',
      content: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: 'happy-cms-database-headless',
        },
        spec: {
          type: 'ClusterIP',
          clusterIP: 'None',
          ports: [
            {
              name: 'tcp-postgresql',
              port: 5432,
              targetPort: 'tcp-postgresql',
            },
          ],
          selector: {
            app: 'postgresql',
          },
        },
      },
      id: '1a98a97e8da5d3-1',
      name: 'happy-cms-database-headless',
      refs: [
        {
          type: ResourceRefType.Unsatisfied,
          name: 'postgresql',
          position: {
            line: 13,
            column: 10,
            length: 10,
          },
          target: {
            type: 'resource',
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '657442f457621-0',
          target: {
            type: 'resource',
            resourceId: '657442f457621-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
    '1a98a97e8da5d3-2': {
      fileId: '1a98a97e8da5d3',
      filePath: 'kustomize-happy-cms/overlays/local/database.yaml',
      fileOffset: 29,
      text: 'apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n  name: happy-cms-database\nspec:\n  serviceName: database-headless\n  replicas: 1\n  selector:\n    matchLabels:\n      app: happy-cms-database\n  template:\n    metadata:\n      name: happy-cms-database\n      labels:\n        app: happy-cms-database\n    spec:\n      securityContext:\n        fsGroup: 1001\n      containers:\n        - name: postgresql\n          image: docker.io/bitnami/postgresql:11.9.0-debian-10-r1\n          imagePullPolicy: "IfNotPresent"\n          securityContext:\n            runAsUser: 1001\n          envFrom:\n            - configMapRef:\n                name: database-env\n          ports:\n            - name: tcp-postgresql\n              containerPort: 5432\n          livenessProbe:\n            exec:\n              command:\n                - /bin/sh\n                - -c\n                - exec pg_isready -U postgres\n            initialDelaySeconds: 30\n          readinessProbe:\n            exec:\n              command:\n                - /bin/sh\n                - -c\n                - exec pg_isready -U postgres\n            initialDelaySeconds: 15\n          volumeMounts:\n            - name: dshm\n              mountPath: /dev/shm\n            - name: database-data\n              mountPath: /bitnami/postgresql\n      volumes:\n        - name: dshm\n          emptyDir:\n            medium: Memory\n            sizeLimit: 1Gi\n  volumeClaimTemplates:\n    - metadata:\n        name: database-data\n      spec:\n        accessModes:\n          - "ReadWriteOnce"\n        resources:\n          requests:\n            storage: "5Gi"\n',
      apiVersion: 'apps/v1',
      kind: 'StatefulSet',
      content: {
        apiVersion: 'apps/v1',
        kind: 'StatefulSet',
        metadata: {
          name: 'happy-cms-database',
        },
        spec: {
          serviceName: 'database-headless',
          replicas: 1,
          selector: {
            matchLabels: {
              app: 'happy-cms-database',
            },
          },
          template: {
            metadata: {
              name: 'happy-cms-database',
              labels: {
                app: 'happy-cms-database',
              },
            },
            spec: {
              securityContext: {
                fsGroup: 1001,
              },
              containers: [
                {
                  name: 'postgresql',
                  image: 'docker.io/bitnami/postgresql:11.9.0-debian-10-r1',
                  imagePullPolicy: 'IfNotPresent',
                  securityContext: {
                    runAsUser: 1001,
                  },
                  envFrom: [
                    {
                      configMapRef: {
                        name: 'database-env',
                      },
                    },
                  ],
                  ports: [
                    {
                      name: 'tcp-postgresql',
                      containerPort: 5432,
                    },
                  ],
                  livenessProbe: {
                    exec: {
                      command: ['/bin/sh', '-c', 'exec pg_isready -U postgres'],
                    },
                    initialDelaySeconds: 30,
                  },
                  readinessProbe: {
                    exec: {
                      command: ['/bin/sh', '-c', 'exec pg_isready -U postgres'],
                    },
                    initialDelaySeconds: 15,
                  },
                  volumeMounts: [
                    {
                      name: 'dshm',
                      mountPath: '/dev/shm',
                    },
                    {
                      name: 'database-data',
                      mountPath: '/bitnami/postgresql',
                    },
                  ],
                },
              ],
              volumes: [
                {
                  name: 'dshm',
                  emptyDir: {
                    medium: 'Memory',
                    sizeLimit: '1Gi',
                  },
                },
              ],
            },
          },
          volumeClaimTemplates: [
            {
              metadata: {
                name: 'database-data',
              },
              spec: {
                accessModes: ['ReadWriteOnce'],
                resources: {
                  requests: {
                    storage: '5Gi',
                  },
                },
              },
            },
          ],
        },
      },
      id: '1a98a97e8da5d3-2',
      name: 'happy-cms-database',
      refs: [
        {
          type: ResourceRefType.Incoming,
          name: 'happy-cms-database',
          position: {
            line: 15,
            column: 14,
            length: 18,
          },
          target: {
            type: 'resource',
            resourceId: '1a98a97e8da5d3-0',
            resourceKind: 'Service',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'happy-cms-database',
          position: {
            line: 10,
            column: 12,
            length: 18,
          },
          target: {
            type: 'resource',
            resourceId: '1a98a97e8da5d3-2',
            resourceKind: 'StatefulSet',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: 'happy-cms-database',
          position: {
            line: 15,
            column: 14,
            length: 18,
          },
          target: {
            type: 'resource',
            resourceId: '1a98a97e8da5d3-2',
            resourceKind: 'StatefulSet',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Unsatisfied,
          name: 'database-env',
          position: {
            line: 27,
            column: 23,
            length: 12,
          },
          target: {
            type: 'resource',
            resourceKind: 'ConfigMap',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'docker.io/bitnami/postgresql',
          position: {
            line: 21,
            column: 18,
            length: 48,
          },
          target: {
            type: 'image',
            tag: '11.9.0-debian-10-r1',
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '657442f457621-0',
          target: {
            type: 'resource',
            resourceId: '657442f457621-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
    '127ec267212d3a-0': {
      fileId: '127ec267212d3a',
      filePath: 'kustomize-happy-cms/overlays/local/ingress.yaml',
      fileOffset: 0,
      text: 'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: happy-cms\n  labels:\n    name: happy-cms\n    monokle.io/demo: kustomize-happy-cms\nspec:\n  rules:\n    - host: api.example.local\n      http:\n        paths:\n          - path: "/"\n            pathType: Prefix\n            backend:\n              service:\n                name: demo\n                port:\n                  number: 80\n',
      apiVersion: 'networking.k8s.io/v1',
      kind: 'Ingress',
      content: {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'Ingress',
        metadata: {
          name: 'happy-cms',
          labels: {
            name: 'happy-cms',
            'monokle.io/demo': 'kustomize-happy-cms',
          },
        },
        spec: {
          rules: [
            {
              host: 'api.example.local',
              http: {
                paths: [
                  {
                    path: '/',
                    pathType: 'Prefix',
                    backend: {
                      service: {
                        name: 'demo',
                        port: {
                          number: 80,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      id: '127ec267212d3a-0',
      name: 'happy-cms',
      refs: [
        {
          type: ResourceRefType.Unsatisfied,
          name: 'demo',
          position: {
            line: 17,
            column: 23,
            length: 4,
          },
          target: {
            type: 'resource',
            resourceKind: 'Service',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '657442f457621-0',
          target: {
            type: 'resource',
            resourceId: '657442f457621-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
    '657442f457621-0': {
      fileId: '657442f457621',
      filePath: 'kustomize-happy-cms/overlays/local/kustomization.yaml',
      fileOffset: 0,
      text: 'apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nbases:\n  - ../../base\nresources:\n  - ingress.yaml\n  - database.yaml\nconfigMapGenerator:\n  - name: database-env\n    envs:\n      - database.env\n',
      apiVersion: 'kustomize.config.k8s.io/v1beta1',
      kind: 'Kustomization',
      content: {
        apiVersion: 'kustomize.config.k8s.io/v1beta1',
        kind: 'Kustomization',
        bases: ['../../base'],
        resources: ['ingress.yaml', 'database.yaml'],
        configMapGenerator: [
          {
            name: 'database-env',
            envs: ['database.env'],
          },
        ],
      },
      id: '657442f457621-0',
      name: 'kustomize-happy-cms/overlays/local',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'ingress.yaml',
          position: {
            line: 6,
            column: 5,
            length: 12,
          },
          target: {
            type: 'resource',
            resourceId: '127ec267212d3a-0',
            resourceKind: 'Ingress',
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'database.yaml',
          position: {
            line: 7,
            column: 5,
            length: 13,
          },
          target: {
            type: 'resource',
            resourceId: '1a98a97e8da5d3-0',
            resourceKind: 'Service',
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'database.yaml',
          position: {
            line: 7,
            column: 5,
            length: 13,
          },
          target: {
            type: 'resource',
            resourceId: '1a98a97e8da5d3-1',
            resourceKind: 'Service',
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'database.yaml',
          position: {
            line: 7,
            column: 5,
            length: 13,
          },
          target: {
            type: 'resource',
            resourceId: '1a98a97e8da5d3-2',
            resourceKind: 'StatefulSet',
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: '../../base',
          position: {
            line: 4,
            column: 5,
            length: 10,
          },
          target: {
            type: 'file',
            filePath: 'kustomize-happy-cms/base/kustomization.yaml',
          },
        },
      ],
    },
    '1fcb4ebd5fbca7-0': {
      fileId: '1fcb4ebd5fbca7',
      filePath: 'kustomize-happy-cms/overlays/production/add-cloud-sql.yaml',
      fileOffset: 0,
      text: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: happy-cms\nspec:\n  template:\n    spec:\n      containers:\n        - name: happy-cms\n          env:\n            - name: POSTGRES_HOST\n              value: localhost # Override for cloud-sql-proxy\n        - name: cloud-sql-proxy\n          image: gcr.io/cloudsql-docker/gce-proxy:1.17\n          command:\n            - "/cloud_sql_proxy"\n            - "-instances=YOUR-PROJECT-ID:europe-west1:YOUR-SQL-INSTANCE=tcp:54\\\n              32"\n          securityContext:\n            runAsNonRoot: true\n',
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      content: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: 'happy-cms',
        },
        spec: {
          template: {
            spec: {
              containers: [
                {
                  name: 'happy-cms',
                  env: [
                    {
                      name: 'POSTGRES_HOST',
                      value: 'localhost',
                    },
                  ],
                },
                {
                  name: 'cloud-sql-proxy',
                  image: 'gcr.io/cloudsql-docker/gce-proxy:1.17',
                  command: ['/cloud_sql_proxy', '-instances=YOUR-PROJECT-ID:europe-west1:YOUR-SQL-INSTANCE=tcp:5432'],
                  securityContext: {
                    runAsNonRoot: true,
                  },
                },
              ],
            },
          },
        },
      },
      id: '1fcb4ebd5fbca7-0',
      name: 'Patch: happy-cms',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'gcr.io/cloudsql-docker/gce-proxy',
          position: {
            line: 14,
            column: 18,
            length: 37,
          },
          target: {
            type: 'image',
            tag: '1.17',
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '1c57d0f82f9181-0',
          target: {
            type: 'resource',
            resourceId: '1c57d0f82f9181-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
    '1322959fc39a37-0': {
      fileId: '1322959fc39a37',
      filePath: 'kustomize-happy-cms/overlays/production/ingress.yaml',
      fileOffset: 0,
      text: 'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: demo\n  labels:\n    name: demo\n    monokle.io/demo: kustomize-basic\nspec:\n  rules:\n    - host: api.example.com\n      http:\n        paths:\n          - path: "/"\n            pathType: Prefix\n            backend:\n              service:\n                name: demo\n                port:\n                  number: 80\n',
      apiVersion: 'networking.k8s.io/v1',
      kind: 'Ingress',
      content: {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'Ingress',
        metadata: {
          name: 'demo',
          labels: {
            name: 'demo',
            'monokle.io/demo': 'kustomize-basic',
          },
        },
        spec: {
          rules: [
            {
              host: 'api.example.com',
              http: {
                paths: [
                  {
                    path: '/',
                    pathType: 'Prefix',
                    backend: {
                      service: {
                        name: 'demo',
                        port: {
                          number: 80,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      id: '1322959fc39a37-0',
      name: 'demo',
      refs: [
        {
          type: ResourceRefType.Unsatisfied,
          name: 'demo',
          position: {
            line: 17,
            column: 23,
            length: 4,
          },
          target: {
            type: 'resource',
            resourceKind: 'Service',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: '1c57d0f82f9181-0',
          target: {
            type: 'resource',
            resourceId: '1c57d0f82f9181-0',
            resourceKind: 'Kustomization',
          },
        },
      ],
    },
    '1c57d0f82f9181-0': {
      fileId: '1c57d0f82f9181',
      filePath: 'kustomize-happy-cms/overlays/production/kustomization.yaml',
      fileOffset: 0,
      text: 'apiVersion: kustomize.config.k8s.io/v1beta1\nkind: Kustomization\nbases:\n  - ../../base\nresources:\n  - ingress.yaml\npatchesStrategicMerge:\n  - add-cloud-sql.yaml\n',
      apiVersion: 'kustomize.config.k8s.io/v1beta1',
      kind: 'Kustomization',
      content: {
        apiVersion: 'kustomize.config.k8s.io/v1beta1',
        kind: 'Kustomization',
        bases: ['../../base'],
        resources: ['ingress.yaml'],
        patchesStrategicMerge: ['add-cloud-sql.yaml'],
      },
      id: '1c57d0f82f9181-0',
      name: 'kustomize-happy-cms/overlays/production',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'ingress.yaml',
          position: {
            line: 6,
            column: 5,
            length: 12,
          },
          target: {
            type: 'resource',
            resourceId: '1322959fc39a37-0',
            resourceKind: 'Ingress',
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: '../../base',
          position: {
            line: 4,
            column: 5,
            length: 10,
          },
          target: {
            type: 'file',
            filePath: 'kustomize-happy-cms/base/kustomization.yaml',
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'add-cloud-sql.yaml',
          position: {
            line: 8,
            column: 5,
            length: 18,
          },
          target: {
            type: 'resource',
            resourceId: '1fcb4ebd5fbca7-0',
            resourceKind: 'Deployment',
          },
        },
      ],
    },
    '1ed543166bf16e-0': {
      fileId: '1ed543166bf16e',
      filePath: 'standalone/deployment.yaml',
      fileOffset: 0,
      text: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: bear-blog\n  namespace: third-branch\n  labels:\n    monokle.io/demo: vanilla-bear-blog\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: bear-blog\n  template:\n    metadata:\n      labels:\n        app: bear-blog\n    spec:\n      securityContext:\n        runAsUser: 12000\n        runAsGroup: 11000\n      containers:\n        - name: bear-blog\n          image: bear-blog:latest\n          ports:\n            - name: http-web\n              containerPort: 8080\n        - name: bear-sidecar\n          image: bear-sidecar:latest\n          securityContext:\n            runAsUser: 650\n          ports:\n            - name: http-web\n              containerPort: 8080\n',
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      content: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: 'bear-blog',
          namespace: 'third-branch',
          labels: {
            'monokle.io/demo': 'vanilla-bear-blog',
          },
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: 'bear-blog',
            },
          },
          template: {
            metadata: {
              labels: {
                app: 'bear-blog',
              },
            },
            spec: {
              securityContext: {
                runAsUser: 12000,
                runAsGroup: 11000,
              },
              containers: [
                {
                  name: 'bear-blog',
                  image: 'bear-blog:latest',
                  ports: [
                    {
                      name: 'http-web',
                      containerPort: 8080,
                    },
                  ],
                },
                {
                  name: 'bear-sidecar',
                  image: 'bear-sidecar:latest',
                  securityContext: {
                    runAsUser: 650,
                  },
                  ports: [
                    {
                      name: 'http-web',
                      containerPort: 8080,
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      id: '1ed543166bf16e-0',
      name: 'bear-blog',
      namespace: 'third-branch',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'bear-blog',
          position: {
            line: 12,
            column: 12,
            length: 9,
          },
          target: {
            type: 'resource',
            resourceId: '1ed543166bf16e-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: 'bear-blog',
          position: {
            line: 16,
            column: 14,
            length: 9,
          },
          target: {
            type: 'resource',
            resourceId: '1ed543166bf16e-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'bear-blog',
          position: {
            line: 23,
            column: 18,
            length: 16,
          },
          target: {
            type: 'image',
            tag: 'latest',
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'bear-sidecar',
          position: {
            line: 28,
            column: 18,
            length: 19,
          },
          target: {
            type: 'image',
            tag: 'latest',
          },
        },
      ],
    },
    '119ea841051bfd-0': {
      fileId: '119ea841051bfd',
      filePath: 'vanilla-panda-blog/deployment.yaml',
      fileOffset: 0,
      text: 'apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: panda-blog\n  labels:\n    monokle.io/demo: vanilla-panda-blog\nspec:\n  replicas: 1\n  selector:\n    matchLabels:\n      app: panda-blog\n  template:\n    metadata:\n      labels:\n        app: panda-blog\n    spec:\n      containers:\n        - name: panda-blog\n          image: panda-blog:latest\n          ports:\n            - name: http-web\n              containerPort: 8080\n',
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      content: {
        apiVersion: 'apps/v1',
        kind: 'Deployment',
        metadata: {
          name: 'panda-blog',
          labels: {
            'monokle.io/demo': 'vanilla-panda-blog',
          },
        },
        spec: {
          replicas: 1,
          selector: {
            matchLabels: {
              app: 'panda-blog',
            },
          },
          template: {
            metadata: {
              labels: {
                app: 'panda-blog',
              },
            },
            spec: {
              containers: [
                {
                  name: 'panda-blog',
                  image: 'panda-blog:latest',
                  ports: [
                    {
                      name: 'http-web',
                      containerPort: 8080,
                    },
                  ],
                },
              ],
            },
          },
        },
      },
      id: '119ea841051bfd-0',
      name: 'panda-blog',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'panda-blog',
          position: {
            line: 11,
            column: 12,
            length: 10,
          },
          target: {
            type: 'resource',
            resourceId: '119ea841051bfd-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: 'panda-blog',
          position: {
            line: 15,
            column: 14,
            length: 10,
          },
          target: {
            type: 'resource',
            resourceId: '119ea841051bfd-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'panda-blog',
          position: {
            line: 19,
            column: 18,
            length: 17,
          },
          target: {
            type: 'image',
            tag: 'latest',
          },
        },
        {
          type: ResourceRefType.Incoming,
          name: 'panda-blog',
          position: {
            line: 15,
            column: 14,
            length: 10,
          },
          target: {
            type: 'resource',
            resourceId: '1c3cb4b14df139-0',
            resourceKind: 'Service',
            isOptional: false,
          },
        },
      ],
    },
    '17711d006e67d8-0': {
      fileId: '17711d006e67d8',
      filePath: 'vanilla-panda-blog/ingress.yaml',
      fileOffset: 0,
      text: 'apiVersion: networking.k8s.io/v1\nkind: Ingress\nmetadata:\n  name: panda-blog\n  labels:\n    name: panda-blog\n    monokle.io/demo: vanilla-panda-blog\nspec:\n  rules:\n    - host: api.example.local\n      http:\n        paths:\n          - path: "/"\n            pathType: Prefix\n            backend:\n              service:\n                name: panda-blog\n                port:\n                  number: 80\n',
      apiVersion: 'networking.k8s.io/v1',
      kind: 'Ingress',
      content: {
        apiVersion: 'networking.k8s.io/v1',
        kind: 'Ingress',
        metadata: {
          name: 'panda-blog',
          labels: {
            name: 'panda-blog',
            'monokle.io/demo': 'vanilla-panda-blog',
          },
        },
        spec: {
          rules: [
            {
              host: 'api.example.local',
              http: {
                paths: [
                  {
                    path: '/',
                    pathType: 'Prefix',
                    backend: {
                      service: {
                        name: 'panda-blog',
                        port: {
                          number: 80,
                        },
                      },
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      id: '17711d006e67d8-0',
      name: 'panda-blog',
      refs: [
        {
          type: ResourceRefType.Outgoing,
          name: 'panda-blog',
          position: {
            line: 17,
            column: 23,
            length: 10,
          },
          target: {
            type: 'resource',
            resourceId: '1c3cb4b14df139-0',
            resourceKind: 'Service',
            isOptional: false,
          },
        },
      ],
    },
    '1c3cb4b14df139-0': {
      fileId: '1c3cb4b14df139',
      filePath: 'vanilla-panda-blog/service.yaml',
      fileOffset: 0,
      text: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: panda-blog\n  labels:\n    monokle.io/demo: vanilla-panda-blog\nspec:\n  selector:\n    app: panda-blog\n  ports:\n    - name: http-web\n      protocol: TCP\n      port: 80\n      targetPort: 8080\n',
      apiVersion: 'v1',
      kind: 'Service',
      content: {
        apiVersion: 'v1',
        kind: 'Service',
        metadata: {
          name: 'panda-blog',
          labels: {
            'monokle.io/demo': 'vanilla-panda-blog',
          },
        },
        spec: {
          selector: {
            app: 'panda-blog',
          },
          ports: [
            {
              name: 'http-web',
              protocol: 'TCP',
              port: 80,
              targetPort: 8080,
            },
          ],
        },
      },
      id: '1c3cb4b14df139-0',
      name: 'panda-blog',
      refs: [
        {
          type: ResourceRefType.Incoming,
          name: 'panda-blog',
          position: {
            line: 4,
            column: 9,
            length: 10,
          },
          target: {
            type: 'resource',
            resourceId: '17711d006e67d8-0',
            resourceKind: 'Ingress',
            isOptional: false,
          },
        },
        {
          type: ResourceRefType.Outgoing,
          name: 'panda-blog',
          position: {
            line: 9,
            column: 10,
            length: 10,
          },
          target: {
            type: 'resource',
            resourceId: '119ea841051bfd-0',
            resourceKind: 'Deployment',
            isOptional: false,
          },
        },
      ],
    },
  },
  getProblemsForResource: () => [],
  onSelectResource: () => null,
  onSelectImage: () => null,
  elkWorker: new ElkWorker(),
};
