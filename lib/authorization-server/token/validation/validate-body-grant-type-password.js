const validateRequired = require('../../../validation/validate-required');

function validateBody(params) {
  validateRequired(params.username);
  validateRequired(params.password);
  validateRequired(params.scope);
}

module.exports = validateBody;
