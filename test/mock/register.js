const MockClientDataAccessor = require('./client-data-accessor');
const MockActiveTokenDataAccessor = require('./active-token-data-accessor');

const ActiveTokenManager = require('../../lib/token/active-token/manager');

const dataAccessorPool = require('../../lib/data-accessor/pool');
const DataAccessorType = require('../../lib/data-accessor/type');

const activeTokenPool = require('../../lib/token/active-token/pool');
const ActiveTokenType = require('../../lib/token/active-token/type');

function register() {
  dataAccessorPool.set(DataAccessorType.CLIENT, new MockClientDataAccessor());
  // eslint-disable-next-line max-len
  activeTokenPool.set(ActiveTokenType.AUTHORIZATION_CODE, new ActiveTokenManager(new MockActiveTokenDataAccessor()));
  // eslint-disable-next-line max-len
  activeTokenPool.set(ActiveTokenType.AUTHORIZATION_REQUEST_TOKEN, new ActiveTokenManager(new MockActiveTokenDataAccessor()));
}

module.exports = register;
