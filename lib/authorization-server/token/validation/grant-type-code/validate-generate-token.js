const { UnauthorizedClient } = require('../../../../error/errors');

const subjectType = require('../../../../token/subject-type');

const decodingToken = require('../../../../token/decoding-token');

const validateRedirectUri = require('../../../../http/redirect-uri/validate-redirect-uri');
const authorizeClient = require('../../../../client/authrizate-client');
const getClientInfo = require('../../../../client/get-client-info');

async function validateGenerateToken(request, options) {
  const { id, secret } = getClientInfo(request);
  if (id !== request.client_id) throw UnauthorizedClient.create();

  const { client } = options;

  const currentClient = await client.dao.findById(request.client_id);
  if (!currentClient || !currentClient.secret) throw UnauthorizedClient.create();

  await authorizeClient(currentClient, secret);

  const code = decodingToken(request.code, options.token.secret);

  // eslint-disable-next-line max-len
  if (code.client_id !== request.client_id) throw UnauthorizedClient.create();
  if (code.sub !== subjectType.AUTHORIZATION_CODE) throw UnauthorizedClient.create();

  validateRedirectUri(currentClient.redirect_uri, request.redirect_uri);
}

module.exports = validateGenerateToken;
