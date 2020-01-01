const authorizationResponseType = require('../../../http/response/authorization-response-type');

const responseCodeAuthorization = require('./athorization-response-code');
const responseTokenAuthorization = require('./athorization-response-code');

const { UnsupportedResponseType } = require('../../../error/errors');

function authorization(request, options) {
  if (request.response_type === authorizationResponseType.CODE) {
    return responseCodeAuthorization(request, options);
  } if (request.response_type === authorizationResponseType.TOKEN) {
    return responseTokenAuthorization(request, options);
  }

  throw UnsupportedResponseType.create();
}

module.exports = authorization;
