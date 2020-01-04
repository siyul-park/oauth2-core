const tokenType = require('../token/token-type');
const { UnauthorizedClient } = require('../error/errors');

function decodingBasicAuthorization(authorization = '') {
  const tokens = authorization.split(' ');

  if (tokens.length !== 2) throw UnauthorizedClient.create();
  if (tokens[0].toLowerCase() !== tokenType.BASIC.toLowerCase()) throw UnauthorizedClient.create();

  const decodingAuthorizationCode = atob(tokens[1]).split(':');
  if (decodingAuthorizationCode.length !== 2) throw UnauthorizedClient.create();
  const [id, secret] = decodingAuthorizationCode;

  return { id, secret };
}

module.exports = decodingBasicAuthorization;
