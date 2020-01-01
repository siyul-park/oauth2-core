const Error = require('./error');

class InvalidParameters extends Error {
  constructor(name = 'invalid_parameters', options = { status: 400 }) {
    super(name, options);
  }
}

module.exports = InvalidParameters;
