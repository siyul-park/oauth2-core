function validateRequired(value, Error) {
  if (value === undefined) throw Error;
}

module.exports = validateRequired;
