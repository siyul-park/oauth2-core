const { UnauthorizedClient } = require('../error/errors');

function decodingAuthorization(authorization = '', type = '') {
  const tokens = authorization.split(' ');

  if (tokens.length !== 2) throw UnauthorizedClient.create();
  if (tokens[0].toLowerCase() !== type.toLowerCase()) throw UnauthorizedClient.create();

  const decodingAuthorizationCode = atob(tokens[1]).split(':');
  if (decodingAuthorizationCode.length !== 2) throw UnauthorizedClient.create();
  const [id, secret] = decodingAuthorizationCode;

  // eslint-disable-next-line consistent-return
  return { id, secret };
}

module.exports = decodingAuthorization;
