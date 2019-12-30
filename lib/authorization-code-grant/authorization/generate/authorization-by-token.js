const generateAuthorization = require('./authorization');

const decodingAndUseToken = require('../../../token/decoding-and-use-token');
const TokenSubjectType = require('../../../token/subject-type');

const scopePool = require('../../../scope/pool');
const ScopeType = require('../../../scope/type');

async function generateAuthorizationByToken(token) {
  const { request } = await decodingAndUseToken(token, {
    sub: TokenSubjectType.AUTHORIZATION_REQUEST_TOKEN,
    // eslint-disable-next-line max-len
    scope: scopePool.get(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_AUTHORIZATION.REQUIRE),
  });

  return generateAuthorization(request);
}

module.exports = generateAuthorizationByToken;
