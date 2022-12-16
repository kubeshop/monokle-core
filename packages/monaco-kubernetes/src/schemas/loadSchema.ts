import { ARGO_APPLICATION_SCHEMA } from './argo-application';
import { CORE_DEPLOYMENT_SCHEMA } from './deployment';

export function loadSchema(schemaId: string) {
  switch (schemaId) {
    case 'io.k8s.api.apps.v1.Deployment': {
      return CORE_DEPLOYMENT_SCHEMA;
    }
    case 'io.argoproj.v1alpha1.Application': {
      return ARGO_APPLICATION_SCHEMA;
    }
    default:
      return undefined;
  }
}
