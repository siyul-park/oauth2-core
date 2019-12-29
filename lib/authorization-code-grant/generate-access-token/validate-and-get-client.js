const AccessTokenGrantType = require('../../type/access-token-grant-type');

const {
  InvalidRequestError, UnsupportedTypeError, UnauthorizedClientError,
} = require('../../error');

const errorPool = require('../../error/pool');

const TokenSubjectType = require('../../token/token-subject-type');

const dataAccessorPool = require('../../data-accessor/pool');
const DataAccessorType = require('../../data-accessor/type');

const ScopeType = require('../../scope/type');
const scopePool = require('../../scope/pool');

const validateType = require('../../validate/validate-type');
const validateRequired = require('../../validate/validate-required');

const getValidatedToken = require('../../token/get-validated-token');

async function validateAndGetClient(request) {
  // eslint-disable-next-line max-len
  validateType(request.grantType, AccessTokenGrantType.AUTHORIZATION_CODE, errorPool.get(UnsupportedTypeError));

  validateRequired(request.code, errorPool.get(InvalidRequestError));

  getValidatedToken(request.code, {
    sub: TokenSubjectType.AUTHORIZATION_CODE,
    clientId: request.clientId,
    scope: scopePool.get(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_ACCESS_TOKEN_REQUIRE),
  });

  const clientDataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);
  const client = await clientDataAccessor.findById(request.clientId);

  if (!client) throw errorPool.get(UnauthorizedClientError);

  return client;
}

module.exports = validateAndGetClient;
