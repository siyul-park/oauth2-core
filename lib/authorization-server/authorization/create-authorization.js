const authorization = require('./authorization/authorization');
const createValidation = require('./validation/create-validation');

const requestMethod = require('../../http/request/request-method');

const createEndPoint = require('../../http/end-point/create-end-point');
const joinEndPoints = require('../../http/end-point/join-end-points');

function createAuthorization(options) {
  // eslint-disable-next-line no-unused-vars
  function authorizationWrap(request, _options) {
    return authorization(request, options);
  }

  const authorizationWithGetMethod = createEndPoint(
    requestMethod.GET, 200,
    authorizationWrap, createValidation(requestMethod.GET),
  );

  const authorizationWithPostMethod = createEndPoint(
    requestMethod.POST, 201,
    authorizationWrap, createValidation(requestMethod.POST),
  );

  return joinEndPoints([authorizationWithGetMethod, authorizationWithPostMethod]);
}

module.exports = createAuthorization;
