import type {CustomPluginLoader} from './types.js';
import {loadCustomPlugin} from '../utils/loadCustomPlugin.node.js';
import {SimpleCustomValidator} from '../validators/custom/simpleValidator.js';

export const requireFromStringCustomPluginLoader: CustomPluginLoader = async (pluginNameOrUrl, parser, fixer) => {
  const customPlugin = await loadCustomPlugin(pluginNameOrUrl);
  return new SimpleCustomValidator(customPlugin, parser, fixer);
};
