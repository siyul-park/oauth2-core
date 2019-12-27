const AuthorizationRequest = require('../../request/authorization-request');

const responseType = require('../../request/response-type');

const InvalidRequestError = require('../../error/invalid-request');
const errorPool = require('../../error/pool');

const validateResponseType = require('../../validate/validate-response-type');
const validateRequired = require('../../validate/validate-required');

function validate(request) {
  if (!(request instanceof AuthorizationRequest)) throw errorPool.get(InvalidRequestError);

  validateRequired(request.responseType, errorPool.get(InvalidRequestError));
  validateResponseType(request.responseType, responseType.code, errorPool.get(InvalidRequestError));

  validateRequired(request.clientId, errorPool.get(InvalidRequestError));
}

module.exports = validate;
