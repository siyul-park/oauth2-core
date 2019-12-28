const responseType = require('../request/response-type');

function isResponseType(typeToCheck, expectType) {
  const inResponseType = !Object.values(responseType)
    .every((type) => type !== typeToCheck);

  if (!expectType) return inResponseType;

  const isSame = typeToCheck === expectType;

  return inResponseType && isSame;
}

module.exports = isResponseType;
