/**
 * Modify the commonExports.ts file if you want to export something for both node and browser environments
 */
export * from './commonExports.js';

export * from './pluginLoaders/index.js';

export * from './createExtensibleMonokleValidator.browser.js';
export * from './createDefaultMonokleValidator.browser.js';
export * from './config/index.browser.js';
export * from './config/read.browser.js';
export * from './wasmLoader/RemoteWasmLoader.browser.js';

// This function is used in Node environments only, but it cannot be imported in Monokle Desktop if it's not defined here as well
export const fetchBundleRequireCustomPlugin = async () => {};
