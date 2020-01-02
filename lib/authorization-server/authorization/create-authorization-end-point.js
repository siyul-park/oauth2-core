const authorization = require('./authorization-end-point/generate-authorization');
const createValidation = require('./validation/create-validation');

const requestMethod = require('../../http/request/request-method');
const responseType = require('../../http/response/response-type');

const createEndPoint = require('../../http/end-point/create-end-point');
const joinEndPoints = require('../../http/end-point/join-end-points');

const { MethodNotAllow } = require('../../error/errors');

function createAuthorizationEndPoint(options) {
  // eslint-disable-next-line no-unused-vars
  function endPointAdapter(request) {
    if (this.method === requestMethod.POST && request.response_type === responseType.TOKEN) {
      throw MethodNotAllow.create();
    }

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
