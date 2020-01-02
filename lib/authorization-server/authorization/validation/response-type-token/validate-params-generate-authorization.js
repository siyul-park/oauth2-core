const validateRequired = require('../../../../validation/validate-required');

function validateParamsGenerateAuthorization(params) {
  validateRequired(params.client_id);
}

module.exports = validateParamsGenerateAuthorization;
