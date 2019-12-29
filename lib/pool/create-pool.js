const ServerError = require('../error/server-error');
const errorPool = require('../error/pool');

function createPool() {
  const pool = new Map();

  function set(key, value) {
    if (pool.has(key)) pool.delete(key);

    pool.set(key, value);
  }

  function get(key) {
    if (!pool.has(key)) throw errorPool.get(ServerError);

    return pool.get(key);
  }

  return { set, get };
}

module.exports = createPool;
