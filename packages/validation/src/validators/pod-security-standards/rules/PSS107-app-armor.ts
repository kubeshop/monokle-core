import {PSP_RELATIONS} from '../../../taxonomies/index.js';
import {defineRule} from '../../custom/config.js';
import {validatePodTemplate} from '../../custom/utils.js';

export const appArmor = defineRule({
  id: 107,
  description: 'Prohibit customised app armor.',
  fullDescription: `On supported hosts, the runtime/default AppArmor profile is applied by default. The baseline policy should prevent overriding or disabling the default AppArmor profile, or restrict overrides to an allowed set of profiles.`,
  help: 'Do not customize AppArmor.',
  advanced: {
    severity: 5,
    relationships: [PSP_RELATIONS['baseline'], PSP_RELATIONS['restricted']],
  },
  validate({resources}, {report}) {
    validatePodTemplate(resources, (resource, pod, prefix) => {
      const appArmor = pod.metadata?.annotations?.['container.apparmor.security.beta.kubernetes.io/*'];
      const valid = !appArmor || appArmor === 'runtime/default' || appArmor === 'localhost/*';
      if (valid) return;
      report(resource, {path: `${prefix}.metadata.annotations`});
    });
  },
});
