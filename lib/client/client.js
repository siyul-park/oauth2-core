class Client {
  constructor(options = {
    id: null, secret: null, scope: [], redirectUri: null,
  }) {
    this.id = options.id;
    this.secret = options.secret;
    this.scope = options.scope;
    this.redirectUri = options.redirectUri;
  }
}

module.exports = Client;
