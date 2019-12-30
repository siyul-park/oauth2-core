const AuthorizationType = require('../../type/authorization-type');

const {
  UnsupportedTypeError,
  InvalidRequestError, InvalidScopeError, UnauthorizedClientError, InvalidRedirectUriError,
} = require('../../error');

const errorPool = require('../../error/pool');

const dataAccessorPool = require('../../data-accessor/pool');
const DataAccessorType = require('../../data-accessor/type');

const ScopeType = require('../../scope/type');
const scopePool = require('../../scope/pool');

const validateType = require('../../validate/validate-type');
const validateRequired = require('../../validate/validate-required');
const validateScope = require('../../validate/validate-scope');
const validateRedirectUri = require('../../validate/validate-redirect-uri');

async function validateAndGetClient(request) {
  // eslint-disable-next-line max-len
  validateType(request.responseType, AuthorizationType.AUTHORIZATION_CODE, errorPool.get(UnsupportedTypeError));

  validateRequired(request.clientId, errorPool.get(InvalidRequestError));

  validateRequired(request.scope, errorPool.get(InvalidRequestError));
  // eslint-disable-next-line max-len
  validateScope(scopePool.get(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_AUTHORIZATION_CAN_RESPONSE), request.scope, errorPool.get(InvalidScopeError));

  const clientDataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);
  const client = await clientDataAccessor.findById(request.clientId);

  if (!client) throw errorPool.get(UnauthorizedClientError);

  // eslint-disable-next-line max-len
  validateRedirectUri(client.redirectUri, request.redirectUri, errorPool.get(InvalidRedirectUriError));
}

module.exports = validateAndGetClient;
