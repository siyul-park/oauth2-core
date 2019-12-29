const AuthorizationType = require('../../type/authorization-type');

const {
  InvalidRequestError, UnsupportedTypeError, InvalidScopeError, UnauthorizedClientError,
} = require('../../error');

const errorPool = require('../../error/pool');

const dataAccessorPool = require('../../data-accessor/pool');
const DataAccessorType = require('../../data-accessor/type');

const ScopeType = require('../../scope/type');
const scopePool = require('../../scope/pool');

const validateType = require('../../validate/validate-type');
const validateRequired = require('../../validate/validate-required');
const validateScope = require('../../validate/validate-scope');

async function validate(request) {
  // eslint-disable-next-line max-len
  validateType(request.responseType, AuthorizationType.CODE, errorPool.get(UnsupportedTypeError));

  validateRequired(request.clientId, errorPool.get(InvalidRequestError));

  validateRequired(request.scope, errorPool.get(InvalidRequestError));
  // eslint-disable-next-line max-len
  validateScope(scopePool.get(ScopeType.AUTHORIZATION_CODE_GRAND.AUTHORIZATION_RESPONSE), request.scope, errorPool.get(InvalidScopeError));

  const clientDataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);
  const client = await clientDataAccessor.findById(request.clientId);

  if (!client) throw errorPool.get(UnauthorizedClientError);

  return client;
}

module.exports = validate;
