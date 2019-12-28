const ServerError = require('../error/server-error');
const errorPool = require('../error/pool');

const scopes = new Map();

function get(key) {
  if (!scopes.has(key)) throw errorPool.get(ServerError);

  return scopes.get(key);
}

function set(key, scope) {
  if (scopes.has(key)) scopes.delete(key);

  return scopes.set(key, scope);
}

module.exports = { get, set };
