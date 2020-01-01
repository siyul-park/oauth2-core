const validateAuthorizationRequest = require('../validation/validate-authorization-request');
const AuthorizationCode = require('../../../token/authorization-code');

// eslint-disable-next-line max-len
async function authorization(request, options) {
  await validateAuthorizationRequest(request, options);

  const {
    client_id: clientId, scope, state,
  } = request;

  const { token, scopeToken, issuer } = options;

  const { expiresIn } = token.authorizationCode;
  const { generateId, secret } = token;
  const createAccessTokenScope = scopeToken.accessToken.create;

  const authorizationCode = new AuthorizationCode({
    id: generateId(), issuer, expiresIn, clientId,
  }, {
    requestScope: scope, scope: createAccessTokenScope,
  });

  return {
    code: authorizationCode.encoding(secret),
    state,
  };
}

module.exports = authorization;
