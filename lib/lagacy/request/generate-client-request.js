class GenerateClientRequest {
  constructor(name, description, redirectUri) {
    this.name = name;
    this.description = description;
    this.redirectUri = redirectUri;
  }
}

module.exports = GenerateClientRequest;
