const generateAuthorization = require('./generate-authorization');

const getValidatedToken = require('../../token/get-validated-token');
const TokenSubjectType = require('../../token/token-subject-type');

const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

function generateAuthorizationByToken(token) {
  const { request } = getValidatedToken(token, {
    sub: TokenSubjectType.AUTHORIZATION_REQUEST_TOKEN,
    // eslint-disable-next-line max-len
    scope: scopePool.get(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_AUTHORIZATION_BY_TOKEN_REQUIRE),
  });

  return generateAuthorization(request);
}

module.exports = generateAuthorizationByToken;
