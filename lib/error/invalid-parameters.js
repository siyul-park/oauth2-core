const Error = require('./error');

class InvalidParameters extends Error {
  constructor(options) {
    super('invalid_parameters', options);
  }
}

module.exports = InvalidParameters;
