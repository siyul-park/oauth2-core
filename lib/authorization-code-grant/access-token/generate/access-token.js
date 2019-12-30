const config = require('../../../config');

const validateAndGetCode = require('../validate/validate-and-get-code');

const TokenType = require('../../../token/type');

const AccessToken = require('../../../token/access-token');
const RefreshToken = require('../../../token/refresh-token');
const AccessTokenResponse = require('../../../response/access-token-reponse');

const Scope = require('../../../scope/scope');

async function generateAccessToken(request) {
  const code = await validateAndGetCode(request);

  const accessTokenExpirationPeriod = config.get('accessTokenExpirationPeriod');
  const refreshTokenExpirationPeriod = config.get('refreshTokenExpirationPeriod');

  const accessToken = new AccessToken(
    { clientId: code.clientId, userId: code.userId },
    accessTokenExpirationPeriod,
    code.requestScope,
  );

  const refreshToken = new RefreshToken(
    { clientId: code.clientId, userId: code.userId },
    refreshTokenExpirationPeriod,
    [Scope.ACCESS_TOKEN.CREATE],
  );

  return new AccessTokenResponse({
    accessToken: accessToken.encoding(),
    tokenType: TokenType.BEARER,
    expiresIn: accessTokenExpirationPeriod,
    scope: accessToken.scope,
    refreshToken: refreshToken.encoding(),
  });
}

module.exports = generateAccessToken;
