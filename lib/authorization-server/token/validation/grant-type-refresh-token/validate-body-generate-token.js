const validateRequired = require('../../../../validation/validate-required');

function validateBody(params) {
  validateRequired(params.refresh_token);
  validateRequired(params.scope);
}

module.exports = validateBody;
