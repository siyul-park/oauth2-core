const Error = require('./error');

class AccessDenied extends Error {
  constructor(name = 'access_denied', options = { status: 403 }) {
    super(name, options);
  }
}

module.exports = AccessDenied;
