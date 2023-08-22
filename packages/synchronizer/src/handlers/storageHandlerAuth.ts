import envPaths from 'env-paths';
import {StorageHandler} from './storageHandler';
import {DEFAULT_STORAGE_CONFIG_FILE_AUTH, DEFAULT_STORAGE_CONFIG_FOLDER} from '../constants';
import type {TokenSet} from './deviceFlowHandler';

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
  private _defaultFileName: string;

  constructor(
    storageFolderPath: string = envPaths(DEFAULT_STORAGE_CONFIG_FOLDER, {suffix: ''}).config,
    defaultFileName: string = DEFAULT_STORAGE_CONFIG_FILE_AUTH
  ) {
    super(storageFolderPath);
    this._defaultFileName = defaultFileName;
  }

  getStoreDataSync() {
    return super.getStoreDataSync(this._defaultFileName);
  }

  async getStoreData() {
    return super.getStoreData(this._defaultFileName);
  }

  async emptyStoreData() {
    return super.emptyStoreData(this._defaultFileName);
  }

  async setStoreData(data: StorageAuthFormat) {
    return super.setStoreData(data, this._defaultFileName);
  }
}
