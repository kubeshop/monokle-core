import {Volume} from 'kubernetes-types/core/v1.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

type VolumeType = keyof Volume;
const DISALLOWED_VOLUME_TYPES: VolumeType[] = [
  'gcePersistentDisk',
  'awsElasticBlockStore',
  'gitRepo',
  'nfs',
  'iscsi',
  'glusterfs',
  'rbd',
  'flexVolume',
  'cinder',
  'cephfs',
  'flocker',
  'fc',
  'azureFile',
  'vsphereVolume',
  'quobyte',
  'azureDisk',
  'portworxVolume',
  'scaleIO',
  'storageos',
];

export const noNonEphemeralVolumes = defineRule({
  id: 28,
  description: 'Disallow use of non-ephemeral volume types',
  fullDescription: 'Usage of non-ephemeral volume types should be limited to those defined through PersistentVolumes.',
  help: "Do not Set 'spec.volumes[*]' to any of the disallowed volume types.",
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.volumes?.forEach((volume, index) => {
        Object.keys(volume).forEach(key => {
          const hasDisallowedVolume = DISALLOWED_VOLUME_TYPES.includes(key as VolumeType);
          const valid = !hasDisallowedVolume;
          if (valid) return;
          report(resource, {
            path: `${prefix}.volumes.${index}.${key}`,
          });
        });
      });
    });
  },
});
