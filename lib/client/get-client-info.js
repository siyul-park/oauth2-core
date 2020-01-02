const tokenType = require('../token/token-type');
const decodingAuthorization = require('../authorization/decoding-authorization');

function getClientInfo({
  Authorization: authorization,
  client_id: clientId,
  client_secret: clientSecret,
}) {
  if (authorization) {
    const { id, secret } = decodingAuthorization(authorization, tokenType.BASIC);

    return { id, secret };
  } if (clientId) {
    return { id: clientId, secret: clientSecret };
  }

  return { id: null, secret: null };
}

module.exports = getClientInfo;
