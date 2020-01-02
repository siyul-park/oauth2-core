const tokenType = require('../token/token-type');
const decodingAuthorization = require('../authorization/decoding-authorization');
const { UnauthorizedClient } = require('../error/errors');

function getClientSecret({
  Authorization: authorization,
  client_id: clientId,
  client_secret: clientSecret,
}) {
  if (authorization) {
    const { id, secret } = decodingAuthorization(authorization, tokenType.BASIC);

    if (id !== clientId) throw UnauthorizedClient.create();

    return secret;
  } if (clientSecret) {
    return clientSecret;
  }

  throw UnauthorizedClient.create();
}

module.exports = getClientSecret;
