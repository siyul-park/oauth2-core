const requestMethod = require('../../lib/http/request/request-method');
const grantType = require('../../lib/token/grant-type');

const Request = require('../../lib/http/request/request');

function generateTokenByCode(server, client, code, redirectUri) {
  return server.token(new Request({
    method: requestMethod.POST,
    body: {
      grant_type: grantType.AUTHORIZATION_CODE,
      code,
      redirect_uri: redirectUri,
      client_id: client.id,
    },
  }));
}

module.exports = generateTokenByCode;
