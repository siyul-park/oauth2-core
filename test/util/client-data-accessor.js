const ClientDataAccessor = require('../../lib/client/client-data-accessor');
const generateId = require('../../lib/token/generate-Id');

const clients = new Map();

class MockClientDataAccessor extends ClientDataAccessor {
  // eslint-disable-next-line class-methods-use-this
  async findById(id) {
    return clients.get(id);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(client) {
    // eslint-disable-next-line no-param-reassign
    if (!client.id) client.id = generateId();

    clients.set(client.id, client);

    return client;
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteById(id) {
    clients.delete(id);
  }
}

module.exports = MockClientDataAccessor;
