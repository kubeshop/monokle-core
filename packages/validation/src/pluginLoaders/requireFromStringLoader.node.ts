import {CustomPluginLoader} from '../MonokleValidator.js';
import {loadCustomPlugin} from '../utils/loadCustomPlugin.node.js';
import {SimpleCustomValidator} from '../validators/custom/simpleValidator.js';

export const requireFromStringCustomPluginLoader: CustomPluginLoader = async (pluginName, parser) => {
  try {
    const customPlugin = await loadCustomPlugin(pluginName);
    return new SimpleCustomValidator(customPlugin, parser);
  } catch (err) {
    throw new Error(`plugin_not_found: $err`);
  }
};
