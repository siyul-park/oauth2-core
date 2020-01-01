class Error {
  constructor(description, statusCode) {
    this.description = description;
    this.statusCode = statusCode;
  }
}

module.exports = Error;
