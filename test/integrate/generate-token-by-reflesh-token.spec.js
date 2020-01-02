/* eslint-disable no-undef */
const createServer = require('./create-server');

const ClientDataAccessor = require('../mock/client-data-accessor');
const Client = require('../../lib/client/client');

const UserDataAccessor = require('../mock/user-data-accessor');
const User = require('../../lib/resource-owner/user');

const Request = require('../../lib/http/request/request');
const requestMethod = require('../../lib/http/request/request-method');
const grantType = require('../../lib/token/grant-type');

describe('Generate Token By Password', () => {
  test('Generate Token Success By Password', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const userDataAccessor = new UserDataAccessor();

    const client = await clientDataAccessor.insert(new Client({
      secret: 'SECRET',
      scope: ['test'],
    }));
    const user = await userDataAccessor.insert(new User({
      name: 'test',
      password: 'test-password',
      scope: ['test'],
    }));

    const server = createServer(clientDataAccessor, userDataAccessor);

    const response = await server.token(new Request({
      method: requestMethod.POST,
      headers: {
        Authorization: `Basic ${client.base64()}`,
      },
      body: {
        grant_type: grantType.PASSWORD,
        username: user.name,
        password: user.password,
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(201);
    expect(response.body.access_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.refresh_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.token_type).toEqual('bearer');
    expect(response.body.expires_in).toBeTruthy();
  });
});

/* eslint-enable no-undef */
