const validateRequired = require('../../../../validation/validate-required');

function validateBody(params) {
  validateRequired(params.code);
  validateRequired(params.redirect_uri);
  validateRequired(params.client_id);
}

module.exports = validateBody;
