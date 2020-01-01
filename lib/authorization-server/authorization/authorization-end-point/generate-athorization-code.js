const validateAuthorize = require('../validation/validate-authorize');
const AuthorizationCode = require('../../../token/authorization-code');

// eslint-disable-next-line max-len
async function generateAuthorization(request, options) {
  await validateAuthorize(request, options);

  const {
    client_id: clientId, scope, state,
  } = request;

  const {
    token, scopeToken, issuer, authorization,
  } = options;

  const { expiresIn } = token.authorizationCode;
  const { generateId, secret } = token;
  const createAccessTokenScope = scopeToken.accessToken.create;

  authorization.callback(request);

  const authorizationCode = new AuthorizationCode({
    id: await generateId(), issuer, expiresIn, clientId,
  }, {
    requestScope: scope, scope: createAccessTokenScope,
  });

  return {
    code: authorizationCode.encoding(secret),
    state,
  };
}

module.exports = generateAuthorization;
