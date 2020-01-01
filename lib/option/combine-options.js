function combineOptions(defaultOptions, options) {
  if (options === undefined) return defaultOptions;
  if (typeof defaultOptions !== 'object') return options;
  if (typeof options !== 'object') return options;

  const combinedOptions = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [property, value] of Object.entries(defaultOptions)) {
    combinedOptions[property] = combineOptions(value, options[property]);
  }

  return combinedOptions;
}

module.exports = combineOptions;
