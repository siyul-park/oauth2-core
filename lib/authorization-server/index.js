const authorizationServerDefaultOption = require('./option/authorization-server-default-option');

class AuthorizationServer {
  constructor(options = authorizationServerDefaultOption) {
    this.otions = options;
  }
}

module.exports = AuthorizationServer;
