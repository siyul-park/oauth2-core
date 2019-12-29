const algorithms = require('../algorithm');
const config = require('../config');
const encodingToken = require('./encoding-token');

class Token {
  constructor({
    subject, audience, expirationPeriod,
  }, scope) {
    const generateTokenIdentifier = algorithms.get('generateTokenIdentifier');

    this.iss = config.get('issuer');
    this.jti = generateTokenIdentifier();

    if (expirationPeriod) {
      const now = Date.now();

      this.exp = Math.floor((now + expirationPeriod) / 1000);
      this.nbf = Math.floor(now / 1000);
      this.iat = Math.floor(now / 1000);
    }

    if (subject) this.sub = subject;
    if (audience) this.aud = audience;

    this.scope = scope;
  }

  encoding() {
    return encodingToken(this);
  }
}

module.exports = Token;
