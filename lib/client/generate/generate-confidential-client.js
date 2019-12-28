const generateIdentifier = require('./generate-identifier');
const generateSecret = require('./generate-secret');

const Client = require('../client');
const ClientType = require('../client-type');

const dataAccessorPool = require('../../data-accessor/pool');
const DataAccessorType = require('../../data-accessor/type');

function generateConfidentialClient() {
  const dataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);

  const client = new Client(generateIdentifier(), generateSecret(), ClientType.CONFIDENTIAL);

  return dataAccessor.save(client);
}

module.exports = generateConfidentialClient;
