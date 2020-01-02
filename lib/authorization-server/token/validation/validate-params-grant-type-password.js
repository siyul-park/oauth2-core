const validateRequired = require('../../../validation/validate-required');

function validateParams(params) {
  validateRequired(params.username);
  validateRequired(params.password);
  validateRequired(params.scope);
}

module.exports = validateParams;
