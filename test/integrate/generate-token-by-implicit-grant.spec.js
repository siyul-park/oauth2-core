/* eslint-disable no-undef */
const queryString = require('query-string');

const createServer = require('./create-server');

const ClientDataAccessor = require('../mock/client-data-accessor');
const Client = require('../../lib/client/client');

const Request = require('../../lib/http/request/request');
const requestMethod = require('../../lib/http/request/request-method');
const responseType = require('../../lib/http/response/authorization-response-type');

describe('Generate Token By Implicit Grant', () => {
  test('Generate Token Success By Public Client', async () => {
    const redirectUri = 'https://oauth2-core/auth';

    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      scope: ['test'],
      redirectUri,
    }));

    const server = createServer(clientDataAccessor);
    const state = Math.random();

    const response = await server.authorize(new Request({
      method: requestMethod.GET,
      query: {
        response_type: responseType.TOKEN,
        client_id: client.id,
        state,
        scope: ['test'],
        redirect_uri: redirectUri,
      },
    }));

    expect(response.status).toEqual(302);

    const location = response.get('Location');
    expect(location).toBeTruthy();

    const uriAndQuery = location.split('?');
    const uri = uriAndQuery[0];
    const query = queryString.parse(uriAndQuery[1]);

    expect(uri).toEqual(redirectUri);
    expect(query.access_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(query.token_type).toEqual('bearer');
    expect(query.expires_in).toBeTruthy();
    expect(query.scope).toEqual('test');
    expect(Number.parseFloat(query.state)).toEqual(state);
  });
});

/* eslint-enable no-undef */
