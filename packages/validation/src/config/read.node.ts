import {JsonObject} from 'type-fest';
import * as fsp from 'fs/promises';
import * as fs from 'fs';
import YAML from 'yaml';
import {Config, parseConfig} from './parse.js';

const DEFAULT_CONFIG_PATH = 'monokle.validation.yaml';

export async function readConfig(path: string = DEFAULT_CONFIG_PATH): Promise<Config | undefined> {
  if (!fs.existsSync(path)) {
    return undefined;
  }

  try {
    const data = await fsp.readFile(path, 'utf8');
    const content = YAML.parse(data);
    const config = parseConfig(content as JsonObject);
    return config;
  } catch (err) {
    console.error('Failed to read configuration from ' + path);
    return undefined;
  }
}
