const generateConfidentialClient = require('../../../lib/lagacy/client/generate/generate-confidential-client');
const GenerateClientRequest = require('../../../lib/lagacy/request/generate-client-request');

const authorizationGenerator = require('../../../lib/lagacy/authorization-code-grant/authorization');
const AuthorizationRequest = require('../../../lib/lagacy/request/generate-authorization-request');
const AuthorizationType = require('../../../lib/lagacy/type/authorization-type');

async function authorizationConfidential() {
  const generateClientRequest = new GenerateClientRequest('Test', 'For library test', 'https://oauth-core-test/auth');
  const client = await generateConfidentialClient(generateClientRequest);

  const authorizationRequest = new AuthorizationRequest({
    responseType: AuthorizationType.AUTHORIZATION_CODE,
    clientId: client.id,
    redirectUri: generateClientRequest.redirectUri,
  });

  const auth = await authorizationGenerator.generate(authorizationRequest);
  return { authorization: await auth.allow(), client };
}

module.exports = authorizationConfidential;
