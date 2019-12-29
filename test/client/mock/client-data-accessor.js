const ClientDataAccessor = require('../../../lib/data-accessor/client-data-accessor');

let clients = [];

class MockClientDataAccessor extends ClientDataAccessor {
  // eslint-disable-next-line class-methods-use-this
  async save(client) {
    clients.push(client);

    return client;
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  async findById(id) {
    return clients.find((registerClient) => registerClient.id === id);
  }

  // eslint-disable-next-line class-methods-use-this
  clear() {
    clients = [];
  }
}

module.exports = MockClientDataAccessor;
