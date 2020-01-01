function validateRequired(value, error) {
  if (value === undefined || value === null) throw error;
}

module.exports = validateRequired;
