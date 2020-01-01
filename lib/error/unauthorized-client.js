const InvalidParameters = require('./invalid-parameters');

class UnauthorizedClient extends InvalidParameters {
  constructor(options) {
    super('unauthorized_client', { ...options, status: 401 });
  }
}

module.exports = UnauthorizedClient;
