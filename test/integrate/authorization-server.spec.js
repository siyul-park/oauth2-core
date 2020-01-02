/* eslint-disable no-undef */
const createServer = require('./create-server');

const ClientDataAccessor = require('../mock/client-data-accessor');
const UserDataAccessor = require('../mock/user-data-accessor');

describe('Authorization Server', () => {
  test('Create Authorization Server', async () => {
    createServer(new ClientDataAccessor(), new UserDataAccessor());
  });
});

/* eslint-enable no-undef */
