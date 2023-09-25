import {PodSpec, PodTemplateSpec} from 'kubernetes-types/core/v1.js';
import {isStatefulSet} from './schemas/statefulset.apps.v1.js';
import {isCronJob} from './schemas/cronjob.batch.v1.js';
import {isDaemonSet} from './schemas/daemonset.apps.v1.js';
import {isDeployment} from './schemas/deployment.apps.v1.js';
import {isJob} from './schemas/job.batch.v1.js';
import {isPod} from './schemas/pod.v1.js';
import {YamlPath} from '../../common/types.js';

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

export function isContainerPrefix(currentPath: YamlPath): boolean {
  return currentPath.at(-2) === 'containers';
}

export function isPodPrefix(currentPath: YamlPath, resourceKind: string): boolean {
  if (resourceKind === 'pod') {
    return currentPath.join('.') === 'spec';
  }
  if (resourceKind === 'CronJob') {
    return currentPath.join('.') === 'spec.jobTemplate.spec.template.spec';
  }
  if (['Deployment', 'StatefulSet', 'DaemonSet'].includes(resourceKind)) {
    return currentPath.join('.') === 'spec.template.spec';
  }
  return false;
}
