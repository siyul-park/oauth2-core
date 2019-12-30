const Request = require('./request');

class GenerateAccessTokenRequest extends Request {
  constructor({
    grantType, code, redirectUri, clientId, userId, clientSecret,
  }) {
    super();

    this.grantType = grantType;
    this.code = code;
    if (redirectUri) this.redirectUri = redirectUri;
    this.clientId = clientId;
    if (userId) this.userId = userId;
    if (clientSecret) this.clientSecret = clientSecret;
  }
}

module.exports = GenerateAccessTokenRequest;
