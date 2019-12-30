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

    const now = Date.now();

    this.nbf = Math.floor(now / 1000);
    this.iat = Math.floor(now / 1000);

    if (expirationPeriod) this.exp = Math.floor(now / 1000 + expirationPeriod);

    if (subject) this.sub = subject;
    if (audience) this.aud = audience;

    this.scope = scope;
  }

  encoding() {
    return encodingToken(this);
  }
}

module.exports = Token;
