const InvalidParameters = require('./invalid-parameters');

class InvalidToken extends InvalidParameters {
  constructor(options) {
    super('access_denied', { ...options, status: 403 });
  }
}

module.exports = InvalidToken;
