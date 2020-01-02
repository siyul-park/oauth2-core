const authorizationResponseType = require('../../../http/response/response-type');

const generateAuthorizationCode = require('./generate-authorization-response-type-code');
const generateAuthorizationToken = require('./generate-athorization-response-type-token');

const { UnsupportedResponseType } = require('../../../error/errors');

function generateAuthorization(request, options) {
  if (request.response_type === authorizationResponseType.CODE) {
    return generateAuthorizationCode(request, options);
  } if (request.response_type === authorizationResponseType.TOKEN) {
    return generateAuthorizationToken(request, options);
  }

  throw UnsupportedResponseType.create();
}

module.exports = generateAuthorization;
