import {CustomPluginLoader} from './types.js';
import {SimpleCustomValidator} from '../validators/custom/simpleValidator.js';

export const dynamicImportCustomPluginLoader: CustomPluginLoader = async (url, parser, fixer) => {
  const customPlugin = await import(/* @vite-ignore */ url);
  return new SimpleCustomValidator(customPlugin.default, parser, fixer);
};
