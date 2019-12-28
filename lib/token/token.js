class Token {
  constructor({
    issuer, subject, audience, expiration, notBefore, issuedAt, identifier,
  }, scope) {
    if (issuer) this.iss = issuer;
    if (subject) this.sub = subject;
    if (audience) this.aud = audience;
    if (expiration) this.exp = expiration;
    if (notBefore) this.nbf = notBefore;
    if (issuedAt) this.iat = issuedAt;
    if (identifier) this.jti = identifier;

    this.scope = scope;
  }
}

module.exports = Token;
