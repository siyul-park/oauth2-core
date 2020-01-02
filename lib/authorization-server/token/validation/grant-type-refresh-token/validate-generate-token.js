const { UnauthorizedClient } = require('../../../../error/errors');

const subjectType = require('../../../../token/subject-type');

const decodingToken = require('../../../../token/decoding-token');
const validateScope = require('../../../../scope/validate-scope');
const authorizeClient = require('../../../../client/authrizate-client');
const getClientInfo = require('../../../../client/get-client-info');

async function validateGenerateToken(request, options) {
  const { client, issuer, scopeToken } = options;

  const {
    id: clientId,
    secret: clientSecret,
  } = getClientInfo(request);

  request.client_id = clientId;

  const currentClient = await client.dao.findById(clientId);
  if (!currentClient) throw UnauthorizedClient.create();
  await authorizeClient(currentClient, clientSecret);

  const refreshToken = decodingToken(request.refresh_token, options.token.secret);

  // eslint-disable-next-line max-len
  if (refreshToken.iss !== issuer) throw UnauthorizedClient.create();
  if (refreshToken.client_id !== clientId) throw UnauthorizedClient.create();
  if (refreshToken.sub !== subjectType.REFRESH_TOKEN) throw UnauthorizedClient.create();

  const createAccessTokenScope = scopeToken.accessToken.create;

  validateScope(refreshToken.scope, createAccessTokenScope);
  validateScope(currentClient.scope, refreshToken.requested_scope);
  if (request.scope) validateScope(refreshToken.requested_scope, request.scope);

  request.scope = refreshToken.requested_scope;
}

module.exports = validateGenerateToken;
