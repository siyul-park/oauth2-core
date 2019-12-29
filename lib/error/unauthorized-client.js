const Error = require('./error');

class UnauthorizedClient extends Error {
  constructor(description = 'The client is not authorized to request an generate-authorization code using this method.') {
    super(description);
  }
}

module.exports = UnauthorizedClient;
