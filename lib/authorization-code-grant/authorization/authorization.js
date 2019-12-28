const validate = require('./validate');

const AuthorizationResponse = require('../../response/authorization-response');
const config = require('../../config');
const encodingToken = require('../../token/encoding-token');
const AuthorizationCode = require('../../token/authorization-code');

async function authorization(request) {
  await validate(request);

  const expirationPeriod = config.get('authorizationCodeExpirationPeriod');

  const code = new AuthorizationCode(request.clientId, expirationPeriod, request.scope);
  const token = encodingToken(code);

  return new AuthorizationResponse({ code: token, state: request.state });
}

module.exports = authorization;
