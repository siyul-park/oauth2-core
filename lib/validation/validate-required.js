function validateRequired(value, createError) {
  if (value === undefined || value === null) throw createError();
}

module.exports = validateRequired;
