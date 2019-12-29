const Response = require('./response');

class AccessTokenResponse extends Response {
  constructor({
    accessToken, tokenType, expiresIn, refreshToken, scope,
  }) {
    super();

    this.accessToken = accessToken;
    this.tokenType = tokenType;

    if (expiresIn) this.expiresIn = expiresIn;
    if (refreshToken) this.refreshToken = refreshToken;
    if (scope) this.scope = scope;
  }
}

module.exports = AccessTokenResponse;
