import {Document} from 'yaml';
import {StorageHandler, getDefaultStorageConfigPaths} from './storageHandler.js';
import type {ValidationConfig} from '@monokle/types';

export type StoragePolicyFormat = ValidationConfig;

export class StorageHandlerPolicy extends StorageHandler<StoragePolicyFormat> {
  constructor(storageFolderPath: string = getDefaultStorageConfigPaths().cache) {
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
