const authorization = require('./authorization-end-point/generate-authorization');
const createValidation = require('./validation/create-validation');

const requestMethod = require('../../http/request/request-method');

const createEndPoint = require('../../http/end-point/create-end-point');
const joinEndPoints = require('../../http/end-point/join-end-points');

function createAuthorizationEndPoint(options) {
  function endPointAdapter(request) {
    return authorization(request, options);
  }

  const authorizationWithGetMethod = createEndPoint(
    requestMethod.GET, 200,
    endPointAdapter, createValidation(requestMethod.GET),
  );

  const authorizationWithPostMethod = createEndPoint(
    requestMethod.POST, 201,
    endPointAdapter, createValidation(requestMethod.POST),
  );

  return joinEndPoints([authorizationWithGetMethod, authorizationWithPostMethod]);
}

module.exports = createAuthorizationEndPoint;
