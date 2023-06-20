import {CustomPluginLoader} from '../MonokleValidator.js';
import {loadCustomPlugin} from '../utils/loadCustomPlugin.node.js';
import {SimpleCustomValidator} from '../validators/custom/simpleValidator.js';

export const requireFromStringCustomPluginLoader: CustomPluginLoader = async (pluginName, parser) => {
  const customPlugin = await loadCustomPlugin(pluginName);
  return new SimpleCustomValidator(customPlugin, parser);
};
