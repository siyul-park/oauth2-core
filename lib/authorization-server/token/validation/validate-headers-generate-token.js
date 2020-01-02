const validateRequired = require('../../../validation/validate-required');

const validateHeadersGrantTypeCode = require('./grant-type-code/validate-headers-generate-token');
const validateHeadersGrantTypePassword = require('./grant-type-password/validate-headers-generate-token');
const validateHeadersGrantTypeClientCredentials = require('./grant-type-client-credentials/validate-headers-generate-token');

const grantType = require('../../../token/grant-type');

const { UnsupportedGrantType } = require('../../../error/errors');

function validateHeadersGenerateToken(params, request) {
  validateRequired(request.body.grant_type);

  // eslint-disable-next-line max-len
  if (request.body.grant_type === grantType.AUTHORIZATION_CODE) return validateHeadersGrantTypeCode(params);
  // eslint-disable-next-line max-len
  if (request.body.grant_type === grantType.PASSWORD) return validateHeadersGrantTypePassword(params);
  // eslint-disable-next-line max-len
  if (request.body.grant_type === grantType.CLIENT_CREDENTIALS) return validateHeadersGrantTypeClientCredentials(params);

  throw UnsupportedGrantType.create();
}

module.exports = validateHeadersGenerateToken;
