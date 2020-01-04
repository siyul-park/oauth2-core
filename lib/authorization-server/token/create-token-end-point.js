const token = require('./token-end-point/generate-token');
const validation = require('./validation');

const requestMethod = require('../../http/request/request-method');

const createEndPoint = require('../../http/end-point/create-end-point');

function createTokenEndPoint(options) {
  function endPointAdapter(request) {
    return token(request, options);
  }

  return createEndPoint(
    requestMethod.POST, 201,
    endPointAdapter, validation,
    { redirect: false },
  );
}

module.exports = createTokenEndPoint;
