import { JsonObject } from "type-fest";
import * as fs from "fs/promises";
import YAML from "yaml";
import { Config, parseConfig } from "./parse.js";

const DEFAULT_CONFIG_PATH = "monokle.validation.yaml";

export async function readConfig(
  path: string = DEFAULT_CONFIG_PATH
): Promise<Config> {
  const data = await fs.readFile(path, "utf8");
  const content = YAML.parse(data);
  const config = parseConfig(content as JsonObject);
  return config;
}
