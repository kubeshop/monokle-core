import {CustomPluginLoader} from '../MonokleValidator.js';
import {SimpleCustomValidator} from '../validators/custom/simpleValidator.js';

export const dynamicImportCustomPluginLoader: CustomPluginLoader = async (pluginName, parser) => {
  try {
    const url = `https://plugins.monokle.com/validation/${pluginName}/latest.js`;
    const customPlugin = await import(/* @vite-ignore */ url);
    return new SimpleCustomValidator(customPlugin.default, parser);
  } catch (err) {
    throw new Error(err instanceof Error ? `plugin_not_found: ${err.message}` : `plugin_not_found: ${String(err)}`);
  }
};
