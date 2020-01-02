const validateAuthorize = require('../validation/validate-authorize');

const AccessToken = require('../../../token/access-token');

const tokenType = require('../../../token/token-type');

// eslint-disable-next-line no-unused-vars
async function generateAuthorization(request, options) {
  await validateAuthorize(request, options);

  const {
    client_id: clientId, scope, state,
  } = request;
  const {
    token, issuer, authorization,
  } = options;

  authorization.callback(request);

  const { generateId, secret } = token;

  const accessToken = new AccessToken({
    id: await generateId(), issuer, expiresIn: token.accessToken.expiresIn, clientId,
  }, scope);

  return {
    access_token: accessToken.encoding(secret),
    token_type: tokenType.BEARER,
    expires_in: token.accessToken.expiresIn,
    scope,
    state,
  };
}

module.exports = generateAuthorization;
