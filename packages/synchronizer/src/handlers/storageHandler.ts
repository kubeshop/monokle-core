import {Document, parse} from 'yaml';
import {mkdirp} from 'mkdirp';
import {existsSync, readFileSync} from 'fs';
import {readFile, writeFile} from 'fs/promises';
import {dirname, join, normalize} from 'path';

export abstract class StorageHandler<TData> {
  constructor(private _storageFolderPath: string) {}

  getStoreDataSync(fileName: string): TData | undefined {
    return this.readStoreDataSync(this.getStoreDataFilePath(fileName));
  }

  async getStoreData(fileName: string): Promise<TData | undefined> {
    return this.readStoreData(this.getStoreDataFilePath(fileName));
  }

  async emptyStoreData(fileName: string): Promise<void> {
    return this.writeStoreData(this.getStoreDataFilePath(fileName), '');
  }

  async setStoreData(data: TData, fileName: string): Promise<string | undefined> {
    const configPath = this.getStoreDataFilePath(fileName);
    const configDoc = new Document();
    configDoc.contents = data as any;

    await this.writeStoreData(configPath, configDoc.toString());
    return configPath;
  }

  getStoreDataFilePath(fileName: string): string {
    return normalize(join(this._storageFolderPath, fileName));
  }

  protected readStoreDataSync(file: string) {
    if (!existsSync(file)) {
      return undefined;
    }

    try {
      const data = readFileSync(file, 'utf8');
      const config = parse(data);
      return config;
    } catch (err: any) {
      throw new Error(`Failed to read configuration from '${file}' with error: ${err.message}`);
    }
  }

  protected async readStoreData(file: string) {
    if (!existsSync(file)) {
      return undefined;
    }

    try {
      const data = await readFile(file, 'utf8');
      const config = parse(data);
      return config;
    } catch (err: any) {
      throw new Error(`Failed to read configuration from '${file}' with error: ${err.message}`);
    }
  }

  protected async writeStoreData(file: string, data: string) {
    const dir = dirname(file);

    try {
      await mkdirp(dir);
      await writeFile(file, data);
    } catch (err: any) {
      throw new Error(`Failed to write configuration to '${file}' with error: ${err.message} and data: ${data}`);
    }
  }
}
