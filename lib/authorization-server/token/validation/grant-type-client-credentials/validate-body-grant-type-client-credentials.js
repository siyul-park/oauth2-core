const validateRequired = require('../../../../validation/validate-required');

function validateBody(params) {
  validateRequired(params.scope);
}

module.exports = validateBody;
