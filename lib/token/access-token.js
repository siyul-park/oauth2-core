const algorithms = require('../algorithm');

const Token = require('./token');
const TokenSubjectType = require('./token-subject-type');

class AccessToken extends Token {
  constructor(issuer, expirationPeriod, scope) {
    const generateTokenIdentifier = algorithms.get('generateTokenIdentifier');

    const now = Date.now();

    super({
      issuer,
      subject: TokenSubjectType.ACCESS_TOKEN,
      expiration: now + expirationPeriod,
      notBefore: now,
      issuedAt: now,
      id: generateTokenIdentifier(),
    }, scope);
  }
}

module.exports = AccessToken;
