const Error = require('./error');

class AccessDenied extends Error {
  constructor(description = 'The resource owner or generate-authorization server denied the request') {
    super(description);
  }
}

module.exports = AccessDenied;
