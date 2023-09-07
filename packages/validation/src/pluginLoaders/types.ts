import {ResourceParser} from '../common/resourceParser.js';
import type {Plugin} from '../common/types.js';
import {Fixer} from '../sarif/fix/index.js';
import {SchemaLoader} from '../validators/kubernetes-schema/index.js';

export type PluginContext = {
  parser: ResourceParser;
  fixer?: Fixer;
  schemaLoader?: SchemaLoader;
};

export type CustomPluginLoader = (name: string, parser: ResourceParser, fixer?: Fixer) => Promise<Plugin>;
