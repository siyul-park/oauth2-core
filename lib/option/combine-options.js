function combineOptions(defaultOptions = {}, options = {}) {
  if (typeof defaultOptions !== 'object') return options;
  if (options === undefined || options === null) return defaultOptions;
  if (typeof options !== 'object') return options;

  const combinedOptions = {};
  // eslint-disable-next-line no-restricted-syntax
  for (const [property, value] of Object.entries(defaultOptions)) {
    if (options[property] === undefined) combinedOptions[property] = value;
    else combinedOptions[property] = { ...value, ...options[property] };
  }

  return combinedOptions;
}

module.exports = combineOptions;
