import {EventEmitter} from 'events';
import {User} from '../models/user';
import {StorageHandler} from '../handlers/storageHandler';
import {ApiHandler} from '../handlers/apiHandler';
import {DeviceFlowHandler} from '../handlers/deviceFlowHandler';
import type {Token} from '../handlers/storageHandler';
import type {DeviceFlowHandle} from '../handlers/deviceFlowHandler';

export type AuthMethod = 'device code' | 'token';

export type AuthenticatorConfig = {
  allowedMethods?: AuthMethod[];
  customStoragePath?: string;
};

export type AuthenticatorLoginResponse = {
  onDone: Promise<User>;
  method: AuthMethod;
  handle?: DeviceFlowHandle;
};

export class Authenticator extends EventEmitter {
  private _user: User;

  constructor(
    private storageHandler: StorageHandler,
    private apiHandler: ApiHandler,
    private deviceFlowHandler: DeviceFlowHandler,
    private config: AuthenticatorConfig = {}
  ) {
    super();

    const storeData = this.storageHandler.getStoreAuthSync();
    this._user = new User(storeData ?? null);

    this.onInit();
  }

  get user() {
    // we want to have synchronous file reading/checking here (recheck auth file on every request?)
    return this._user;
  }

  get methods(): AuthMethod[] {
    return ['device code', 'token'];
  }

  async login(method: AuthMethod): Promise<AuthenticatorLoginResponse>;
  async login(method: AuthMethod, token: string): Promise<AuthenticatorLoginResponse>;
  async login(method: AuthMethod, data?: string): Promise<AuthenticatorLoginResponse> {
    if (method === 'token') {
      return this.loginWithToken(data ?? '');
    } else if (method === 'device code') {
      return this.loginWithDeviceCode();
    }

    throw new Error('Invalid auth method.');
  }

  async logout() {
    const success = await this.storageHandler.emptyStoreAuth();

    if (!success) {
      throw new Error('Failed to logout.');
    }

    this._user = new User(null);

    this.emit('logout');
  }

  private async onInit() {
    setTimeout(() => {
      if (this._user.isAuthenticated) {
        this.emit('login', 'token', this._user);
      }
    }, 0);
  }

  private async loginWithToken(token: string): Promise<AuthenticatorLoginResponse> {
    const tokenData: Token = {
      access_token: token,
      token_type: 'access_token',
    };

    const donePromise: Promise<User> = new Promise((resolve, reject) => {
      this.setUserData(tokenData)
        .then(() => {
          this.emit('login', 'token', this._user);
          resolve(this._user);
        })
        .catch(err => {
          reject(err);
        });
    });

    return {
      onDone: donePromise,
      method: 'token',
    };
  }

  private async loginWithDeviceCode(): Promise<AuthenticatorLoginResponse> {
    const handle = await this.deviceFlowHandler.initializeAuthFlow();

    const donePromise: Promise<User> = new Promise((resolve, reject) => {
      this.deviceFlowHandler
        .pollAuthFlow(handle)
        .then(tokenSet => {
          return this.setUserData(tokenSet);
        })
        .then(() => {
          this.emit('login', 'token', this._user);
          resolve(this._user);
        })
        .catch(err => {
          reject(err);
        });
    });

    return {
      onDone: donePromise,
      method: 'device code',
      handle,
    };
  }

  private async setUserData(token: Token) {
    const userApiData = await this.apiHandler.getUser(token.access_token!);

    await this.storageHandler.setStoreAuth(userApiData?.data.me.email ?? '', token);

    const userData = await this.storageHandler.getStoreAuth();

    this._user = new User(userData ?? null);
  }
}
