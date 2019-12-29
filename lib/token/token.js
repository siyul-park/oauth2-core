class Token {
  constructor({
    issuer, subject, audience, expiration, notBefore, issuedAt, id,
  }, scope) {
    if (issuer) this.iss = issuer;
    if (subject) this.sub = subject;
    if (audience) this.aud = audience;
    if (expiration) this.exp = expiration;
    if (notBefore) this.nbf = notBefore;
    if (issuedAt) this.iat = issuedAt;
    if (id) this.jti = id;

    this.scope = scope;
  }
}

module.exports = Token;
