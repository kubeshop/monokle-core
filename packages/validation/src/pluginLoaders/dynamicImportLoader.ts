import {CustomPluginLoader} from '../MonokleValidator.js';
import {SimpleCustomValidator} from '../validators/custom/simpleValidator.js';

export const dynamicImportCustomPluginLoader: CustomPluginLoader = async (pluginName, parser) => {
  const url = `https://plugins.monokle.com/validation/${pluginName}/latest.js`;
  const customPlugin = await import(/* @vite-ignore */ url);
  return new SimpleCustomValidator(customPlugin.default, parser);
};
