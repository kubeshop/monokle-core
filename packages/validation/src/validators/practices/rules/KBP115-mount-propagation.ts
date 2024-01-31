import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const mountPropagation = defineRule({
  id: 115,
  description: 'Prohibit bidirectional mount propagation',
  fullDescription:
    'Bidirectional mount propagation can be dangerous. It can damage the host operating system and therefore it is allowed only in privileged containers. Familiarity with Linux kernel behavior is strongly recommended. In addition, any volume mounts created by containers in pods must be destroyed (unmounted) by the containers on termination.',
  help: 'Do not set Bidirectional mount propagations.',
  advanced: {
    enabled: false,
    severity: 7,
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, i) => {
        container.volumeMounts?.forEach((volume, j) => {
          const invalid = volume.mountPropagation === 'Bidirectional';
          if (!invalid) return;
          report(resource, {
            path: `${prefix}.initContainers.${i}.volumeMounts.${j}.mountPropagation`,
          });
        });
      });
      pod.containers.forEach((container, i) => {
        container.volumeMounts?.forEach((volume, j) => {
          const invalid = volume.mountPropagation === 'Bidirectional';
          if (!invalid) return;
          report(resource, {
            path: `${prefix}.containers.${i}.volumeMounts.${j}.mountPropagation`,
          });
        });
      });
    });
  },
});
