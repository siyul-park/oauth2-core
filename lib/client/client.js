const { UnauthorizedClient } = require('../error/errors');
const isExist = require('../validation/is-exist');

const clientType = require('./client-type');

class Client {
  constructor(options = {
    id: null, secret: null, scope: [], redirectUri: null, type: null,
  }) {
    this.id = options.id;
    this.secret = options.secret;
    this.scope = options.scope;
    this.redirectUri = options.redirectUri;

    if (options.type === null) {
      if (options.secret === null) this.type = clientType.PUBLIC;
      else this.type = clientType.CONFIDENTIAL;
    } else {
      this.type = options.type;
    }
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
