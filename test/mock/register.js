const MockClientDataAccessor = require('./client-data-accessor');
const MockActiveTokenDataAccessor = require('./active-token-data-accessor');

const dataAccessorPool = require('../../lib/data-accessor/pool');
const DataAccessorType = require('../../lib/data-accessor/type');

function register() {
  dataAccessorPool.set(DataAccessorType.CLIENT, new MockClientDataAccessor());
  dataAccessorPool.set(DataAccessorType.ACTIVE_TOKEN, new MockActiveTokenDataAccessor());
}

module.exports = register;
