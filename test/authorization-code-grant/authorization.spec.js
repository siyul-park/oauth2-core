const setUp = require('../set-up');

const AuthorizationRequest = require('../../lib/request/authorization-request');
const responseType = require('../../lib/type/authorization-type');

const generatePublicClient = require('../../lib/client/generate/generate-public-client');
const authorization = require('../../lib/authorization-code-grant/authorization');

const {
  InvalidRequestError, UnsupportedTypeError, InvalidScopeError, UnauthorizedClientError,
} = require('../../lib/error');

const errorPool = require('../../lib/error/pool');

const Scope = require('../../lib/scope/scope');

// eslint-disable-next-line no-undef
describe('Authorization Code Grant', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    setUp();
  });

  // eslint-disable-next-line no-undef
  describe('Authorization Request', () => {
    // eslint-disable-next-line no-undef
    test('Authorization Request Success', async () => {
      const client = await generatePublicClient();
      const request = new AuthorizationRequest({
        responseType: responseType.CODE,
        clientId: client.id,
        scope: [Scope.ACCESS_TOKEN.CREATE],
      });

      await authorization(request);
    });

    // eslint-disable-next-line no-undef
    test('Authorization Request Fail Because responseType is not code', async () => {
      const client = await generatePublicClient();
      const request = new AuthorizationRequest({
        responseType: '', clientId: client.id,
      });

      try {
        // eslint-disable-next-line no-undef
        expect.assertions(1);
        await authorization(request);
        // eslint-disable-next-line no-undef
      } catch (e) {
        // eslint-disable-next-line no-undef
        expect(e).toEqual(errorPool.get(UnsupportedTypeError));
      }
    });

    // eslint-disable-next-line no-undef
    test('Authorization Request Fail Because responseType is null', async () => {
      const client = await generatePublicClient();
      const request = new AuthorizationRequest({
        responseType: null, clientId: client.id,
      });

      try {
        // eslint-disable-next-line no-undef
        expect.assertions(1);
        await authorization(request);
        // eslint-disable-next-line no-undef
      } catch (e) {
        // eslint-disable-next-line no-undef
        expect(e).toEqual(errorPool.get(InvalidRequestError));
      }
    });

    // eslint-disable-next-line no-undef
    test('Authorization Request Fail Because clientId is null', async () => {
      const request = new AuthorizationRequest({
        responseType: responseType.CODE, clientId: null,
      });

      try {
        // eslint-disable-next-line no-undef
        expect.assertions(1);
        await authorization(request);
        // eslint-disable-next-line no-undef
      } catch (e) {
        // eslint-disable-next-line no-undef
        expect(e).toEqual(errorPool.get(InvalidRequestError));
      }
    });

    // eslint-disable-next-line no-undef
    test('Authorization Request Fail Because responseType is not code', async () => {
      const request = new AuthorizationRequest({
        responseType: responseType.CODE, clientId: '',
      });

      try {
        // eslint-disable-next-line no-undef
        expect.assertions(1);
        await authorization(request);
        // eslint-disable-next-line no-undef
      } catch (e) {
        // eslint-disable-next-line no-undef
        expect(e).toEqual(errorPool.get(UnauthorizedClientError));
      }
    });

    // eslint-disable-next-line no-undef
    test('Authorization Request Fail Because scope is not supported', async () => {
      const client = await generatePublicClient();
      const request = new AuthorizationRequest({
        responseType: responseType.CODE, clientId: client.id, scope: ['other'],
      });

      try {
        // eslint-disable-next-line no-undef
        expect.assertions(1);
        await authorization(request);
        // eslint-disable-next-line no-undef
      } catch (e) {
        // eslint-disable-next-line no-undef
        expect(e).toEqual(errorPool.get(InvalidScopeError));
      }
    });
  });
});