const { UnauthorizedClient } = require('../../../../error/errors');

const subjectType = require('../../../../token/subject-type');

const decodingToken = require('../../../../token/decoding-token');

const validateRedirectUri = require('../../../../http/redirect-uri/validate-redirect-uri');
const authorizeClient = require('../../../../client/authrizate-client');
const getClientSecret = require('../../../../client/get-client-secret');

async function validateGenerateTokenGrantTypeCode(request, options) {
  const { client } = options;

  const secret = getClientSecret(request);

  const currentClient = await client.dao.findById(request.client_id);
  if (!currentClient) throw UnauthorizedClient.create();

  await authorizeClient(currentClient, secret);

  const code = decodingToken(request.code, options.token.secret);

  // eslint-disable-next-line max-len
  if (code.client_id !== request.client_id) throw UnauthorizedClient.create();
  if (code.sub !== subjectType.AUTHORIZATION_CODE) throw UnauthorizedClient.create();

  validateRedirectUri(currentClient.redirect_uri, request.redirect_uri);
}

module.exports = validateGenerateTokenGrantTypeCode;
