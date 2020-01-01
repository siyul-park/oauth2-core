const InvalidParameters = require('./invalid-parameters');

class InvalidRequest extends InvalidParameters {
  constructor(options) {
    super('invalid_request', { ...options, status: 400 });
  }
}

module.exports = InvalidRequest;
