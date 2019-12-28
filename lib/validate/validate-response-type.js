const isResponseType = require('./is-response-type');

function validateResponseType(type, expectType, error) {
  if (!isResponseType(type, expectType)) throw error;
}

module.exports = validateResponseType;
