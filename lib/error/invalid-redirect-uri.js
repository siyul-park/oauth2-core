const Error = require('./error');

class InvalidRedirectUri extends Error {
  constructor(description = 'Redirect uri is not same client\'s redirect uri') {
    super(description);
  }
}

module.exports = InvalidRedirectUri;
