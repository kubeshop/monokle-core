import {EventEmitter} from 'events';
import {ApiHandler} from '../handlers/apiHandler.js';
import {TokenInfo} from '../handlers/storageHandlerAuth.js';

export type ApiResponse<T_DATA> = {
  errors: any[];
  data: T_DATA | undefined;
};

export type QueryResult<T_DATA> = {
  data: T_DATA | undefined;
  success: boolean;
  error?: string;
};

export class Fetcher extends EventEmitter {
  private _token: TokenInfo | undefined;

  constructor(
    private _apiHandler: ApiHandler,
  ) {
    super();
  }

  useBearerToken(token: string) {
    this._token = {
      accessToken: token,
      tokenType: 'Bearer',
    };
  }

  useAutomationToken(token: string) {
    this._token = {
      accessToken: token,
      tokenType: 'ApiKey',
    };
  }

  async query<T_DATA>(query: string, variables?: any): Promise<QueryResult<T_DATA>> {
    if (!this._token) {
      return {
        data: undefined,
        success: false,
        error: 'No token set. Use useBearerToken or useAutomationToken before calling query.',
      }
    }

    this.emit('queryStarted', {apiUrl: this._apiHandler.apiUrl, query, variables});

    const result: QueryResult<T_DATA> = {
      data: undefined,
      success: false,
    }

    try {
      const response = await this._apiHandler.queryApi<ApiResponse<T_DATA>>(query, this._token, variables);
      result.data = response?.data;
      result.success = true;
    } catch (error: any) {
      result.error = error.message;
    } finally {
      this.emit(result.success ? 'queryDone' : 'queryFailed', {apiUrl: this._apiHandler.apiUrl, query, variables, result});
      return result;
    }
  }
}
