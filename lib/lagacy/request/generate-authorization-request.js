const Request = require('./request');

class GenerateAuthorizationRequest extends Request {
  constructor({
    responseType, clientId, redirectUri, scope = [], state,
  }) {
    super();

    this.responseType = responseType;
    this.clientId = clientId;
    if (redirectUri) this.redirectUri = redirectUri;
    if (scope) this.scope = scope;
    if (state) this.state = state;
  }
}

module.exports = GenerateAuthorizationRequest;
