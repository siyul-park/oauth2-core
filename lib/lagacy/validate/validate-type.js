function validateType(type, expectType, error) {
  if (type !== expectType) throw error;
}

module.exports = validateType;
