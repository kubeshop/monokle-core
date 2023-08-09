import envPaths from 'env-paths';
import {Document, parse} from 'yaml';
import {mkdirp} from 'mkdirp';
import {existsSync, readFileSync} from 'fs';
import {readFile, writeFile} from 'fs/promises';
import {dirname, join, normalize} from 'path';
import {CONFIG_FILE_AUTH, CONFIG_FOLDER} from '../constants.js';
import type {TokenSet} from './deviceFlowHandler.js';

export type AccessToken = {
  access_token: string;
  token_type: 'access_token';
};

export type Token = AccessToken | TokenSet;

export type StoreAuth = {
  auth?: {
    email: string;
    token: Token;
  };
};

// @TODO make file paths and names configurable instead of using globals
export class StorageHandler {
  constructor(
    private configPath: string = '',
  ) {}

  async getStoreAuth(): Promise<StoreAuth | undefined> {
    const configPath = this.getStoreConfigPath(CONFIG_FILE_AUTH);
    return this.getStoreData(configPath);
  }

  getStoreAuthSync(): StoreAuth | undefined {
    const configPath = this.getStoreConfigPath(CONFIG_FILE_AUTH);
    return this.getStoreDataSync(configPath);
  }

  async emptyStoreAuth(): Promise<boolean> {
    const configPath = this.getStoreConfigPath(CONFIG_FILE_AUTH);
    return this.writeStoreData(configPath, '');
  }

  async setStoreAuth(email: string, token: Token): Promise<boolean> {
    const configPath = this.getStoreConfigPath(CONFIG_FILE_AUTH);
    const configDoc = new Document();
    configDoc.contents = {
      auth: {
        email,
        token: token,
      },
    } as any;

    return this.writeStoreData(configPath, configDoc.toString());
  }

  private getStoreConfigPath(file: string): string {
    const paths = envPaths(CONFIG_FOLDER, {suffix: ''});
    const configPath = normalize(join(this.configPath ?? paths.config, file));
    return configPath;
  }

  private async getStoreData(file: string) {
    if (!existsSync(file)) {
      return undefined;
    }

    try {
      const data = await readFile(file, 'utf8');
      const config = parse(data);
      return config;
    } catch (err) {
      console.error('Failed to read configuration from ' + file);
      return undefined;
    }
  }

  private getStoreDataSync(file: string) {
    if (!existsSync(file)) {
      return undefined;
    }

    try {
      const data = readFileSync(file, 'utf8');
      const config = parse(data);
      return config;
    } catch (err) {
      console.error('Failed to read configuration from ' + file);
      return undefined;
    }
  }

  private async writeStoreData(file: string, data: string) {
    const dir = dirname(file);

    try {
      await mkdirp(dir);
      await writeFile(file, data);
      return true;
    } catch (err) {
      return false;
    }
  }
}
