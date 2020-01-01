function combineOptions(defaultOptions = {}, options = {}) {
  if (typeof defaultOptions !== 'object') return options;
  if (options === undefined || options === null) return defaultOptions;
  if (typeof options !== 'object') return options;

  const combinedOptions = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [property, value] of Object.entries(defaultOptions)) {
    const newValue = options[property];

    if (typeof newValue === 'object' && typeof value === 'object') combinedOptions[property] = { ...value, ...newValue };
    else if (typeof newValue === 'object') combinedOptions[property] = { value, ...newValue };
    else if (typeof value === 'object') combinedOptions[property] = { ...value, newValue };
    else combinedOptions[property] = newValue;
  }

  return combinedOptions;
}

module.exports = combineOptions;
