import fs from 'fs';
import path from 'path';
import fetch from 'isomorphic-fetch';
import requireFromString from 'require-from-string';
import virtual from '@rollup/plugin-virtual';
import {rollup} from 'rollup';
import {CUSTOM_PLUGINS_URL_BASE} from '../constants';

export async function bundlePluginCode(code: string) {
  const bundle = await rollup({
    input: 'pluginCode',
    plugins: [
      (virtual as any)({
        pluginCode: code,
      }) as any,
    ],
  });
  const {output} = await bundle.generate({format: 'commonjs'});
  await bundle.close();
  return output[0].code;
}

export async function fetchCustomPluginCode(pluginName: string, pluginUrl?: string) {
  const url = pluginUrl ?? `${CUSTOM_PLUGINS_URL_BASE}/${pluginName}/latest.js`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error fetching ${url}: ${response.statusText}`);
  }
  return response.text();
}

export async function loadCustomPlugin(pluginNameOrUrl: string) {
  let pluginCode: string;
  let filePath: string;
  try {
    const urlObj = new URL(pluginNameOrUrl);
    filePath = urlObj.pathname;
    pluginCode = await fetchCustomPluginCode('custom-plugin', pluginNameOrUrl);
  } catch (error) {
    filePath = path.join(process.cwd(), '.monokle-plugins', `${pluginNameOrUrl}-plugin.js`);
    pluginCode = fs.existsSync(filePath)
      ? fs.readFileSync(filePath, {encoding: 'utf-8'})
      : await fetchCustomPluginCode(pluginNameOrUrl);
  }

  const code = await bundlePluginCode(pluginCode);
  const customPlugin = requireFromString(code, filePath);
  return customPlugin;
}

export async function fetchBundleRequireCustomPlugin(pluginName: string) {
  const pluginCode = await fetchCustomPluginCode(pluginName);
  const bundledCode = await bundlePluginCode(pluginCode);
  const customPlugin = requireFromString(bundledCode);
  return customPlugin;
}
