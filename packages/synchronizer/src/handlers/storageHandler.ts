import envPaths from 'env-paths';
import {Document, parse} from 'yaml';
import {mkdirp} from 'mkdirp';
import {existsSync, readFileSync} from 'fs';
import {readFile, writeFile} from 'fs/promises';
import {dirname, join, normalize} from 'path';
import {DEFAULT_STORAGE_CONFIG_FILE_AUTH, DEFAULT_STORAGE_CONFIG_FOLDER} from '../constants.js';
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

export class StorageHandler {

  constructor(
    private configFolderPath: string = (envPaths(DEFAULT_STORAGE_CONFIG_FOLDER, {suffix: ''})).config,
    private configAuthFile: string = DEFAULT_STORAGE_CONFIG_FILE_AUTH,
  ) {}

  getStoreAuthSync(): StoreAuth | undefined {
    return this.readStoreDataSync(this.getStoreConfigPath());
  }

  async getStoreAuth(): Promise<StoreAuth | undefined> {
    return this.readStoreData(this.getStoreConfigPath());
  }

  async emptyStoreAuth(): Promise<boolean> {
    return this.writeStoreData(this.getStoreConfigPath(), '');
  }

  async setStoreAuth(email: string, token: Token): Promise<boolean> {
    const configPath = this.getStoreConfigPath();
    const configDoc = new Document();
    configDoc.contents = {
      auth: {
        email,
        token: token,
      },
    } as any;

    return this.writeStoreData(configPath, configDoc.toString());
  }

  private getStoreConfigPath(): string {
    return normalize(join(this.configFolderPath, this.configAuthFile));
  }

  private readStoreDataSync(file: string) {
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

  private async readStoreData(file: string) {
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
