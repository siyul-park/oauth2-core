const AuthorizationRequest = require('../../request/authorization-request');

const responseType = require('../../request/type');

const InvalidRequestError = require('../../error/invalid-request');
const UnauthorizedClient = require('../../error/unauthorized-client');

const errorPool = require('../../error/pool');

const ClientType = require('../../client/client-type');

const dataAccessorPool = require('../../data-accessor/pool');
const DataAccessorType = require('../../data-accessor/type');

const ScopeType = require('../../scope/type');

const validateResponseType = require('../../validate/validate-response-type');
const validateRequired = require('../../validate/validate-required');
const validateScope = require('../../validate/validate-scope');

async function validate(request) {
  if (!(request instanceof AuthorizationRequest)) throw errorPool.get(InvalidRequestError);

  validateRequired(request.responseType, errorPool.get(InvalidRequestError));
  validateResponseType(request.responseType, responseType.CODE, errorPool.get(InvalidRequestError));

  validateRequired(request.clientId, errorPool.get(InvalidRequestError));

  validateRequired(request.scope, errorPool.get(InvalidRequestError));
  validateScope(ScopeType.AUTHORIZATION_CODE_GRAND, request.scope);

  const clientDataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);
  const client = await clientDataAccessor.findByIdentifier(request.clientId);
  if (!client || client.type !== ClientType.PUBLIC) throw errorPool.get(UnauthorizedClient);
}

module.exports = validate;
