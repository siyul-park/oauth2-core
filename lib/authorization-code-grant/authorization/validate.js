const AuthorizationRequest = require('../../request/authorization-request');

const responseType = require('../../request/response-type');

const InvalidRequestError = require('../../error/invalid-request');
const UnauthorizedClient = require('../../error/unauthorized-client');

const ClientType = require('../../client/client-type');

const dataAccessorPool = require('../../data-access/pool');
const DataAccessorType = require('../../data-access/type');

const errorPool = require('../../error/pool');

const validateResponseType = require('../../validate/validate-response-type');
const validateRequired = require('../../validate/validate-required');

async function validate(request) {
  if (!(request instanceof AuthorizationRequest)) throw errorPool.get(InvalidRequestError);

  validateRequired(request.responseType, errorPool.get(InvalidRequestError));
  validateResponseType(request.responseType, responseType.CODE, errorPool.get(InvalidRequestError));

  validateRequired(request.clientId, errorPool.get(InvalidRequestError));

  const clientDataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);
  const client = await clientDataAccessor.findByIdentifier(request.clientId);

  if (client.type !== ClientType.PUBLIC) throw errorPool.get(UnauthorizedClient);
}

module.exports = validate;
