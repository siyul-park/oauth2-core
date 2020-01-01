const Error = require('./error');

class InvalidParameters extends Error {
  constructor(options) {
    super('invalid_parameters', { ...options, status: 400 });
  }
}

module.exports = InvalidParameters;
