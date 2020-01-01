const { UnauthorizedClient } = require('../../../error/errors');

const getScopeToken = require('../../../scope/get-scope-token');
const validateScopeToken = require('../../../scope/validate-scope-token');
const validateRedirectUri = require('../../../http/redirect-uri/validate-redirect-uri');

// eslint-disable-next-line max-len
async function validateAuthorize({ client_id: clientId, redirect_uri: redirectUri, scope }, options) {
  const { client } = options;

  const currentClient = await client.dao.findById(clientId);
  if (!currentClient) throw UnauthorizedClient.create();

  const scopeToken = getScopeToken(scope);
  const clientScopeToken = getScopeToken(currentClient.scope);
  validateScopeToken(clientScopeToken, scopeToken);

  validateRedirectUri(currentClient.redirectUri, redirectUri);
}

module.exports = validateAuthorize;
