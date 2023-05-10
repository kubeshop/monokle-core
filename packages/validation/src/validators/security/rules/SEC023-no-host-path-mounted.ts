import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noHostPathMounted = defineRule({
  id: 23,
  description: 'Disallow mounting hostPath volumes',
  fullDescription: 'HostPath volumes must be forbidden.',
  help: "Do not set 'spec.volumes[*].hostPath'.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.volumes?.forEach((volume, index) => {
        const valid = !Boolean(volume.hostPath);
        if (valid) return;
        report(resource, {
          path: `${prefix}.volumes.${index}.hostPath`,
        });
      });
    });
  },
});
