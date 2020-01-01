class Client {
  constructor(options = { id: null, accessAbility: [], redirectUri: null }) {
    this.id = options.id;
    this.accessAbility = options.accessAbility;
    this.redirectUri = options.redirectUri;
  }
}

module.exports = Client;
