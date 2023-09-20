import {PSS_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodSpec} from '../../custom/utils.js';

const ALLOWED = [
  'AUDIT_WRITE',
  'CHOWN',
  'DAC_OVERRIDE',
  'FOWNER',
  'FSETID',
  'KILL',
  'MKNOD',
  'NET_BIND_SERVICE',
  'SETFCAP',
  'SETGID',
  'SETPCAP',
  'SETUID',
  'SYS_CHROOT',
];

const ALLOWED_STRING = ALLOWED.join(', ');

export const capabilities = defineRule({
  id: 104,
  description: 'Limit pod capabilities.',
  fullDescription: `Adding additional capabilities beyond those listed below must be disallowed as they can escalate privileges. The allowed values are ${ALLOWED_STRING}.`,
  help: "Only use allowed values in 'securityContext.capabilities.add'.",
  advanced: {
    severity: 8,
    relationships: [PSS_RELATIONS['baseline'], PSS_RELATIONS['restricted']],
  },
  validate({resources}, {report}) {
    validatePodSpec(resources, (resource, pod, prefix) => {
      pod.initContainers?.forEach((container, index) => {
        const capabilities = container.securityContext?.capabilities?.add;
        const usesAllowedCapabilities = capabilities?.every(capability => ALLOWED.includes(capability)) ?? true;
        const valid = usesAllowedCapabilities;

        if (valid) return;
        report(resource, {
          path: `${prefix}.initContainers.${index}.securityContext.capabilities.add`,
        });
      });

      pod.ephemeralContainers?.forEach((container, index) => {
        const capabilities = container.securityContext?.capabilities?.add;
        const usesAllowedCapabilities = capabilities?.every(capability => ALLOWED.includes(capability)) ?? true;
        const valid = usesAllowedCapabilities;

        if (valid) return;
        report(resource, {
          path: `${prefix}.ephemeralContainers.${index}.securityContext.capabilities.add`,
        });
      });

      pod.containers.forEach((container, index) => {
        const capabilities = container.securityContext?.capabilities?.add;
        const usesAllowedCapabilities = capabilities?.every(capability => ALLOWED.includes(capability)) ?? true;
        const valid = usesAllowedCapabilities;

        if (valid) return;
        report(resource, {
          path: `${prefix}.containers.${index}.securityContext.capabilities.add`,
        });
      });
    });
  },
  fix({resource, path, problem}, {get, set}) {
    const capabilities = get(resource, path);
    if (!Array.isArray(capabilities)) return;
    set(
      resource,
      path,
      capabilities.filter(c => ALLOWED.includes(c))
    );
    return {
      description: 'Remove the sys admin capability. You might end up with a degraded service.',
    };
  },
});
