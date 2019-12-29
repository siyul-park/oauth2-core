const algorithms = require('../../algorithm');

const Client = require('../client');
const ClientType = require('../client-type');

const dataAccessorPool = require('../../data-accessor/pool');
const DataAccessorType = require('../../data-accessor/type');

function generateConfidentialClient() {
  const generateIdentifier = algorithms.get('generateClientIdentifier');
  const generateSecret = algorithms.get('generateClientSecret');

  const dataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);

  const client = new Client(generateIdentifier(), generateSecret(), ClientType.CONFIDENTIAL);

  return dataAccessor.save(client);
}

module.exports = generateConfidentialClient;
