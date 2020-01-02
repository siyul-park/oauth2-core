const { UnauthorizedClient } = require('../../../../error/errors');

const subjectType = require('../../../../token/subject-type');
const tokenType = require('../../../../token/token-type');
const decodingAuthorization = require('../../../../token/decoding-authorization');
const decodingToken = require('../../../../token/decoding-token');

const validateRedirectUri = require('../../../../http/redirect-uri/validate-redirect-uri');
const authorizeClient = require('../../../../client/authrizate-client');

async function validateGenerateTokenGrantTypeCode(request, options) {
  const { client } = options;

  const {
    id: clientId,
    secret: clientSecret,
  } = decodingAuthorization(request.Authorization, tokenType.BASIC);

  const currentClient = await client.dao.findById(request.client_id);
  if (!currentClient) throw UnauthorizedClient.create();

  await authorizeClient(currentClient, request.client_secret);
  await authorizeClient(currentClient, clientSecret);

  const code = decodingToken(request.code, options.token.secret);

  // eslint-disable-next-line max-len
  if (code.client_id !== request.client_id || code.client_id !== clientId) throw UnauthorizedClient.create();
  if (code.sub !== subjectType.AUTHORIZATION_CODE) throw UnauthorizedClient.create();

  validateRedirectUri(currentClient.redirect_uri, request.redirect_uri);
}

module.exports = validateGenerateTokenGrantTypeCode;
