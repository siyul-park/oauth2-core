const createdError = new Map();

function get(Error) {
  if (createdError.has(Error)) return createdError.get(Error);

  createdError.set(Error, Object.freeze(new Error()));
  return createdError.get(Error);
}

module.exports = { get };
