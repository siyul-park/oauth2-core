const { UnauthorizedClient } = require('../../../../error/errors');

const subjectType = require('../../../../token/subject-type');

const decodingToken = require('../../../../token/decoding-token');

const validateScope = require('../../../../scope/validate-scope');
const validateRedirectUri = require('../../../../http/redirect-uri/validate-redirect-uri');
const authorizeClient = require('../../../../client/authrizate-client');
const getClientInfo = require('../../../../client/get-client-info');

async function validateGenerateToken(request, options) {
  const { client, issuer, scopeToken } = options;

  const { id, secret } = getClientInfo(request);
  if (id !== request.client_id) throw UnauthorizedClient.create();

  const currentClient = await client.dao.findById(request.client_id);
  if (!currentClient || !currentClient.secret) throw UnauthorizedClient.create();

  await authorizeClient(currentClient, secret);

  const code = decodingToken(request.code, options.token.secret);

  if (code.iss !== issuer) throw UnauthorizedClient.create();
  if (code.client_id !== request.client_id) throw UnauthorizedClient.create();
  if (code.sub !== subjectType.AUTHORIZATION_CODE) throw UnauthorizedClient.create();

  validateRedirectUri(currentClient.redirect_uri, request.redirect_uri);

  validateScope(code.scope, scopeToken.accessToken.create);
  validateScope(code.scope, scopeToken.refreshToken.create);
  validateScope(currentClient.scope, scopeToken.accessToken.create);
  validateScope(currentClient.scope, scopeToken.refreshToken.create);
}

module.exports = validateGenerateToken;
