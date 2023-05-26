import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const hostPathVolumes = defineRule({
  id: 105,
  description: 'Restrict host path volumes.',
  fullDescription: `Host path volumes can lead to privilege escalation attacks.`,
  help: 'Do not use volumes.hostPath.',
  advanced: {
    severity: 8,
    relationships: [PSP_RELATIONS['baseline'], PSP_RELATIONS['restricted']],
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
