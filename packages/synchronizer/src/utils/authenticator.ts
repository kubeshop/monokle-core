import {EventEmitter} from 'events';
import {User} from '../models/user.js';
import {StorageHandlerAuth} from '../handlers/storageHandlerAuth.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {DeviceFlowHandler} from '../handlers/deviceFlowHandler.js';
import type {Token} from '../handlers/storageHandlerAuth.js';
import type {DeviceFlowHandle} from '../handlers/deviceFlowHandler.js';

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
    private storageHandler: StorageHandlerAuth,
    private apiHandler: ApiHandler,
    private deviceFlowHandler: DeviceFlowHandler
  ) {
    super();

    const storeData = this.storageHandler.getStoreDataSync();
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
    const success = await this.storageHandler.emptyStoreData();

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
      const newTokenData = await this.deviceFlowHandler.refreshAuthFlow(authData.token.refresh_token);
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
    const handle = await this.deviceFlowHandler.initializeAuthFlow();

    const donePromise: Promise<User> = new Promise((resolve, reject) => {
      this.deviceFlowHandler
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
    const userApiData = await this.apiHandler.getUser(token.access_token!);

    await this.storageHandler.setStoreData({
      auth: {
        email: userApiData?.data.me.email ?? '',
        token,
      },
    });

    const userData = await this.storageHandler.getStoreData();

    this._user = new User(userData ?? null);
  }
}
