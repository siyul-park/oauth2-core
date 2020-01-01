const grantType = require('../../../token/grant-type');

const generateTokenGrantTypeCode = require('./generate-token-grant-type-code');

const { UnsupportedGrantType } = require('../../../error/errors');

function generateToken(request) {
  if (request.grant_type === grantType.AUTHORIZATION_CODE) return generateTokenGrantTypeCode();

  throw UnsupportedGrantType.create();
}

module.exports = generateToken;
