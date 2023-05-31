import {definePlugin} from '../custom/config.js';
import {noDeprecation} from './rules/K8S002-deprecation-violated.js';

export default definePlugin({
  id: 'K8S002',
  name: 'deprecation',
  description: 'The resource uses deprecated apiVersions.',
  rules: {
    noDeprecation,
  },
});
