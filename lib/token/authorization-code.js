const Token = require('./token');
const generateTokenIdentifier = require('./generate-token-identifier');

class AuthorizationCode extends Token {
  constructor(clientIdentifier, expirationPeriod, scope) {
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
