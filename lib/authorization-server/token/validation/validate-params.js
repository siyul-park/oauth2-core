const validateRequired = require('../../../validation/validate-required');

const validateParamsGrantTypeCode = require('./validate-params-grant-type-code');
const grantType = require('../../../token/grant-type');

const { UnsupportedGrantType } = require('../../../error/errors');

function validateParams(params) {
  validateRequired(params.grant_type);

  // eslint-disable-next-line max-len
  if (params.grant_type === grantType.AUTHORIZATION_CODE) return validateParamsGrantTypeCode(params);

  throw UnsupportedGrantType.create();
}

module.exports = validateParams;
