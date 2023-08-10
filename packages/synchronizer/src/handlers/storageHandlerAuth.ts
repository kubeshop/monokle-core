import envPaths from 'env-paths';
import {StorageHandler} from './storageHandler.js';
import {DEFAULT_STORAGE_CONFIG_FILE_AUTH, DEFAULT_STORAGE_CONFIG_FOLDER} from '../constants.js';
import type {TokenSet} from './deviceFlowHandler.js';

export type AccessToken = {
  access_token: string;
  token_type: 'access_token';
};

export type Token = AccessToken | TokenSet;

export type StorageAuthFormat = {
  auth?: {
    email: string;
    token: Token;
  };
};

export class StorageHandlerAuth extends StorageHandler<StorageAuthFormat> {
  private defaultFileName: string;

  constructor(
    storageFolderPath: string = envPaths(DEFAULT_STORAGE_CONFIG_FOLDER, {suffix: ''}).config,
    defaultFileName: string = DEFAULT_STORAGE_CONFIG_FILE_AUTH
  ) {
    super(storageFolderPath);
    this.defaultFileName = defaultFileName;
  }

  getStoreDataSync() {
    return super.getStoreDataSync(this.defaultFileName);
  }

  async getStoreData() {
    return super.getStoreData(this.defaultFileName);
  }

  async emptyStoreData() {
    return super.emptyStoreData(this.defaultFileName);
  }

  async setStoreData(data: StorageAuthFormat) {
    return super.setStoreData(data, this.defaultFileName);
  }
}
