class Error {
  constructor(name, { description, uri, status }) {
    this.name = name;
    if (description) this.description = description;
    if (uri) this.uri = uri;
    if (status) this.status = status;
  }
}

module.exports = Error;
