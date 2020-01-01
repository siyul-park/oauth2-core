const token = require('./token-end-point/generate-token');
const validation = require('./validation');

const requestMethod = require('../../http/request/request-method');

const createEndPoint = require('../../http/end-point/create-end-point');

function createTokenEndPoint(options) {
  // eslint-disable-next-line no-unused-vars
  function endPointAdapter(request, _options) {
    return token(request, options);
  }

  return createEndPoint(
    requestMethod.POST, 201,
    endPointAdapter, validation,
  );
}

module.exports = createTokenEndPoint;
