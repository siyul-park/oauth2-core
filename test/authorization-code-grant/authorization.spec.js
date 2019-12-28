const AuthorizationRequest = require('../../lib/request/authorization-request');
const responseType = require('../../lib/request/type');

const generatePublicClient = require('../../lib/client/generate/generate-public-client');

const register = require('../client/mock/register-client-data-accessor');

const validate = require('../../lib/authorization-code-grant/authorization/validate');

// eslint-disable-next-line no-undef
describe('Authorization Code Grant', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    register();
  });

  // eslint-disable-next-line no-undef
  describe('Authorization Request', () => {
    // eslint-disable-next-line no-undef
    test('Validation Authorization Request Success', async () => {
      const client = await generatePublicClient();
      const request = new AuthorizationRequest({
        responseType: responseType.CODE, clientId: client.identifier,
      });

      await validate(request);
    });
  });
});
