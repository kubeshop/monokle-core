import {Document, parse} from 'yaml';
import {mkdirp} from 'mkdirp';
import {existsSync, readFileSync} from 'fs';
import {readFile, writeFile} from 'fs/promises';
import {dirname, join, normalize} from 'path';

export class StorageHandler<DATA_FORMAT> {
  constructor(private storageFolderPath: string) {}

  getStoreDataSync(fileName: string): DATA_FORMAT | undefined {
    return this.readStoreDataSync(this.getStoreConfigPath(fileName));
  }

  async getStoreData(fileName: string): Promise<DATA_FORMAT | undefined> {
    return this.readStoreData(this.getStoreConfigPath(fileName));
  }

  async emptyStoreData(fileName: string): Promise<boolean> {
    return this.writeStoreData(this.getStoreConfigPath(fileName), '');
  }

  async setStoreData(data: DATA_FORMAT, fileName: string): Promise<boolean> {
    const configPath = this.getStoreConfigPath(fileName);
    const configDoc = new Document();
    configDoc.contents = data as any;

    return this.writeStoreData(configPath, configDoc.toString());
  }

  private getStoreConfigPath(fileName: string): string {
    return normalize(join(this.storageFolderPath, fileName));
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
