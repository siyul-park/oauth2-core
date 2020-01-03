const { UnauthorizedClient, AccessDenied } = require('../../../../error/errors');

const getScopeToken = require('../../../../scope/get-scope-token');
const validateScope = require('../../../../scope/validate-scope');
const authorizeClient = require('../../../../client/authrizate-client');
const getClientInfo = require('../../../../client/get-client-info');

async function validateGenerateToken(request, options) {
  const { client, user, scopeToken } = options;

  const {
    id: clientId,
    secret: clientSecret,
  } = getClientInfo(request);

  const availableScopeTokens = new Set();

  if (clientId != null) {
    const currentClient = await client.dao.findById(clientId);
    if (!currentClient) throw UnauthorizedClient.create();
    await authorizeClient(currentClient, clientSecret);

    const tokenScope = getScopeToken(currentClient.scope);
    tokenScope.forEach((token) => { availableScopeTokens.add(token); });
  }

  const currentUser = await user.dao.findByName(request.username);
  if (!currentUser) throw AccessDenied.create();
  await currentUser.authenticate(request.password);

  const tokenScope = getScopeToken(currentUser.scope);
  tokenScope.forEach((token) => { availableScopeTokens.add(token); });

  validateScope(availableScopeTokens, scopeToken.accessToken.create);
  validateScope(availableScopeTokens, scopeToken.refreshToken.create);
  validateScope(availableScopeTokens, request.scope);
}

module.exports = validateGenerateToken;
