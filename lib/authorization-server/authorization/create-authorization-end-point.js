const authorization = require('./authorization-end-point/authorization');
const createValidation = require('./validation/create-validation');

const requestMethod = require('../../http/request/request-method');

const createEndPoint = require('../../http/end-point/create-end-point');
const joinEndPoints = require('../../http/end-point/join-end-points');

function createAuthorizationEndPoint(options) {
  // eslint-disable-next-line no-unused-vars
  function endPointAdapter(request, _options) {
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
