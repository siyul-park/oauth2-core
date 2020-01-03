const InvalidParameters = require('./invalid-parameters');

class InvalidToken extends InvalidParameters {
  constructor(options) {
    super('invalid_token', { ...options, status: 403 });
  }
}

module.exports = InvalidToken;
