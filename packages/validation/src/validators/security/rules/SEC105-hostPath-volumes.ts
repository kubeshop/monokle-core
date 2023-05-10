import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

// Duplicate of SEC023
export const hostPathVolumes = defineRule({
  id: 105,
  description: 'Restrict host path volumes.',
  fullDescription: `Host path volumes can lead to privilege escalation attacks.`,
  help: 'Do not use volumes.hostPath.',
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
  },
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
