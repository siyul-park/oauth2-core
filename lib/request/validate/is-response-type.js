const responseType = require('../response-type');

function isResponseType(typeToCheck, expectType) {
  const isResponseType = !Object.values(responseType)
    .every((type) => type !== typeToCheck);

  if (!expectType) return isResponseType;

  return isResponseType && typeToCheck === expectType;
}

module.exports = isResponseType;
