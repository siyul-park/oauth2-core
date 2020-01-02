const grantType = require('../../../token/grant-type');

const generateTokenGrantTypeCode = require('./generate-token-grant-type-code');
const generateTokenGrantTypePassword = require('./generate-token-grant-type-password');

const { UnsupportedGrantType } = require('../../../error/errors');

function generateToken(request, options) {
  // eslint-disable-next-line max-len
  if (request.grant_type === grantType.AUTHORIZATION_CODE) return generateTokenGrantTypeCode(request, options);
  // eslint-disable-next-line max-len
  if (request.grant_type === grantType.PASSWORD) return generateTokenGrantTypePassword(request, options);

  throw UnsupportedGrantType.create();
}

module.exports = generateToken;
