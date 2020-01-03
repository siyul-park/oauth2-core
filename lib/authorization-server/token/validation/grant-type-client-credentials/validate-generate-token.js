const { UnauthorizedClient } = require('../../../../error/errors');

const validateScope = require('../../../../scope/validate-scope');
const authorizeClient = require('../../../../client/authrizate-client');
const getClientInfo = require('../../../../client/get-client-info');

async function validateGenerateTokenGrantTypePassword(request, options) {
  const { client, scopeToken } = options;

  const {
    id: clientId,
    secret: clientSecret,
  } = getClientInfo(request);

  request.client_id = clientId;

  const currentClient = await client.dao.findById(clientId);
  if (!currentClient) throw UnauthorizedClient.create();
  await authorizeClient(currentClient, clientSecret);

  validateScope(currentClient.scope, scopeToken.accessToken.create);
  validateScope(currentClient.scope, request.scope);
}

module.exports = validateGenerateTokenGrantTypePassword;
