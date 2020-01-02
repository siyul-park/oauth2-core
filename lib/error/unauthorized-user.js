const InvalidParameters = require('./invalid-parameters');

class UnauthorizedUser extends InvalidParameters {
  constructor(options) {
    super('access_denied', { ...options, status: 403 });
  }
}

module.exports = UnauthorizedUser;
