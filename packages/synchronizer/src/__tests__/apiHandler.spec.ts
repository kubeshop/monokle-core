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
    it('uses default Api Url by default', () => {
      assert.equal('https://api.monokle.com', new ApiHandler().apiUrl);
    });

    it('uses default Api Url when falsy value passed', () => {
      assert.equal('https://api.monokle.com', new ApiHandler('').apiUrl);
      assert.equal('https://api.monokle.com', new ApiHandler(false as any).apiUrl);
      assert.equal('https://api.monokle.com', new ApiHandler(null as any).apiUrl);
      assert.equal('https://api.monokle.com', new ApiHandler(undefined as any).apiUrl);
      assert.equal('https://api.monokle.com', new ApiHandler(0 as any).apiUrl);
      assert.equal('https://api.monokle.com', new ApiHandler([] as any).apiUrl);
    });

    it('uses passed Api Url', () => {
      assert.equal('https://dev.api.monokle.com', new ApiHandler('https://dev.api.monokle.com').apiUrl);
      assert.equal('https://api.monokle.io', new ApiHandler('https://api.monokle.io').apiUrl);
      assert.equal('http://localhost:5000', new ApiHandler('http://localhost:5000').apiUrl);
      assert.equal('http://localhost', new ApiHandler('http://localhost:80').apiUrl);
    });

    it('uses passed origin data #1', () => {
      const apiHandler = new ApiHandler({
        origin: 'https://test.monokle.com',
        apiOrigin: 'https://api.test.monokle.com',
        authOrigin: 'https://auth.test.monokle.com',
        authClientId: 'SAMPLE_CLIENT_ID',
      });
      assert.equal('https://api.test.monokle.com', apiHandler.apiUrl);
    });

    it('uses passed origin data #2', () => {
      const apiHandler = new ApiHandler({
        origin: 'https://custom.domain.io',
        apiOrigin: 'https://custom.domain.io/api',
        authOrigin: 'https://custom.domain.io/auth',
        authClientId: 'SAMPLE_CLIENT_ID',
      });

      assert.equal('https://custom.domain.io/api', apiHandler.apiUrl);
    });

    it('generates correct deep links', () => {
      assert.equal('https://app.monokle.com/projects', new ApiHandler('').generateDeepLink('projects'));
      assert.equal(
        'https://app.staging.monokle.com/projects',
        new ApiHandler('https://api.staging.monokle.com').generateDeepLink('projects')
      );
      assert.equal(
        'http://localhost:5000/projects',
        new ApiHandler('http://localhost:5000').generateDeepLink('projects')
      );

      const apiHandler = new ApiHandler({
        origin: 'https://custom.domain.io',
        apiOrigin: 'https://custom.domain.io/api',
        authOrigin: 'https://custom.domain.io/auth',
        authClientId: 'SAMPLE_CLIENT_ID',
      });
      assert.equal('https://custom.domain.io/projects', apiHandler.generateDeepLink('projects'));
    });
  });
});
