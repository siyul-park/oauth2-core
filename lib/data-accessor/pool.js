const ServerError = require('../error/server-error');
const errorPool = require('../error/pool');

const pool = new Map();

function register(key, dataAccessor) {
  if (pool.has(key)) pool.delete(key);

  pool.set(key, dataAccessor);
}

function get(key) {
  if (!pool.has(key)) throw errorPool.get(ServerError);

  return pool.get(key);
}

module.exports = { register, get };
