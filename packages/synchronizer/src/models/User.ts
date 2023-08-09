import {StoreAuth} from '../types';

export class User {
  private _email: string | null = null;
  private _token: string | null = null;
  private _data: StoreAuth | null = null;
  private _isAuthenticated: boolean = false;

  constructor(data: StoreAuth | null) {
    this._isAuthenticated = Boolean(data);

    if (data) {
      this._email = data.auth?.email ?? null;
      this._token = data.auth?.token?.access_token ?? null;
      this._data = data;
    }
  }

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get email() {
    return this._email;
  }

  get token() {
    return this._token;
  }

  get data() {
    return this._data;
  }
}
