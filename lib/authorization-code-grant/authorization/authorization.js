const AuthorizationResponse = require('../../response/authorization-response');

const validate = require('./validate');

async function authorization(request) {
  await validate(request);

  return new AuthorizationResponse({});
}

module.exports = authorization;
