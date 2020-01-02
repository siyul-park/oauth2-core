const validateGenerateTokenGrantTypeClientTypeCredentials = require('../validation/grant-type-client-credentials/validate-generate-token-grant-type-client-credentials');

const AccessToken = require('../../../token/access-token');

const tokenType = require('../../../token/token-type');
const decodingAuthorization = require('../../../token/decoding-authorization');

async function generateToken(request, options) {
  await validateGenerateTokenGrantTypeClientTypeCredentials(request, options);

  const {
    token, issuer,
  } = options;

  const { generateId, secret } = token;
  const { id: clientId } = decodingAuthorization(request.Authorization, tokenType.BASIC);

  const accessToken = new AccessToken({
    id: await generateId(), issuer, expiresIn: token.accessToken.expiresIn, clientId,
  }, request.scope);

  return {
    access_token: accessToken.encoding(secret),
    token_type: tokenType.BEARER,
    expires_in: token.accessToken.expiresIn,
  };
}
module.exports = generateToken;
