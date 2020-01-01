const InvalidParameters = require('./invalid-parameters');

class TemporarilyUnavailable extends InvalidParameters {
  constructor(options) {
    super('temporarily_unavailable', { ...options, status: 503 });
  }
}

module.exports = TemporarilyUnavailable;
