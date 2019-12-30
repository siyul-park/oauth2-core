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

  function add(key, value) {
    if (!pool.has(key)) return set(key, value);

    const origin = get(key);
    if (typeof origin.push === 'function') {
      origin.push(value);

      return origin;
    } if (typeof origin.add === 'function') {
      origin.add(value);

      return origin;
    } if (typeof origin === 'object') {
      return set(key, { ...origin, value });
    }

    throw errorPool.get(ServerError);
  }

  return { set, get, add };
}

module.exports = createPool;
