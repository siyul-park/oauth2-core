const validateRequired = require('../../../validation/validate-required');

const validateBodyGrantTypeCode = require('./validate-body-grant-type-code');
const validateBodyGrantTypePassword = require('./validate-body-grant-type-password');

const grantType = require('../../../token/grant-type');

const { UnsupportedGrantType } = require('../../../error/errors');

function validateBody(params) {
  validateRequired(params.grant_type);

  // eslint-disable-next-line max-len
  if (params.grant_type === grantType.AUTHORIZATION_CODE) return validateBodyGrantTypeCode(params);
  if (params.grant_type === grantType.PASSWORD) return validateBodyGrantTypePassword(params);

  throw UnsupportedGrantType.create();
}

module.exports = validateBody;
