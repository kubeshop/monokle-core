import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../utils.js';

export const noMountedDockerSock = defineRule({
  id: 6,
  description: 'Disallow mounteing the hostPath volume with docker.sock',
  fullDescription: 'Mounting docker.sock from the host can give the container full root access to the host.',
  help: 'Do not specify `/var/run/docker.sock` in spec.template.volumes.hostPath.path.',
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
