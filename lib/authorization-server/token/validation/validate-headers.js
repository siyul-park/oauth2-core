const validateRequired = require('../../../validation/validate-required');

const validateHeadersGrantTypeCode = require('./validate-headers-grant-type-code');
const validateHeadersGrantTypePassword = require('./validate-headers-grant-type-password');

const grantType = require('../../../token/grant-type');

const { UnsupportedGrantType } = require('../../../error/errors');

function validateHeaders(params, request) {
  validateRequired(request.body.grant_type);

  // eslint-disable-next-line max-len
  if (request.body.grant_type === grantType.AUTHORIZATION_CODE) return validateHeadersGrantTypeCode(params);
  // eslint-disable-next-line max-len
  if (request.body.grant_type === grantType.PASSWORD) return validateHeadersGrantTypePassword(params);

  throw UnsupportedGrantType.create();
}

module.exports = validateHeaders;
