const {
  Request,
  requestMethod,
  grantType,
} = require('../../lib');

function generateTokenByCode(server, client, code, redirectUri) {
  return server.token(new Request({
    method: requestMethod.POST,
    headers: {
      Authorization: `Basic ${client.base64()}`,
    },
    body: {
      grant_type: grantType.AUTHORIZATION_CODE,
      code,
      redirect_uri: redirectUri,
      client_id: client.id,
    },
  }));
}

module.exports = generateTokenByCode;
