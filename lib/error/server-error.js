const Error = require('./error');

class ServerError extends Error {
  constructor(options) {
    super('server_error', { ...options, status: 500 });
  }
}

module.exports = ServerError;
