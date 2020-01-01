const validateRequired = require('../../../validation/validate-required');

const validateParamsGrantTypeCode = require('./validate-params-grant-type-code');
const grantType = require('../../../token/grant-type');

const { UnsupportedGrantType } = require('../../../error/errors');

function validateParams(params) {
  validateRequired(params.grant_type);

  if (params.grant_type === grantType.AUTHORIZATION_CODE) validateParamsGrantTypeCode(params);

  throw UnsupportedGrantType.create();
}

module.exports = validateParams;
