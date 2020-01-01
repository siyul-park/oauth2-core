const InvalidParameters = require('./invalid-parameters');

class UnsupportedResponseType extends InvalidParameters {
  constructor(options) {
    super('unsupported_response_type', { ...options, status: 400 });
  }
}

module.exports = UnsupportedResponseType;
