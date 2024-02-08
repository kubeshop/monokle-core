import {StorageHandler, getDefaultStorageConfigPaths} from './storageHandler.js';

export class StorageHandlerJsonCache extends StorageHandler<Record<string, any>> {
  constructor(storageFolderPath: string = getDefaultStorageConfigPaths().cache) {
    super(storageFolderPath);
  }

  async setStoreData(data: Record<string, any>, fileName: string): Promise<string | undefined> {
    const filePath = this.getStoreDataFilePath(fileName);
    await this.writeStoreData(filePath, JSON.stringify(data));
    return filePath;
  }

  protected parseData(data: string) {
    return JSON.parse(data);
  }
}
