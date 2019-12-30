const Request = require('./request');

class GenerateAccessTokenRequest extends Request {
  constructor({
    grantType, code, redirectUri, clientId, clientSecret,
  }) {
    super();

    this.grantType = grantType;
    this.code = code;
    if (redirectUri) this.redirectUri = redirectUri;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
  }
}

module.exports = GenerateAccessTokenRequest;
