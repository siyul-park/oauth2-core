const { InvalidRequest } = require('../error/errors');
const isExist = require('./is-exist');

function validateRequired(value) {
  if (!isExist(value)) InvalidRequest.create();
}

module.exports = validateRequired;
