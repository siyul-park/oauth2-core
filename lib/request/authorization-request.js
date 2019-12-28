const Request = require('./request');

class AuthorizationRequest extends Request {
  constructor({
    responseType, clientId, redirectUri, scope = [], state,
  }) {
    super();

    this.responseType = responseType;
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.scope = scope;
    this.state = state;
  }
}

module.exports = AuthorizationRequest;
