const validateGenerateTokenGrantTypeCode = require('../validation/grant-type-code/validate-generate-token-grant-type-code');

const AccessToken = require('../../../token/access-token');
const RefreshToken = require('../../../token/refresh-token');

const decodingToken = require('../../../token/decoding-token');
const tokenType = require('../../../token/token-type');

async function generateToken(request, options) {
  await validateGenerateTokenGrantTypeCode(request, options);

  const {
    client_id: clientId, code,
  } = request;

  const {
    token, issuer, scopeToken,
  } = options;

  const { generateId, secret, activeToken } = token;
  const createAccessTokenScope = scopeToken.accessToken.create;

  const decodedCode = decodingToken(code, secret);
  await activeToken.manager.use(decodedCode);

  const accessToken = new AccessToken({
    id: await generateId(), issuer, expiresIn: token.accessToken.expiresIn, clientId,
  }, decodedCode.requested_scope);

  const refreshToken = new RefreshToken({
    id: await generateId(), issuer, expiresIn: token.refreshToken.expiresIn, clientId,
  }, createAccessTokenScope);

  return {
    access_token: accessToken.encoding(secret),
    token_type: tokenType.BEARER,
    expires_in: token.accessToken.expiresIn,
    refresh_token: refreshToken.encoding(secret),
  };
}
module.exports = generateToken;
