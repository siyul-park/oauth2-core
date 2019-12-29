const Error = require('./error');

class TemporarilyUnavailable extends Error {
  constructor(description = 'The generate-authorization server is currently unable to handle the request due to a temporary overloading or maintenance of the server.') {
    super(description, 503);
  }
}

module.exports = TemporarilyUnavailable;
