const validateRequired = require('../../../validation/validate-required');

const validateParamsGrantTypeCode = require('./validate-params-grant-type-code');
const grantType = require('../../../token/grant-type');

function validateParams(params) {
  validateRequired(params.grant_type);

  if (params.grant_type === grantType.AUTHORIZATION_CODE) validateParamsGrantTypeCode(params);
}

module.exports = validateParams;
