import fs from "fs";
import path from "path";
import fetch from 'isomorphic-fetch';
import requireFromString from 'require-from-string';
import virtual from '@rollup/plugin-virtual';
import { rollup } from 'rollup';

export async function bundlePluginCode(code:string) {
  const bundle = await rollup({
    input: 'pluginCode',
    plugins: [
      (virtual as any)({
        pluginCode: code,
      }) as any,
    ],
  });
  const { output } = await bundle.generate({ format: 'commonjs' });
  await bundle.close();
  return output[0].code;
}

export async function loadCustomPlugin(pluginName: string) {
  const filePath = path.join(
    process.cwd(),
    '.monokle-plugins',
    `${pluginName}-plugin.js`,
  );

  const pluginCode = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, { encoding: 'utf-8' })
    : await (async () => {
        const url = `https://plugins.monokle.com/validation/${pluginName}/latest.js`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error fetching ${url}: ${response.statusText}`);
        }
        return response.text();
      })();

  const code = await bundlePluginCode(pluginCode);
  const customPlugin = requireFromString(code, filePath);
  return customPlugin
}
