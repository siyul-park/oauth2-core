const generatePublicClient = require('../../lib/client/generate/generate-public-client');
const GenerateClientRequest = require('../../lib/request/generate-client-request');

const authorizationGenerator = require('../../lib/authorization-code-grant/authorization');
const AuthorizationRequest = require('../../lib/request/generate-authorization-request');
const AuthorizationType = require('../../lib/type/authorization-type');

async function authorizationPublic() {
  const generateClientRequest = new GenerateClientRequest('Test', 'For library test', 'https://oauth-core-test/auth');
  const client = await generatePublicClient(generateClientRequest);

  const authorizationRequest = new AuthorizationRequest({
    responseType: AuthorizationType.AUTHORIZATION_CODE,
    clientId: client.id,
    redirectUri: generateClientRequest.redirectUri,
  });

  const auth = await authorizationGenerator.generate(authorizationRequest);
  return { authorization: await auth.allow(), client };
}

module.exports = authorizationPublic;
