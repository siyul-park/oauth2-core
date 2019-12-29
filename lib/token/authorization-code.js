const algorithms = require('../algorithm');

const Token = require('./token');

class AuthorizationCode extends Token {
  constructor(clientIdentifier, expirationPeriod, scope) {
    const generateTokenIdentifier = algorithms.get('generateTokenIdentifier');

    const now = Date.now();

    super({
      issuer: clientIdentifier,
      subject: 'Authorization Code',
      expiration: now + expirationPeriod,
      notBefore: now,
      issuedAt: now,
      identifier: generateTokenIdentifier(),
    }, scope);
  }
}

module.exports = AuthorizationCode;
