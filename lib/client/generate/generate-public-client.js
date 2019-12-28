const generateIdentifier = require('./generate-identifier');

const Client = require('../client');
const ClientType = require('../client-type');

const dataAccessorPool = require('../../data-accessor/pool');
const DataAccessorType = require('../../data-accessor/type');

function generatePublicClient() {
  const dataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);

  const client = new Client(generateIdentifier(), null, ClientType.PUBLIC);

  return dataAccessor.save(client);
}

module.exports = generatePublicClient;
