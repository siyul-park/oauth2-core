const AuthorizationResponse = require('../../response/authorization-response');

const validate = require('./authorization-validate');

function authorization(request) {
  validate(request);

  return new AuthorizationResponse({});
}

module.exports = authorization;
