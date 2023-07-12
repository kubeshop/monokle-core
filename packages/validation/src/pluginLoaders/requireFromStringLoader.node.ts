import {CustomPluginLoader} from '../MonokleValidator.js';
import {loadCustomPlugin} from '../utils/loadCustomPlugin.node.js';
import {SimpleCustomValidator} from '../validators/custom/simpleValidator.js';

export const requireFromStringCustomPluginLoader: CustomPluginLoader = async (pluginNameOrUrl, parser) => {
  const customPlugin = await loadCustomPlugin(pluginNameOrUrl);
  return new SimpleCustomValidator(customPlugin, parser);
};
