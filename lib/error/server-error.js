const Error = require('./error');

class ServerError extends Error {
  constructor(description = 'The generate-authorization server encountered an unexpected condition that prevented it from fulfilling the request.') {
    super(description, 500);
  }
}

module.exports = ServerError;
