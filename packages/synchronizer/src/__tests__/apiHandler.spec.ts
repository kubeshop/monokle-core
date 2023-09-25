import {assert} from 'chai';
import {ApiHandler} from '../handlers/apiHandler.js';

describe('ApiHandler Tests', () => {
  describe('Authorization Header', () => {
    it('formats header correctly (bearer)', async () => {
      const synchronizer = new ApiHandler();
      const header = (synchronizer as any).formatAuthorizationHeader({
        accessToken: 'SAMPLE_TOKEN',
        tokenType: 'Bearer',
      });

      assert.equal('Bearer SAMPLE_TOKEN', header);
    });

    it('formats header correctly (apikey)', async () => {
      const synchronizer = new ApiHandler();
      const header = (synchronizer as any).formatAuthorizationHeader({
        accessToken: 'SAMPLE_TOKEN',
        tokenType: 'ApiKey',
      });

      assert.equal('ApiKey SAMPLE_TOKEN', header);
    });

    it('formats header correctly (invalid)', async () => {
      const synchronizer = new ApiHandler();
      const header = (synchronizer as any).formatAuthorizationHeader({
        accessToken: 'SAMPLE_TOKEN',
        tokenType: 'invalid',
      });

      assert.equal('Bearer SAMPLE_TOKEN', header);
    });

    it('formats header correctly (not set)', async () => {
      const synchronizer = new ApiHandler();
      const header = (synchronizer as any).formatAuthorizationHeader({
        accessToken: 'SAMPLE_TOKEN',
        tokenType: undefined,
      });

      assert.equal('Bearer SAMPLE_TOKEN', header);
    });
  });
});
