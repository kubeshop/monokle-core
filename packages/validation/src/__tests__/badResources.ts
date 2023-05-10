import {Resource} from '../index.js';

export const BAD_DEPLOYMENT: Resource = {
  fileId: 'vanilla-panda-blog/deployment.yaml',
  filePath: 'vanilla-panda-blog/deployment.yaml',
  fileOffset: 0,
  text:
    'apiVersion: apps/v1\n' +
    'kind: Deployment\n' +
    'metadata:\n' +
    '  name: panda-blog\n' +
    'spec:\n' +
    '  replicas: 1\n' +
    '  selector:\n' +
    '    matchLabels:\n' +
    '      app: panda-blog\n' +
    '  template:\n' +
    '    metadata:\n' +
    '      labels:\n' +
    '        app: panda-blog\n' +
    '    spec:\n' +
    '      containers:\n' +
    '        - name: panda-blog\n' +
    '          image: panda-blog:latest\n' +
    '          securityContext:\n' +
    '            allowPrivilegeEscalation: true\n' +
    '          ports:\n' +
    '            - name: 20\n' +
    '              containerPort: 8080\n' +
    '          env:\n' +
    '            - name: SOME_VALUE\n' +
    '              valueFrom:\n' +
    '                configMapKeyRef:\n' +
    '                  name: some-configmap-name\n' +
    '                  key: some-key\n' +
    '                  optional: true\n',
  name: 'panda-blog',
  id: '31fc266e-be6e-527a-8292-469fe956c0d6',
  apiVersion: 'apps/v1',
  kind: 'Deployment',
  content: {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: {
      name: 'panda-blog',
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
                  name: 20, // kubernetes-schema error
                  containerPort: 8080,
                },
              ],
              securityContext: {
                allowPrivilegeEscalation: true,
              },
              env: [
                {
                  name: 'SOME_VALUE',
                  valueFrom: {
                    configMapKeyRef: {
                      name: 'some-configmap-name',
                      key: 'some-key',
                      optional: true,
                    },
                  },
                },
              ],
            },
          ],
        },
      },
    },
  },
};

export const BAD_SERVICE: Resource = {
  fileId: 'vanilla-panda-blog/service.yaml',
  filePath: 'vanilla-panda-blog/service.yaml',
  fileOffset: 0,
  text: 'apiVersion: v1\nkind: Service\nmetadata:\n  name: panda-blog\n  labels:\n    monokle.io/demo: vanilla-panda-blog\nspec:\n  selector:\n    app: panda-boom\n  ports:\n    - name: http-web\n      protocol: TCP\n      port: 80\n      targetPort: 8080\n',
  name: 'panda-blog',
  id: '047aedde-e54d-51fc-9ae7-860ea5c581bc',
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
        app: 'panda-boom',
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
};

export const RESOURCES = [BAD_DEPLOYMENT, BAD_SERVICE];
