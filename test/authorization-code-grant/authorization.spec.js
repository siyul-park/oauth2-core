const setUp = require('../set-up');

const AuthorizationRequest = require('../../lib/request/authorization-request');
const responseType = require('../../lib/request/type');

const generatePublicClient = require('../../lib/client/generate/generate-public-client');
const authorization = require('../../lib/authorization-code-grant/authorization');

const InvalidRequestError = require('../../lib/error/invalid-request');
const UnsupportedResponseType = require('../../lib/error/unsupported-response-type');
const UnauthorizedClient = require('../../lib/error/unauthorized-client');
const InvalidScope = require('../../lib/error/invalid-scope');

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
        clientId: client.identifier,
        scope: [Scope.ACCESS_TOKEN.CREATE],
      });

      await authorization(request);
    });

    // eslint-disable-next-line no-undef
    test('Authorization Request Fail Because responseType is not code', async () => {
      const client = await generatePublicClient();
      const request = new AuthorizationRequest({
        responseType: '', clientId: client.identifier,
      });

      try {
        // eslint-disable-next-line no-undef
        expect.assertions(1);
        await authorization(request);
        // eslint-disable-next-line no-undef
      } catch (e) {
        // eslint-disable-next-line no-undef
        expect(e).toEqual(errorPool.get(UnsupportedResponseType));
      }
    });

    // eslint-disable-next-line no-undef
    test('Authorization Request Fail Because responseType is null', async () => {
      const client = await generatePublicClient();
      const request = new AuthorizationRequest({
        responseType: null, clientId: client.identifier,
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
        expect(e).toEqual(errorPool.get(UnauthorizedClient));
      }
    });

    // eslint-disable-next-line no-undef
    test('Authorization Request Fail Because scope is not supported', async () => {
      const client = await generatePublicClient();
      const request = new AuthorizationRequest({
        responseType: responseType.CODE, clientId: client.identifier, scope: ['other'],
      });

      try {
        // eslint-disable-next-line no-undef
        expect.assertions(1);
        await authorization(request);
        // eslint-disable-next-line no-undef
      } catch (e) {
        // eslint-disable-next-line no-undef
        expect(e).toEqual(errorPool.get(InvalidScope));
      }
    });
  });
});
