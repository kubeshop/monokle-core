import {assert} from 'chai';
import {ApiHandler} from '../handlers/apiHandler.js';

describe('ApiHandler Tests', () => {
  describe('Authorization Header', () => {
    it('formats header correctly (bearer)', async () => {
      const apiHandler = new ApiHandler();
      const header = (apiHandler as any).formatAuthorizationHeader({
        accessToken: 'SAMPLE_TOKEN',
        tokenType: 'Bearer',
      });

      assert.equal('Bearer SAMPLE_TOKEN', header);
    });

    it('formats header correctly (apikey)', async () => {
      const apiHandler = new ApiHandler();
      const header = (apiHandler as any).formatAuthorizationHeader({
        accessToken: 'SAMPLE_TOKEN',
        tokenType: 'ApiKey',
      });

      assert.equal('ApiKey SAMPLE_TOKEN', header);
    });

    it('formats header correctly (invalid)', async () => {
      const apiHandler = new ApiHandler();
      const header = (apiHandler as any).formatAuthorizationHeader({
        accessToken: 'SAMPLE_TOKEN',
        tokenType: 'invalid',
      });

      assert.equal('Bearer SAMPLE_TOKEN', header);
    });

    it('formats header correctly (not set)', async () => {
      const apiHandler = new ApiHandler();
      const header = (apiHandler as any).formatAuthorizationHeader({
        accessToken: 'SAMPLE_TOKEN',
        tokenType: undefined,
      });

      assert.equal('Bearer SAMPLE_TOKEN', header);
    });
  });

  describe('Api Url', () => {
    it('uses default Api Url by default', async () => {
      assert.equal('https://api.monokle.com', (new ApiHandler()).apiUrl);
    });

    it('uses default Api Url when falsy value passed', async () => {
      assert.equal('https://api.monokle.com', (new ApiHandler('')).apiUrl);
      assert.equal('https://api.monokle.com', (new ApiHandler(false as any)).apiUrl);
      assert.equal('https://api.monokle.com', (new ApiHandler(null as any)).apiUrl);
      assert.equal('https://api.monokle.com', (new ApiHandler(undefined as any)).apiUrl);
      assert.equal('https://api.monokle.com', (new ApiHandler(0 as any)).apiUrl);
    });

    it('uses passed Api Url', async () => {
      assert.equal('https://dev.api.monokle.com', (new ApiHandler('https://dev.api.monokle.com')).apiUrl);
      assert.equal('https://api.monokle.io', (new ApiHandler('https://api.monokle.io')).apiUrl);
      assert.equal('http://localhost:5000', (new ApiHandler('http://localhost:5000')).apiUrl);
      assert.equal('http://localhost', (new ApiHandler('http://localhost:80')).apiUrl);
    });
  });
});
