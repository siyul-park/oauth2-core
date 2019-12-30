const setUp = require('../set-up');

const accessTokenGenerator = require('../../lib/authorization-code-grant/access-token');
const AccessTokenRequest = require('../../lib/request/generate-access-token-request');
const AccessTokenGrantType = require('../../lib/type/access-token-grant-type');

const generateConfidentialClient = require('../../lib/client/generate/generate-confidential-client');
const GenerateClientRequest = require('../../lib/request/generate-client-request');

const authorizationGenerator = require('../../lib/authorization-code-grant/authorization');
const AuthorizationRequest = require('../../lib/request/generate-authorization-request');
const AuthorizationType = require('../../lib/type/authorization-type');

// eslint-disable-next-line no-undef
describe('Authorization Code Grant', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    setUp();
  });

  // eslint-disable-next-line no-undef
  describe('Access Token Request', () => {
    // eslint-disable-next-line no-undef
    test('Access Token Request Success', async () => {
      const generateClientRequest = new GenerateClientRequest('Test', 'For library test', 'https://oauth-core-test/auth');
      const client = await generateConfidentialClient(generateClientRequest);

      const authorizationRequest = new AuthorizationRequest({
        responseType: AuthorizationType.AUTHORIZATION_CODE,
        clientId: client.id,
        redirectUri: generateClientRequest.redirectUri,
      });

      const authorization = await authorizationGenerator.generate(authorizationRequest);
      const authorizationResponse = authorization.allow();

      const accessTokenRequest = new AccessTokenRequest({
        grantType: AccessTokenGrantType.AUTHORIZATION_CODE,
        code: authorizationResponse.code,
        clientId: client.id,
        clientSecret: client.secret,
      });

      await accessTokenGenerator.generate(accessTokenRequest);
    });
  });
});
