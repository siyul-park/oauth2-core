/* eslint-disable no-undef */
const queryString = require('query-string');

const createServer = require('./create-server');

const ClientDataAccessor = require('../mock/client-data-accessor');
const Client = require('../../lib/client/client');

const Request = require('../../lib/http/request/request');
const requestMethod = require('../../lib/http/request/request-method');
const responseType = require('../../lib/http/response/authorization-response-type');

describe('Authorization Server', () => {
  test('Create Authorization Server', async () => {
    const clientDataAccessor = new ClientDataAccessor();

    createServer(clientDataAccessor);
  });

  test('Get Authorization Code Success', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      scope: ['test'],
    }));

    const server = createServer(clientDataAccessor);
    const state = Math.random();

    const response = await server.authorization(new Request({
      method: requestMethod.GET,
      query: {
        response_type: responseType.CODE,
        client_id: client.id,
        state,
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(200);
    expect(response.body.code).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.state).toEqual(state);
  });

  test('Post Authorization Code Success', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      scope: ['test'],
    }));
    const server = createServer(clientDataAccessor);
    const state = Math.random();

    const response = await server.authorization(new Request({
      method: requestMethod.POST,
      body: {
        response_type: responseType.CODE,
        client_id: client.id,
        state,
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(201);
    expect(response.body.code).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.state).toEqual(state);
  });

  test('Get Authorization Code Redirect Success', async () => {
    const redirectUri = 'https://oauth2-core/auth';

    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      scope: ['test'],
      redirectUri,
    }));
    const server = createServer(clientDataAccessor);
    const state = Math.random();

    const response = await server.authorization(new Request({
      method: requestMethod.POST,
      body: {
        response_type: responseType.CODE,
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
    expect(query.code).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(Number.parseFloat(query.state)).toEqual(state);
  });

  test('Post Authorization Code Fail Because scope is invalid', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client());
    const server = createServer(clientDataAccessor);
    const state = Math.random();

    const response = await server.authorization(new Request({
      method: requestMethod.POST,
      body: {
        response_type: responseType.CODE,
        client_id: client.id,
        state,
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(403);
    expect(response.body.error).toEqual('invalid_scope');
  });
});

/* eslint-enable no-undef */
