const InvalidParameters = require('./invalid-parameters');

class InvalidRedirectUri extends InvalidParameters {
  constructor(options) {
    super('invalid_redirect_url', { ...options, status: 400 });
  }
}

module.exports = InvalidRedirectUri;
