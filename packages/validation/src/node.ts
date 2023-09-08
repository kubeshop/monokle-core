import {
  AnnotationSuppressor,
  DisabledFixer,
  FingerprintSuppressor,
  MonokleValidator,
  ResourceParser,
  SchemaLoader,
} from './commonExports.js';
import {RemotePluginLoader} from './pluginLoaders/PluginLoader.js';
import {requireFromStringCustomPluginLoader} from './pluginLoaders/requireFromStringLoader.node.js';

/**
 * Modify the commonExports.ts file if you want to export something for both node and browser environments.
 */
export * from './commonExports.js';

export * from './pluginLoaders/index.node.js';
export * from './utils/loadCustomPlugin.node.js';
export * from './config/index.node.js';
export * from './config/read.node.js';
export * from './validators/open-policy-agent/wasmLoader/RemoteWasmLoader.node.js';

export function createDefaultMonokleValidator() {
  return new MonokleValidator(
    {
      loader: new RemotePluginLoader(requireFromStringCustomPluginLoader),
      parser: new ResourceParser(),
      schemaLoader: new SchemaLoader(),
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
