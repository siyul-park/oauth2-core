const { UnauthorizedClient } = require('../error/errors');

class Client {
  constructor(options = {
    id: null, secret: null, scope: [], redirectUri: null,
  }) {
    this.id = options.id;
    this.secret = options.secret;
    this.scope = options.scope;
    this.redirectUri = options.redirectUri;
  }

  authenticate(request) {
    if (request.client_id !== this.id || request.client_secret !== this.secret) {
      throw UnauthorizedClient.create();
    }
  }
}

module.exports = Client;
