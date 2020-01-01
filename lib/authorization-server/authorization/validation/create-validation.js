const requestMethod = require('../../../http/request/request-method');
const validateParams = require('./validate-params');
const { ServerError } = require('../../../error/errors');

function createValidation(method) {
  if (method === requestMethod.POST) {
    return {
      body: validateParams,
    };
  } if (method === requestMethod.GET) {
    return {
      query: validateParams,
    };
  }

  throw ServerError.create();
}

module.exports = createValidation;
