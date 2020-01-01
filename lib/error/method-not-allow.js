const Error = require('./error');

class MethodNotAllow extends Error {
  constructor(options) {
    super('method_not_allow', { ...options, status: 405 });
  }
}

module.exports = MethodNotAllow;
