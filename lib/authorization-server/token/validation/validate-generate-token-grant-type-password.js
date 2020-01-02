const { UnauthorizedClient, Error } = require('../../../error/errors');

const decodingToken = require('../../../token/decoding-token');
const subjectType = require('../../../token/subject-type');

const validateRedirectUri = require('../../../http/redirect-uri/validate-redirect-uri');

async function validateGenerateTokenGrantTypePassword(request, options) {
  const { client } = options;

  const currentClient = await client.dao.findById(request.client_id);
  if (!currentClient) throw UnauthorizedClient.create();

  try {
    if (typeof currentClient.authenticate === 'function') await currentClient.authenticate(request);
  } catch (e) {
    if (e instanceof Error) throw e;
    throw UnauthorizedClient.create();
  }

  const code = decodingToken(request.code, options.token.secret);

  if (code.client_id !== request.client_id) throw UnauthorizedClient.create();
  if (code.sub !== subjectType.AUTHORIZATION_CODE) throw UnauthorizedClient.create();

  validateRedirectUri(currentClient.redirect_uri, request.redirect_uri);
}

module.exports = validateGenerateTokenGrantTypePassword;
