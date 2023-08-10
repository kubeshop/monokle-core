import envPaths from 'env-paths';
import {StorageHandler} from './storageHandler.js';
import {DEFAULT_STORAGE_CONFIG_FOLDER} from '../constants.js';
import type {Config} from '@monokle/validation';

export type StoragePolicyFormat = Config;

export class StorageHandlerPolicy extends StorageHandler<StoragePolicyFormat> {
  constructor(storageFolderPath: string = envPaths(DEFAULT_STORAGE_CONFIG_FOLDER, {suffix: ''}).cache) {
    super(storageFolderPath);
  }
}
