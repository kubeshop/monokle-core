import {PodSpec, PodTemplateSpec} from 'kubernetes-types/core/v1.js';
import {isStatefulSet} from './schemas/__generated__/statefulset.apps.v1.js';
import {isCronJob} from './schemas/__generated__/cronjob.batch.v1.js';
import {isDaemonSet} from './schemas/__generated__/daemonset.apps.v1.js';
import {isDeployment} from './schemas/__generated__/deployment.apps.v1.js';
import {isJob} from './schemas/__generated__/job.batch.v1.js';
import {isPod} from './schemas/__generated__/pod.v1.js';

export function validatePodSpec(
  resources: any[],
  validateFn: (resource: any, pod: PodSpec, prefix: string) => void
): void {
  resources.forEach(resource => {
    if (isDeployment(resource) || isStatefulSet(resource) || isDaemonSet(resource) || isJob(resource)) {
      const pod = resource.spec?.template.spec;
      if (!pod) return;
      return validateFn(resource, pod, 'spec.template.spec');
    }

    if (isCronJob(resource)) {
      const pod = resource.spec?.jobTemplate.spec?.template.spec;
      if (!pod) return;
      return validateFn(resource, pod, 'spec.jobTemplate.spec.template.spec');
    }

    if (isPod(resource)) {
      const pod = resource.spec;
      if (!pod) return;
      return validateFn(resource, pod, 'spec');
    }
  });
}

export function validatePodTemplate(
  resources: any[],
  validateFn: (resource: any, pod: PodTemplateSpec, prefix: string) => void
): void {
  resources.forEach(resource => {
    if (isDeployment(resource) || isStatefulSet(resource) || isDaemonSet(resource) || isJob(resource)) {
      const template = resource.spec?.template;
      if (!template) return;
      return validateFn(resource, template, 'spec.template');
    }

    if (isCronJob(resource)) {
      const template = resource.spec?.jobTemplate.spec?.template;
      if (!template) return;
      return validateFn(resource, template, 'spec.jobTemplate.spec.template');
    }
  });
}
