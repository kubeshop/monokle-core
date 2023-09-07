import {CustomPluginLoader} from './types.js';
import {CUSTOM_PLUGINS_URL_BASE} from '../constants.js';
import {SimpleCustomValidator} from '../validators/custom/simpleValidator.js';

// TODO: Lift up URL and import the "bundleLoader" always expected a URL.
export const dynamicImportCustomPluginLoader: CustomPluginLoader = async (pluginName, parser, fixer) => {
  const url = `${CUSTOM_PLUGINS_URL_BASE}/${pluginName}/latest.js`;
  const customPlugin = await import(/* @vite-ignore */ url);
  return new SimpleCustomValidator(customPlugin.default, parser, fixer);
};
