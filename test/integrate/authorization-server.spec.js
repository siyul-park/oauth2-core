/* eslint-disable no-undef */

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
    const client = await clientDataAccessor.insert(new Client());

    const server = createServer(clientDataAccessor);
    const state = Math.random();

    const response = await server.authorization(new Request({
      method: requestMethod.GET,
      query: {
        response_type: responseType.CODE,
        client_id: client.id,
        state,
      },
    }));

    expect(response.status).toEqual(200);
    expect(response.body.code).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.state).toEqual(state);
  });

  test('Post Authorization Code Success', async () => {
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
      },
    }));

    expect(response.status).toEqual(201);
    expect(response.body.code).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.state).toEqual(state);
  });
});

/* eslint-enable no-undef */
