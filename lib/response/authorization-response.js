const Response = require('./response');

class AuthorizationResponse extends Response {
  constructor({code, state}) {
    super();

    this.code = code;
    this.state = state;
  }
}

module.exports = AuthorizationResponse;
