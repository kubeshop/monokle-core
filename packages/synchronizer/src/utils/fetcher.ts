import normalizeUrl from 'normalize-url';
import fetch from 'node-fetch';
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

export type OriginConfig = {
  origin: string;
  apiOrigin: string;
  authOrigin: string;
  [key: string]: string;
};

export type CachedOriginConfig = {
  config: OriginConfig;
  downloadedAt: number;
};

export class Fetcher extends EventEmitter {
  static _originConfig: CachedOriginConfig | undefined;

  private _token: TokenInfo | undefined;

  constructor(private _apiHandler: ApiHandler) {
    super();
  }

  static async getOriginConfig(origin: string): Promise<OriginConfig | undefined> {
    if (Fetcher._originConfig) {
      const now = Date.now();

      // Use already fetched config if it's less than 5 minutes old.
      if (now - Fetcher._originConfig.downloadedAt < 1000 * 60 * 5) {
        return Fetcher._originConfig.config;
      }
    }

    try {
      const configUrl = normalizeUrl(`${origin}/config.js`);
      const response = await fetch(configUrl);
      const responseText = await response.text();

      const values = Array.from(responseText.matchAll(/([A-Z_]+)\s*:\s*"(.*?)"/gm)).reduce(
        (acc: Record<string, string>, match) => {
          if (match[1] && match[2]) {
            acc[match[1]] = match[2];
          }
          return acc;
        },
        {}
      );

      if (values) {
        values.origin = normalizeUrl(origin);
        values.apiOrigin = values.API_ORIGIN;
        values.authOrigin = values.OIDC_DISCOVERY_URL;
      }

      Fetcher._originConfig = {
        config: values as OriginConfig,
        downloadedAt: Date.now(),
      };

      return values as OriginConfig;
    } catch (error: any) {
      // Rethrow error so integrations can catch it and propagate/react.
      throw error;
    }
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
      };
    }

    this.emit('queryStarted', {apiUrl: this._apiHandler.apiUrl, query, variables});

    const result: QueryResult<T_DATA> = {
      data: undefined,
      success: false,
    };

    try {
      const response = await this._apiHandler.queryApi<ApiResponse<T_DATA>>(query, this._token, variables);
      result.data = response?.data;
      result.success = true;
    } catch (error: any) {
      result.error = error.message;
    } finally {
      this.emit(result.success ? 'queryDone' : 'queryFailed', {
        apiUrl: this._apiHandler.apiUrl,
        query,
        variables,
        result,
      });
      return result;
    }
  }
}
