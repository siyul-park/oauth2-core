function createErrorFunction(Error) {
  return (options) => new Error(options);
}

module.exports = createErrorFunction;
