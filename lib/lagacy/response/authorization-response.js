const Response = require('./response');

class AuthorizationResponse extends Response {
  constructor({ code, state, redirectUri }) {
    super();

    this.code = code;
    this.state = state;
    this.redirectUri = redirectUri;
  }
}

module.exports = AuthorizationResponse;
