const { UnauthorizedClient } = require('../error/errors');
const isExist = require('../validation/is-exist');

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
    if ((isExist(secret) || isExist(this.secret)) && secret !== this.secret) {
      throw UnauthorizedClient.create();
    }
  }

  basic() {
    return btoa(`${this.id}:${this.secret}`);
  }
}

module.exports = Client;
