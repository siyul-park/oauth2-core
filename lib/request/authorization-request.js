const responseType = require('./response-type');

class AuthorizationRequest {
  constructor({clientId, redirectUri, scope, state}) {
    this.responseType = responseType.code;
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.scope = scope;
    this.state = state;
  }
}

module.exports = AuthorizationRequest;
