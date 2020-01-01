const validateRequired = require('../../../validation/validate-required');
const { InvalidRequest } = require('../../../error/errors');

function validateParams(params) {
  validateRequired(params.response_type, InvalidRequest.create);
  validateRequired(params.client_id, InvalidRequest.create);
}

module.exports = validateParams;
