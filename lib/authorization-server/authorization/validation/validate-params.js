const validateRequired = require('../../../validation/validate-required');

function validateParams(params) {
  validateRequired(params.response_type);
  validateRequired(params.client_id);
}

module.exports = validateParams;
