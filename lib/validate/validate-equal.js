function validateEqual(value, expectValue, error) {
  if (value === expectValue) throw error;
}

module.exports = validateEqual;
