const validateAuthorizationRequest = require('../validation/validate-authorization-request');
const AuthorizationCode = require('../../../token/authorization-code');

// eslint-disable-next-line max-len
async function authorization(request, options) {
  await validateAuthorizationRequest(request, options);

  const {
    client_id: clientId, scope, state,
  } = request;

  const {
    // eslint-disable-next-line no-shadow
    token, scopeToken, issuer, authorization,
  } = options;

  const { expiresIn } = token.authorizationCode;
  const { generateId, secret } = token;
  const createAccessTokenScope = scopeToken.accessToken.create;

  authorization.callback(request);

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
