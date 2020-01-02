const validateRequired = require('../../../../validation/validate-required');

function validateHeaders(params) {
  validateRequired(params.Authorization);
}

module.exports = validateHeaders;
