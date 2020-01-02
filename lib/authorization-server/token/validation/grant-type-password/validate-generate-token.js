const { UnauthorizedClient, AccessDenied } = require('../../../../error/errors');

const validateScope = require('../../../../scope/validate-scope');
const authorizeClient = require('../../../../client/authrizate-client');

const getClientInfo = require('../../../../client/get-client-info');

async function validateGenerateToken(request, options) {
  const { client, user } = options;

  const {
    id: clientId,
    secret: clientSecret,
  } = getClientInfo(request);

  if (clientId != null) {
    const currentClient = await client.dao.findById(clientId);
    if (!currentClient) throw UnauthorizedClient.create();
    await authorizeClient(currentClient, clientSecret);

    validateScope(currentClient.scope, request.scope);
  }

  const currentUser = await user.dao.findByName(request.username);
  if (!currentUser) throw AccessDenied.create();
  await currentUser.authenticate(request.password);

  validateScope(currentUser.scope, request.scope);
}

module.exports = validateGenerateToken;
