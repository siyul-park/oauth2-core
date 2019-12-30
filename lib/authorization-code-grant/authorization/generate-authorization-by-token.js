const generateAuthorization = require('./generate-authorization');

const getValidatedToken = require('../../token/get-validated-token');
const TokenSubjectType = require('../../token/token-subject-type');

function generateAuthorizationByToken(token) {
  const { request } = getValidatedToken(
    token, { sub: TokenSubjectType.AUTHORIZATION_REQUEST_TOKEN },
  );

  return generateAuthorization(request);
}

module.exports = generateAuthorizationByToken;
