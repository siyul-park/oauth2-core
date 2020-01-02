const validateRequired = require('../../../validation/validate-required');
const validateParamsGenerateAuthorizationResponseTypeCode = require('./response-type-code/validate-params-generate-authorization');
const validateParamsGenerateAuthorizationResponseTypeToken = require('./response-type-token/validate-params-generate-authorization');

const responseType = require('../../../http/response/authorization-response-type');
const { UnsupportedResponseType } = require('../../../error/errors');

function validateParamsGenerateAuthorization(params) {
  validateRequired(params.response_type);

  // eslint-disable-next-line max-len
  if (params.response_type === responseType.CODE) return validateParamsGenerateAuthorizationResponseTypeCode(params);
  // eslint-disable-next-line max-len
  if (params.response_type === responseType.TOKEN) return validateParamsGenerateAuthorizationResponseTypeToken(params);

  throw UnsupportedResponseType.create();
}

module.exports = validateParamsGenerateAuthorization;
