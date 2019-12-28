const ClientDataAccessor = require('../../../lib/data-accessor/client-data-accessor');

let clients = [];

class MockClientDataAccessor extends ClientDataAccessor {
  // eslint-disable-next-line class-methods-use-this
  async save(client) {
    clients.push(client);

    return client;
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  async findByIdentifier(identifier) {
    return clients.find((registerClient) => registerClient.identifier === identifier);
  }

  // eslint-disable-next-line class-methods-use-this
  clear() {
    clients = [];
  }
}

module.exports = MockClientDataAccessor;
