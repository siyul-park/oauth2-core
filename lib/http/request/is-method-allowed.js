const requestMethod = require('./request-method-set');

function isMethodAllowed(method, expect) {
  if (typeof expect.every === 'function') return !expect.every((httpMethod) => method !== httpMethod) && requestMethod.has(method);
  return method === expect && requestMethod.has(method);
}

module.exports = isMethodAllowed;
