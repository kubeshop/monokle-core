import envPaths from 'env-paths';
import {Document} from 'yaml';
import {StorageHandler} from './storageHandler';
import {DEFAULT_STORAGE_CONFIG_FOLDER} from '../constants';
import type {Config} from '@monokle/validation';

export type StoragePolicyFormat = Config;

export class StorageHandlerPolicy extends StorageHandler<StoragePolicyFormat> {
  constructor(storageFolderPath: string = envPaths(DEFAULT_STORAGE_CONFIG_FOLDER, {suffix: ''}).cache) {
    super(storageFolderPath);
  }

  async setStoreData(data: StoragePolicyFormat, fileName: string, comment?: string): Promise<string | undefined> {
    const configPath = this.getStoreDataFilePath(fileName);
    const configDoc = new Document();
    configDoc.contents = data as any;

    if (comment) {
      configDoc.commentBefore = comment;
    }

    const result = await this.writeStoreData(configPath, configDoc.toString());
    return result ? configPath : undefined;
  }
}
