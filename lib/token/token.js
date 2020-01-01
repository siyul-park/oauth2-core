const encodingToken = require('./encoding-token');

class Token {
  constructor({
    id, issuer, subject, audience, expiresIn,
  }, scope) {
    this.jti = id;

    this.iss = issuer;
    if (subject) this.sub = subject;

    const now = Date.now();

    this.nbf = Math.floor(now / 1000);
    this.iat = Math.floor(now / 1000);

    if (expiresIn) this.exp = Math.floor(now / 1000 + expiresIn);

    if (audience) this.aud = audience;

    this.scope = scope;
  }

  encoding(secret) {
    return encodingToken(this, secret);
  }
}

module.exports = Token;
