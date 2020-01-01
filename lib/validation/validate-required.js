const { InvalidRequest } = require('../error/errors');

function validateRequired(value) {
  if (value === undefined || value === null) InvalidRequest.create();
}

module.exports = validateRequired;
