import type {StorageAuthFormat} from '../handlers/storageHandlerAuth';

export class User {
  private _email: string | null = null;
  private _token: string | null = null;
  private _data: StorageAuthFormat | null = null;
  private _isAuthenticated: boolean = false;

  constructor(data: StorageAuthFormat | null) {
    this._isAuthenticated = Boolean(data?.auth && data.auth.token.access_token);

    if (this._isAuthenticated) {
      this._email = data!.auth!.email;
      this._token = data!.auth!.token.access_token!;
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
