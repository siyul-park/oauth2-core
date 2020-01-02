const validateGenerateTokenGrantTypePassword = require('../validation/grant-type-password/validate-generate-token');

const AccessToken = require('../../../token/access-token');
const RefreshToken = require('../../../token/refresh-token');

const tokenType = require('../../../token/token-type');

async function generateToken(request, options) {
  await validateGenerateTokenGrantTypePassword(request, options);

  const { username } = request;
  const { token, issuer, scopeToken } = options;

  const { generateId, secret } = token;
  const createAccessTokenScope = scopeToken.accessToken.create;

  const accessToken = new AccessToken({
    id: await generateId(), issuer, expiresIn: token.accessToken.expiresIn, username,
  }, request.scope);

  const refreshToken = new RefreshToken({
    id: await generateId(), issuer, expiresIn: token.refreshToken.expiresIn, username,
  }, { scope: createAccessTokenScope, requestScope: request.scope });

  return {
    access_token: accessToken.encoding(secret),
    token_type: tokenType.BEARER,
    expires_in: token.accessToken.expiresIn,
    refresh_token: refreshToken.encoding(secret),
  };
}
module.exports = generateToken;
