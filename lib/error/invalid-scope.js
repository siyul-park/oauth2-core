const InvalidParameters = require('./invalid-parameters');

class InvalidScope extends InvalidParameters {
  constructor(options) {
    super('invalid_scope', { ...options, status: 403 });
  }
}

module.exports = InvalidScope;
