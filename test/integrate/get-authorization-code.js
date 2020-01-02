const {
  Request,
  requestMethod,
  responseType,
} = require('../../lib');

async function getAuthorizationCode(server, client, scope = null) {
  const response = await server.authorize(new Request({
    method: requestMethod.GET,
    query: {
      response_type: responseType.CODE,
      client_id: client.id,
      scope,
    },
  }));

  return response.body.code;
}

module.exports = getAuthorizationCode;
