const Request = require('./request');

class AccessTokenRequest extends Request {
  constructor({
    grantType, code, redirectUri, clientId,
  }) {
    super();

    this.grantType = grantType;
    this.code = code;
    this.redirectUri = redirectUri;
    this.clientId = clientId;
  }
}

module.exports = AccessTokenRequest;