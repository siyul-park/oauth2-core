const Error = require('./error');

class InvalidScope extends Error {
  constructor(description = 'The requested scope is invalid, unknown, or malformed.') {
    super(description);
  }
}

module.exports = InvalidScope;
