import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

const ALLOWED_DROP = 'ALL'; // Any list of capabilities that includes ALL
const ALLOWED_ADD = ['NET_BIND_SERVICE'];

export const capabilitiesStrict = defineRule({
  id: 206,
  description: 'Limit pod capabilities strictly.',
  fullDescription: `Containers must drop ALL capabilities, and are only permitted to add back the NET_BIND_SERVICE capability.`,
  help: 'Drop all capabilities.',
  advanced: {
    relationships: [PSP_RELATIONS['baseline']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const validDrop = container.securityContext?.capabilities?.drop?.some(c => c === ALLOWED_DROP) ?? false;
        if (validDrop) {
          report(resource, {
            path: `${prefix}.initContainers.${index}.securityContext.capabilities.drop`,
          });
        }

        const validAdd = container.securityContext?.capabilities?.add?.every(c => ALLOWED_ADD.includes(c));
        if (validAdd) {
          report(resource, {
            path: `${prefix}.initContainers.${index}.securityContext.capabilities.add`,
          });
        }
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const validDrop = container.securityContext?.capabilities?.drop?.some(c => c === ALLOWED_DROP) ?? false;
        if (validDrop) {
          report(resource, {
            path: `${prefix}.ephemeralContainers.${index}.securityContext.capabilities.drop`,
          });
        }

        const validAdd = container.securityContext?.capabilities?.add?.every(c => ALLOWED_ADD.includes(c));
        if (validAdd) {
          report(resource, {
            path: `${prefix}.ephemeralContainers.${index}.securityContext.capabilities.add`,
          });
        }
      });

      pod.containers.forEach((container, index) => {
        const validDrop = container.securityContext?.capabilities?.drop?.some(c => c === ALLOWED_DROP) ?? false;
        if (validDrop) {
          report(resource, {
            path: `${prefix}.containers.${index}.securityContext.capabilities.drop`,
          });
        }

        const validAdd = container.securityContext?.capabilities?.add?.every(c => ALLOWED_ADD.includes(c));
        if (validAdd) {
          report(resource, {
            path: `${prefix}.containers.${index}.securityContext.capabilities.add`,
          });
        }
      });
    });
  },
});
