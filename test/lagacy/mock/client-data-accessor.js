const ClientDataAccessor = require('../../../lib/lagacy/data-accessor/client-data-accessor');

const clients = new Map();

class MockClientDataAccessor extends ClientDataAccessor {
  // eslint-disable-next-line class-methods-use-this
  async save(client) {
    clients.set(client.id, client);

    return client;
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  async findById(id) {
    return clients.get(id);
  }

  // eslint-disable-next-line class-methods-use-this
  clear() {
    clients.clear();
  }
}

module.exports = MockClientDataAccessor;
