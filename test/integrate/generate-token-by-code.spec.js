/* eslint-disable no-undef */
const createServer = require('./create-server');
const getAuthorizationCode = require('./get-authorization-code');

const ClientDataAccessor = require('../mock/client-data-accessor');
const Client = require('../../lib/client/client');

const Request = require('../../lib/http/request/request');
const requestMethod = require('../../lib/http/request/request-method');
const grantType = require('../../lib/token/grant-type');

describe('Generate Token By Authorization Code', () => {
  test('Generate Token Success', async () => {
    const redirectUri = 'https://oauth2-core/auth';

    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      scope: ['test'],
      redirectUri,
    }));

    const server = createServer(clientDataAccessor);
    const code = getAuthorizationCode(server, client);

    const response = await server.token(new Request({
      method: requestMethod.POST,
      body: {
        grant_type: grantType.AUTHORIZATION_CODE,
        code,
        redirect_uri: redirectUri,
        client_id: client.id,
      },
    }));

    expect(response.status).toEqual(201);
    expect(response.body.access_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.refresh_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.token_type).toEqual('bearer');

    expect(response.body.state).toEqual(state);
  });
});

/* eslint-enable no-undef */
