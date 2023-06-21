import {Volume} from 'kubernetes-types/core/v1.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';
import {PSP_RELATIONS} from '../../../taxonomies/psp.js';

type VolumeType = keyof Volume;
const ALLOWED: VolumeType[] = [
  'configMap',
  'csi',
  'downwardAPI',
  'emptyDir',
  'ephemeral',
  'persistentVolumeClaim',
  'projected',
  'secret',
];
const ALLOWED_STRING = ALLOWED.join(', ');

export const volumeTypes = defineRule({
  id: 201,
  description: 'Restrict use of volume types.',
  fullDescription: `The restricted policy only permits the following volume types. The allowed values are ${ALLOWED_STRING}`,
  help: "Set 'spec.volumes[*]' to an allowed volume type.",
  advanced: {
    enabled: false,
    severity: 3,
    relationships: [PSP_RELATIONS['restricted']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.volumes?.forEach((volume, index) => {
        Object.keys(volume).forEach(key => {
          const valid = !ALLOWED.includes(key as VolumeType);
          if (valid) return;
          report(resource, {
            path: `${prefix}.volumes.${index}.${key}`,
          });
        });
      });
    });
  },
});
