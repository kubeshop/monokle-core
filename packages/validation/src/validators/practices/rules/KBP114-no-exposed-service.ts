import {defineRule} from '../../custom/config.js';
import {isService} from '../../custom/schemas/service.v1.js';

export const noExposedService = defineRule({
  id: 114,
  description: 'Disallow exposing services publicly.',
  fullDescription:
    'Exposed services are those who are not of the "ClusterIP" type. This practice hints that an ingress should be used instead.',
  help: 'Use ClusterIP services and expose it through an ingress.',
  advanced: {
    enabled: false,
    severity: 5,
  },
  validate({resources}, {report}) {
    resources.filter(isService).forEach(service => {
      const valid = service.spec?.type === undefined || service.spec.type === 'ClusterIP';
      if (valid) return;
      report(service, {
        path: 'spec.type',
      });
    });
  },
});
