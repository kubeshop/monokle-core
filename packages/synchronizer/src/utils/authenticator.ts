import {EventEmitter} from 'events';
import {User} from '../models/user.js';
import {StorageHandlerAuth} from '../handlers/storageHandlerAuth.js';
import {ApiHandler} from '../handlers/apiHandler.js';
import {DeviceFlowHandler} from '../handlers/deviceFlowHandler.js';
import type {Token, TokenType} from '../handlers/storageHandlerAuth.js';
import type {DeviceFlowHandle, TokenSet} from '../handlers/deviceFlowHandler.js';

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

export type RefreshTokenOptions = {
  logoutOnInvalidGrant?: boolean;
  logoutOnFail?: boolean;
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
    try {
      await this._storageHandler.emptyStoreData();

      this._user = new User(null);

      this.emit('logout');
    } catch (err: any) {
      throw new Error(`Failed to logout with error: ${err.message}`);
    }
  }

  async refreshToken(force = false, options: RefreshTokenOptions = {logoutOnInvalidGrant: true}) {
    const authData = this._user.data?.auth;
    const tokenData = authData?.token;

    if (!tokenData) {
      return;
    }

    if (tokenData.token_type === 'ApiKey') {
      return;
    }

    const tokenSetData = tokenData as TokenSet;

    if (!tokenSetData.refresh_token || !tokenSetData.expires_at) {
      return;
    }

    const expiresAtDateMs = new Date(tokenSetData.expires_at * 1000);
    const diffMinutes = (expiresAtDateMs.getTime() - new Date().getTime()) / 1000 / 60;
    if (diffMinutes < 5 || force) {
      try {
        const newTokenData = await this._deviceFlowHandler.refreshAuthFlow(tokenSetData.refresh_token);
        return this.setUserData(newTokenData);
      } catch (err: any) {
        // This is a workaround for origin conflict where user is logged in already with different origin
        // and authenticator is querying different one.
        if (
          options?.logoutOnFail ||
          (options?.logoutOnInvalidGrant && err.message.toLowerCase().includes('invalid_grant'))
        ) {
          await this._storageHandler.emptyStoreData();
          this._user = new User(null);
          // Do not emit logout event since we treat this as user not being logged in with desired origin.
        } else {
          throw err;
        }
      }
    }
  }

  private async onInit() {
    setTimeout(() => {
      if (this._user.isAuthenticated) {
        this.emit('login', {
          method: this._user.data?.auth?.token.token_type?.toLowerCase() === 'bearer' ? 'device code' : 'token',
          user: this._user,
        });
      }
    }, 0);
  }

  private async loginWithToken(token: string): Promise<AuthenticatorLoginResponse> {
    const tokenData: Token = {
      access_token: token,
      token_type: 'ApiKey',
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
    const userApiData = await this._apiHandler.getUser({
      accessToken: token.access_token!,
      tokenType: token.token_type! as TokenType,
    });

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
