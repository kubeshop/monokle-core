import {StorageHandler, getDefaultStorageConfigPaths} from './storageHandler.js';
import {DEFAULT_STORAGE_CONFIG_FILE_AUTH} from '../constants.js';
import type {TokenSet} from './deviceFlowHandler.js';

export type TokenType = 'Bearer' | 'ApiKey';

export type TokenInfo = {
  accessToken: string;
  tokenType: TokenType;
};

export type AccessToken = {
  access_token: string;
  token_type: 'ApiKey';
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
    storageFolderPath: string = getDefaultStorageConfigPaths().config,
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
