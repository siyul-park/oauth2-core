const { UnauthorizedClient } = require('../../../../error/errors');

const validateScope = require('../../../../scope/validate-scope');
const validateRedirectUri = require('../../../../http/redirect-uri/validate-redirect-uri');

// eslint-disable-next-line max-len
async function validateAuthorize({ client_id: clientId, redirect_uri: redirectUri, scope }, options) {
  const { client, scopeToken } = options;

  const currentClient = await client.dao.findById(clientId);
  if (!currentClient) throw UnauthorizedClient.create();

  validateScope(currentClient.scope, scopeToken.accessToken.create);
  validateScope(currentClient.scope, scopeToken.refreshToken.create);
  validateScope(currentClient.scope, scope);

  validateRedirectUri(currentClient.redirectUri, redirectUri);
}

module.exports = validateAuthorize;
