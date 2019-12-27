const responseType = require('./response-type');

function isResponseType(valueToCheck) {
  return !Object.values(responseType)
    .every((type) => type !== valueToCheck);
}

module.exports = isResponseType;
