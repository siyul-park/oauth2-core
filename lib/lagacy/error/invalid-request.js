const Error = require('./error');

class InvalidRequest extends Error {
  constructor(description = 'The request is missing a required parameter, includes an invalid parameter value, includes a parameter more than once, or is otherwise malformed.') {
    super(description);
  }
}

module.exports = InvalidRequest;
