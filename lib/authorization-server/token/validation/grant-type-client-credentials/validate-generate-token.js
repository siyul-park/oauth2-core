const { UnauthorizedClient } = require('../../../../error/errors');

const tokenType = require('../../../../token/token-type');
const decodingAuthorization = require('../../../../authorization/decoding-authorization');

const validateScope = require('../../../../scope/validate-scope');
const authorizeClient = require('../../../../client/authrizate-client');

async function validateGenerateTokenGrantTypePassword(request, options) {
  const { client } = options;

  const {
    id: clientId,
    secret: clientSecret,
  } = decodingAuthorization(request.Authorization, tokenType.BASIC);

  const currentClient = await client.dao.findById(clientId);
  if (!currentClient) throw UnauthorizedClient.create();
  await authorizeClient(currentClient, clientSecret);

  validateScope(currentClient.scope, request.scope);
}

module.exports = validateGenerateTokenGrantTypePassword;