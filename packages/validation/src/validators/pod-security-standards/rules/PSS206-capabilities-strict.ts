import {PSS_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

const REQUIRED_DROP = 'ALL'; // Any list of capabilities that includes ALL
const ALLOWED_ADD = ['NET_BIND_SERVICE'];

export const capabilitiesStrict = defineRule({
  id: 206,
  description: 'Limit pod capabilities strictly.',
  fullDescription: `Containers must drop ALL capabilities, and are only permitted to add back the NET_BIND_SERVICE capability.`,
  help: 'Drop all capabilities.',
  advanced: {
    enabled: false,
    severity: 8,
    relationships: [PSS_RELATIONS['restricted']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const validDrop = container.securityContext?.capabilities?.drop?.some(c => c === REQUIRED_DROP) ?? false;
        if (!validDrop) {
          report(resource, {
            path: `${prefix}.initContainers.${index}.securityContext.capabilities.drop`,
          });
        }

        const validAdd = container.securityContext?.capabilities?.add?.every(c => ALLOWED_ADD.includes(c)) ?? true;
        if (!validAdd) {
          report(resource, {
            path: `${prefix}.initContainers.${index}.securityContext.capabilities.add`,
          });
        }
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const validDrop = container.securityContext?.capabilities?.drop?.some(c => c === REQUIRED_DROP) ?? false;
        if (!validDrop) {
          report(resource, {
            path: `${prefix}.ephemeralContainers.${index}.securityContext.capabilities.drop`,
          });
        }

        const validAdd = container.securityContext?.capabilities?.add?.every(c => ALLOWED_ADD.includes(c)) ?? true;
        if (!validAdd) {
          report(resource, {
            path: `${prefix}.ephemeralContainers.${index}.securityContext.capabilities.add`,
          });
        }
      });

      pod.containers.forEach((container, index) => {
        const validDrop = container.securityContext?.capabilities?.drop?.some(c => c === REQUIRED_DROP) ?? false;
        if (!validDrop) {
          report(resource, {
            path: `${prefix}.containers.${index}.securityContext.capabilities.drop`,
          });
        }

        const validAdd = container.securityContext?.capabilities?.add?.every(c => ALLOWED_ADD.includes(c)) ?? true;
        if (!validAdd) {
          report(resource, {
            path: `${prefix}.containers.${index}.securityContext.capabilities.add`,
          });
        }
      });
    });
  },
  fix({resource, path}, {get, set}) {
    if (path.endsWith('.drop')) {
      set(resource, path, ['ALL']);
      return {description: 'Drops all capabilities. You might end up with a degraded service.'};
    }
    if (path.endsWith('.add')) {
      const capabilities = get(resource, path);
      if (!Array.isArray(capabilities)) return;
      const allowedCapabilities = capabilities.filter(c => ALLOWED_ADD.includes(c));
      set(resource, path, allowedCapabilities);
      return {description: 'Removes disallowed capabilities. You might end up with a degraded service.'};
    }
  },
});
