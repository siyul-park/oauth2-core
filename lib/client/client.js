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

  authenticate(secret) {
    if (!!this.secret && secret !== this.secret) {
      throw UnauthorizedClient.create();
    }
  }

  base64() {
    return btoa(`${this.id}:${this.secret}`);
  }
}

module.exports = Client;
