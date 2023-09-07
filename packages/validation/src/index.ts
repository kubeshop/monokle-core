import {MonokleValidator} from './MonokleValidator.js';
import {ResourceParser, SchemaLoader} from './node.js';
import {RemotePluginLoader} from './pluginLoaders/PluginLoader.js';
import {DisabledFixer} from './sarif/fix/plugins/DisabledSuppressor.js';
import {AnnotationSuppressor, FingerprintSuppressor} from './sarif/suppressions/index.js';

/**
 * Modify the commonExports.ts file if you want to export something for both node and browser environments.
 */
export * from './commonExports.js';
export * from './pluginLoaders/index.js';
export * from './config/index.browser.js';
export * from './config/read.browser.js';
export * from './validators/open-policy-agent/wasmLoader/RemoteWasmLoader.browser.js';

// This function is used in Node environments only, but it cannot be imported in Monokle Desktop if it's not defined here as well
export const fetchBundleRequireCustomPlugin = async (pluginName: string): Promise<any> => {};

export function createDefaultMonokleValidator() {
  return new MonokleValidator(
    {
      parser: new ResourceParser(),
      schemaLoader: new SchemaLoader(),
      loader: new RemotePluginLoader(),
      suppressors: [new AnnotationSuppressor(), new FingerprintSuppressor()],
      fixer: new DisabledFixer(),
    },
    {
      plugins: {
        'kubernetes-schema': true,
        'yaml-syntax': true,
        'pod-security-standards': true,
        'resource-links': true,
      },
    }
  );
}
