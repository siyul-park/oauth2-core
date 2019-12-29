const Error = require('./error');

class UnsupportedType extends Error {
  constructor(description = 'The generate-authorization server does not support obtaining an generate-authorization code using this method.') {
    super(description);
  }
}

module.exports = UnsupportedType;
