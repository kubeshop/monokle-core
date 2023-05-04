import {expect, it} from 'vitest';
import {Resource, createDefaultMonokleValidator} from '../index.js';
import YAML from 'yaml';

import 'isomorphic-fetch';

it('should work with custom schemas', async () => {
  const validator = createDefaultMonokleValidator();

  await validator.preload({
    plugins: {'kubernetes-schema': true},
  });

  const schema = YAML.parse(GATEWAY_SCHEMA);
  await validator.registerCustomSchema({
    kind: 'Gateway',
    apiVersion: 'networking.istio.io/v1alpha3',
    schema: schema,
  });

  const resources = [BAD_CUSTOM_RESOURCE];
  const response = await validator.validate({resources});

  // uncomment to debug
  // response.runs.forEach((r) =>
  //   r.results.forEach((result) => {
  //     console.error(result.ruleId, result.message.text);
  //   })
  // );

  const hasErrors = response.runs.reduce((sum, r) => sum + r.results.length, 0);
  expect(hasErrors).toMatchInlineSnapshot('1');
});

const BAD_CUSTOM_RESOURCE: Resource = {
  fileId: 'networking/gateway.yaml',
  filePath: 'networking/gateway.yaml',
  fileOffset: 0,
  text: 'apiVersion: networking.istio.io/v1alpha3\nkind: Gateway\nmetadata:\n  name: bookinfo-gateway\nspec:\n  selector:\n    istio: ingressgateway # use istio default controller\n  servers:\n    - port:\n        number: 80\n        name: http\n        protocol: HTTP\n      hosts:\n        - "*"\n',
  apiVersion: 'networking.istio.io/v1alpha3',
  kind: 'Gateway',
  content: {
    apiVersion: 'networking.istio.io/v1alpha3',
    kind: 'Gateway',
    metadata: {
      name: 'bookinfo-gateway',
    },
    spec: {
      selector: {
        istio: 'ingressgateway',
      },
      servers: [
        {
          port: {
            number: 'VALIDATION_THIS_SHOULD_BE_A_NUMBER',
            name: 'http',
            protocol: 'HTTP',
          },
          hosts: ['*'],
        },
      ],
    },
  },
  id: '0e339786-de2a-5c74-bbd7-c3e3509147fd',
  name: 'bookinfo-gateway',
};

const GATEWAY_SCHEMA = `properties:
  spec:
    description: 'Configuration affecting edge load balancer. See more details at:
      https://istio.io/docs/reference/config/networking/gateway.html'
    properties:
      selector:
        additionalProperties:
          type: string
        type: object
      servers:
        description: A list of server specifications.
        items:
          properties:
            bind:
              type: string
            defaultEndpoint:
              type: string
            hosts:
              description: One or more hosts exposed by this gateway.
              items:
                type: string
              type: array
            name:
              description: An optional name of the server, when set must be unique across all
                servers.
              type: string
            port:
              properties:
                name:
                  description: Label assigned to the port.
                  type: string
                number:
                  description: A valid non-negative integer port number.
                  type: integer
                protocol:
                  description: The protocol exposed on the port.
                  type: string
                targetPort:
                  type: integer
              type: object
            tls:
              description: Set of TLS related options that govern the server's behavior.
              properties:
                caCertificates:
                  description: REQUIRED if mode is MUTUAL.
                  type: string
                cipherSuites:
                  description: 'Optional: If specified, only support the specified cipher list.'
                  items:
                    type: string
                  type: array
                credentialName:
                  type: string
                httpsRedirect:
                  type: boolean
                maxProtocolVersion:
                  description: 'Optional: Maximum TLS protocol version.'
                  enum:
                    - TLS_AUTO
                    - TLSV1_0
                    - TLSV1_1
                    - TLSV1_2
                    - TLSV1_3
                  type: string
                minProtocolVersion:
                  description: 'Optional: Minimum TLS protocol version.'
                  enum:
                    - TLS_AUTO
                    - TLSV1_0
                    - TLSV1_1
                    - TLSV1_2
                    - TLSV1_3
                  type: string
                mode:
                  enum:
                    - PASSTHROUGH
                    - SIMPLE
                    - MUTUAL
                    - AUTO_PASSTHROUGH
                    - ISTIO_MUTUAL
                  type: string
                privateKey:
                  description: REQUIRED if mode is SIMPLE or MUTUAL.
                  type: string
                serverCertificate:
                  description: REQUIRED if mode is SIMPLE or MUTUAL.
                  type: string
                subjectAltNames:
                  items:
                    type: string
                  type: array
                verifyCertificateHash:
                  items:
                    type: string
                  type: array
                verifyCertificateSpki:
                  items:
                    type: string
                  type: array
              type: object
          type: object
        type: array
    type: object
  status:
    type: object
type: object`;
