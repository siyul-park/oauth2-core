const isResponseType = require('./is-response-type');

function validateResponseType(type, expectType, Error) {
  if (isResponseType(type, expectType)) throw Error;
}

module.exports = validateResponseType;
