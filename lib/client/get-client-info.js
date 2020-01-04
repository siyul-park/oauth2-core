const decodingBasicAuthorization = require('../authorization/decoding-basic-authorization');
const { UnauthorizedClient } = require('../error/errors');

function getClientInfo({
  Authorization: authorization,
  client_id: clientId,
  client_secret: clientSecret,
}) {
  if (authorization && clientSecret) throw UnauthorizedClient.create();

  if (authorization) {
    const { id, secret } = decodingBasicAuthorization(authorization);
    if (clientId && id !== clientId) throw UnauthorizedClient.create();

    return { id, secret };
  } if (clientId) {
    return { id: clientId, secret: clientSecret };
  }

  return { id: null, secret: null };
}

module.exports = getClientInfo;
