const validateAuthorize = require('../validation/validate-authorize');
const AuthorizationCode = require('../../../token/authorization-code');

async function generateAuthorization(request, options) {
  await validateAuthorize(request, options);

  const { client_id: clientId, scope, state } = request;
  const {
    token, scopeToken, issuer,
  } = options;

  const { expiresIn } = token.authorizationCode;
  const { generateId, secret, activeToken } = token;
  const createAccessTokenScope = scopeToken.accessToken.create;

  const authorizationCode = new AuthorizationCode({
    id: await generateId(), issuer, expiresIn, clientId,
  }, { requestScope: scope, scope: createAccessTokenScope });

  await activeToken.manager.active(authorizationCode, 1);

  const code = authorizationCode.encoding(secret);

  return { code, state };
}

module.exports = generateAuthorization;
