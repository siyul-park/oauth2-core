/* eslint-disable no-undef */
const queryString = require('query-string');

const {
  Client,
  Request,
  requestMethod,
  responseType,
} = require('../../lib');

const createServer = require('./create-server');
const ClientDataAccessor = require('../mock/client-data-accessor');

describe('Generate Token By Implicit Grant', () => {
  test('Generate Token Success By Public Client With Redirect URI', async () => {
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

  test('Generate Token Success By Confidential Client With Redirect URI', async () => {
    const redirectUri = 'https://oauth2-core/auth';

    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      secret: 'SECRET',
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

  test('Generate Token Success By Public Client', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      scope: ['test'],
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
      },
    }));

    expect(response.status).toEqual(200);
    expect(response.body.access_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.token_type).toEqual('bearer');
    expect(response.body.expires_in).toBeTruthy();
    expect(response.body.scope).toEqual(['test']);
    expect(Number.parseFloat(response.body.state)).toEqual(state);
  });

  test('Generate Token Fail By Because Redirect Uri Not Same', async () => {
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
        redirect_uri: 'other',
      },
    }));

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual('invalid_redirect_url');
    expect(Number.parseFloat(response.body.state)).toEqual(state);
  });

  test('Generate Token Fail By Because Client Not Exist', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const server = createServer(clientDataAccessor);
    const state = Math.random();

    const response = await server.authorize(new Request({
      method: requestMethod.GET,
      query: {
        response_type: responseType.TOKEN,
        client_id: 'Not Exist Client Id',
        state,
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual('unauthorized_client');
    expect(Number.parseFloat(response.body.state)).toEqual(state);
  });

  test('Generate Token Fail By Because Redirect Scope Is Invalid', async () => {
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
        scope: ['other'],
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
    expect(query.error).toEqual('invalid_scope');
    expect(Number.parseFloat(query.state)).toEqual(state);
  });
});

/* eslint-enable no-undef */
