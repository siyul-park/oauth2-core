const validateRequired = require('../../../validation/validate-required');

const validateBodyGrantTypeCode = require('./grant-type-code/validate-body-generate-token');
const validateBodyGrantTypePassword = require('./grant-type-password/validate-body-generate-token');
const validateBodyGrantTypeClientCredentials = require('./grant-type-client-credentials/validate-body-generate-token');

const grantType = require('../../../token/grant-type');

const { UnsupportedGrantType } = require('../../../error/errors');

function validateBodyGenerateToken(params) {
  validateRequired(params.grant_type);

  // eslint-disable-next-line max-len
  if (params.grant_type === grantType.AUTHORIZATION_CODE) return validateBodyGrantTypeCode(params);
  if (params.grant_type === grantType.PASSWORD) return validateBodyGrantTypePassword(params);
  // eslint-disable-next-line max-len
  if (params.grant_type === grantType.CLIENT_CREDENTIALS) return validateBodyGrantTypeClientCredentials(params);

  throw UnsupportedGrantType.create();
}

module.exports = validateBodyGenerateToken;
