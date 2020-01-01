const validateRequired = require('../../../validation/validate-required');

function validateParams(params) {
  validateRequired(params.grant_type);
  validateRequired(params.code);
  validateRequired(params.redirect_uri);
  validateRequired(params.client_id);
}

module.exports = validateParams;
