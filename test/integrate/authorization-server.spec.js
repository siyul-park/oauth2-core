/* eslint-disable no-undef */
const createServer = require('../util/create-server');

const ClientDataAccessor = require('../util/client-data-accessor');
const UserDataAccessor = require('../util/user-data-accessor');

describe('Authorization Server', () => {
  test('Create Authorization Server', async () => {
    createServer(new ClientDataAccessor(), new UserDataAccessor());
  });
});

/* eslint-enable no-undef */
