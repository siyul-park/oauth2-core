const algorithms = require('../../algorithm');

const Client = require('../client');
const ClientType = require('../client-type');

const dataAccessorPool = require('../../data-accessor/pool');
const DataAccessorType = require('../../data-accessor/type');

function generatePublicClient(request) {
  const generateIdentifier = algorithms.get('generateClientIdentifier');

  const dataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);

  const client = new Client(
    generateIdentifier(), null, ClientType.PUBLIC,
    request.name, request.description, request.redirectUri,
  );

  return dataAccessor.save(client);
}

module.exports = generatePublicClient;
