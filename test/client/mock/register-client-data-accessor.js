const MockClientDataAccessor = require('./client-data-accessor');
const dataAccessorPool = require('../../../lib/data-accessor/pool');
const DataAccessorType = require('../../../lib/data-accessor/type');

function register() {
  dataAccessorPool.register(DataAccessorType.CLIENT, new MockClientDataAccessor());
}

module.exports = register;
