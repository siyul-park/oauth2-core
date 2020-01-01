const Error = require('./error');

class InvalidToken extends Error {
  constructor(description = 'The token is invalid.') {
    super(description);
  }
}

module.exports = InvalidToken;
