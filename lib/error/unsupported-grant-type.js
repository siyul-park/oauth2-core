const InvalidParameters = require('./invalid-parameters');

class UnsupportedGrantType extends InvalidParameters {
  constructor(options) {
    super('unsupported_grant_type', { ...options, status: 400 });
  }
}

module.exports = UnsupportedGrantType;
