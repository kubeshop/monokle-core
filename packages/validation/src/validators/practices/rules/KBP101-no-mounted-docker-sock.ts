import {NSA_RELATIONS} from '../../../taxonomies/nsa.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

export const noMountedDockerSock = defineRule({
  id: 101,
  description: 'Disallow mounting the hostPath volume with docker.sock',
  fullDescription: 'Mounting docker.sock from the host can give the container full root access to the host.',
  help: 'Do not specify `/var/run/docker.sock` in spec.template.volumes.hostPath.path.',
  advanced: {
    relationships: [NSA_RELATIONS['kubernetes-pod-security']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod?.volumes?.forEach((volume, index) => {
        const hostPath = volume.hostPath?.path;
        const valid = hostPath !== '/var/run/docker.sock';
        if (valid) return;
        report(resource, {
          path: `${prefix}.volumes.${index}.hostPath.path`,
        });
      });
    });
  },
});
