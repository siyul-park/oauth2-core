const validateGenerateToken = require('../validation/grant-type-client-credentials/validate-generate-token');

const AccessToken = require('../../../token/access-token');
const tokenType = require('../../../token/token-type');

async function generateToken(request, options) {
  await validateGenerateToken(request, options);

  const { token, issuer } = options;
  const { generateId, secret } = token;

  const accessToken = new AccessToken({
    id: await generateId(),
    issuer,
    expiresIn: token.accessToken.expiresIn,
    clientId: request.client_id,
  }, request.scope);

  return {
    access_token: accessToken.encoding(secret),
    token_type: tokenType.BEARER,
    expires_in: token.accessToken.expiresIn,
  };
}
module.exports = generateToken;
