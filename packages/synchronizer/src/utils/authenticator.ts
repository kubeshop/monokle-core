import {EventEmitter} from 'events';
import {User} from '../models/user';
import {StorageHandlerAuth} from '../handlers/storageHandlerAuth';
import {ApiHandler} from '../handlers/apiHandler';
import {DeviceFlowHandler} from '../handlers/deviceFlowHandler';
import type {Token} from '../handlers/storageHandlerAuth';
import type {DeviceFlowHandle} from '../handlers/deviceFlowHandler';

export type AuthMethod = 'device code' | 'token';

export type AuthenticatorLoginResponse = {
  onDone: Promise<User>;
  method: AuthMethod;
  handle?: DeviceFlowHandle;
};

export type AuthenticatorLoginEvent = {
  method: AuthMethod;
  user: User;
};

export class Authenticator extends EventEmitter {
  private _user: User;

  constructor(
    private _storageHandler: StorageHandlerAuth,
    private _apiHandler: ApiHandler,
    private _deviceFlowHandler: DeviceFlowHandler
  ) {
    super();

    const storeData = this._storageHandler.getStoreDataSync();
    this._user = new User(storeData ?? null);

    this.onInit();
  }

  get user() {
    return this._user;
  }

  get methods(): AuthMethod[] {
    return ['device code', 'token'];
  }

  async getUser() {
    await this.refreshToken();
    return this.user;
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
    const success = await this._storageHandler.emptyStoreData();

    if (!success) {
      throw new Error('Failed to logout.');
    }

    this._user = new User(null);

    this.emit('logout');
  }

  async refreshToken() {
    const authData = this._user.data?.auth;

    if (authData?.token.token_type !== 'bearer') {
      return;
    }

    if (!authData.token.refresh_token || !authData.token.expires_at) {
      return;
    }

    const expiresAtDate = new Date(authData.token.expires_at * 1000);
    const diffMinutes = expiresAtDate.getTime() - new Date().getTime();
    if (diffMinutes < 5) {
      const newTokenData = await this._deviceFlowHandler.refreshAuthFlow(authData.token.refresh_token);
      return this.setUserData(newTokenData);
    }
  }

  private async onInit() {
    setTimeout(() => {
      if (this._user.isAuthenticated) {
        this.emit('login', {
          method: this._user.data?.auth?.token.token_type === 'bearer' ? 'device code' : 'token',
          user: this._user,
        });
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
          this.emit('login', {
            method: 'token',
            user: this._user,
          });
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
    const handle = await this._deviceFlowHandler.initializeAuthFlow();

    const donePromise: Promise<User> = new Promise((resolve, reject) => {
      this._deviceFlowHandler
        .pollAuthFlow(handle)
        .then(tokenSet => {
          return this.setUserData(tokenSet);
        })
        .then(() => {
          this.emit('login', {
            method: 'device code',
            user: this._user,
          });
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
    const userApiData = await this._apiHandler.getUser(token.access_token!);

    await this._storageHandler.setStoreData({
      auth: {
        email: userApiData?.data.me.email ?? '',
        token,
      },
    });

    const userData = await this._storageHandler.getStoreData();

    this._user = new User(userData ?? null);
  }
}
