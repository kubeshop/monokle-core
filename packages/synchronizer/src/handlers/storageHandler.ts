import {Document, parse} from 'yaml';
import {mkdirp} from 'mkdirp';
import {existsSync, readFileSync} from 'fs';
import {readFile, writeFile} from 'fs/promises';
import {dirname, join, normalize} from 'path';

export abstract class StorageHandler<DATA_FORMAT> {
  constructor(private _storageFolderPath: string) {}

  getStoreDataSync(fileName: string): DATA_FORMAT | undefined {
    return this.readStoreDataSync(this.getStoreDataFilePath(fileName));
  }

  async getStoreData(fileName: string): Promise<DATA_FORMAT | undefined> {
    return this.readStoreData(this.getStoreDataFilePath(fileName));
  }

  async emptyStoreData(fileName: string): Promise<boolean> {
    return this.writeStoreData(this.getStoreDataFilePath(fileName), '');
  }

  async setStoreData(data: DATA_FORMAT, fileName: string): Promise<string | undefined> {
    const configPath = this.getStoreDataFilePath(fileName);
    const configDoc = new Document();
    configDoc.contents = data as any;

    const result = await this.writeStoreData(configPath, configDoc.toString());
    return result ? configPath : undefined;
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
    } catch (err) {
      console.error('Failed to read configuration from ' + file);
      return undefined;
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
    } catch (err) {
      console.error('Failed to read configuration from ' + file);
      return undefined;
    }
  }

  protected async writeStoreData(file: string, data: string) {
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
