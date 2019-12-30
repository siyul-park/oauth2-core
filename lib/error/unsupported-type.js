const Error = require('./error');

class UnsupportedType extends Error {
  constructor(description = 'The authorization server does not support obtaining an authorization code using this method.') {
    super(description);
  }
}

module.exports = UnsupportedType;
