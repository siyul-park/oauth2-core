const grantType = require('../../../token/grant-type');

const generateTokenGrantTypeCode = require('./generate-token-grant-type-code');
const generateTokenGrantTypePassword = require('./generate-token-grant-type-password');
const generateTokenGrantTypeClientCredentials = require('./generate-token-grant-type-client-credentials');
const generateTokenGrantTypeRefreshToken = require('./generate-token-grant-type-refresh-token');

const { UnsupportedGrantType } = require('../../../error/errors');

function generateToken(request, options) {
  // eslint-disable-next-line max-len
  if (request.grant_type === grantType.AUTHORIZATION_CODE) return generateTokenGrantTypeCode(request, options);
  // eslint-disable-next-line max-len
  if (request.grant_type === grantType.PASSWORD) return generateTokenGrantTypePassword(request, options);
  // eslint-disable-next-line max-len
  if (request.grant_type === grantType.CLIENT_CREDENTIALS) return generateTokenGrantTypeClientCredentials(request, options);
  // eslint-disable-next-line max-len
  if (request.grant_type === grantType.REFRESH_TOKEN) return generateTokenGrantTypeRefreshToken(request, options);

  throw UnsupportedGrantType.create();
}

module.exports = generateToken;
