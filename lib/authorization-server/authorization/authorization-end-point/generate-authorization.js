const authorizationResponseType = require('../../../http/response/authorization-response-type');

const generateAuthorizationCode = require('./generate-athorization-code');
const generateAuthorizationToken = require('./generate-athorization-token');

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
