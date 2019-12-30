class Client {
  constructor(id, secret, type, name, description, redirectUri) {
    this.id = id;
    this.secret = secret;
    this.type = type;

    this.name = name;
    this.description = description;
    this.redirectUri = redirectUri;
  }
}

module.exports = Client;
