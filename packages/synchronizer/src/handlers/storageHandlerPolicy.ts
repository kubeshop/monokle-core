import envPaths from 'env-paths';
import {Document} from 'yaml';
import {StorageHandler} from './storageHandler.js';
import {DEFAULT_STORAGE_CONFIG_FOLDER} from '../constants.js';
import type {ValidationConfig} from '@monokle/types';

export type StoragePolicyFormat = ValidationConfig;

export class StorageHandlerPolicy extends StorageHandler<StoragePolicyFormat> {
  constructor(storageFolderPath: string = envPaths(DEFAULT_STORAGE_CONFIG_FOLDER, {suffix: ''}).cache) {
    super(storageFolderPath);
  }

  async setStoreData(data: StoragePolicyFormat, fileName: string, comment?: string): Promise<string> {
    const configPath = this.getStoreDataFilePath(fileName);
    const configDoc = new Document();
    configDoc.contents = data as any;

    if (comment) {
      configDoc.commentBefore = comment;
    }

    try {
      await this.writeStoreData(configPath, configDoc.toString());
      return configPath;
    } catch (err: any) {
      throw new Error(`Failed to write configuration to '${configPath}' with error: ${err.message}`);
    }
  }
}
