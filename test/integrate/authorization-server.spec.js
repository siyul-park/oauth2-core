/* eslint-disable no-undef */
const createServer = require('./create-server');

const ClientDataAccessor = require('../mock/client-data-accessor');

describe('Authorization Server', () => {
  test('Create Authorization Server', async () => {
    const clientDataAccessor = new ClientDataAccessor();

    createServer(clientDataAccessor);
  });
});

/* eslint-enable no-undef */
