/* eslint-disable no-undef */
const queryString = require('query-string');

const createEndPoint = require('../../../lib/http/end-point/create-end-point');
const requestMethod = require('../../../lib/http/request/request-method');
const Request = require('../../../lib/http/request/request');

const ServerError = require('../../../lib/error/server-error');

const mockPromiseEndPoint = require('../../util/promise-end-point');
const mockFunctionalEndPoint = require('../../util/functional-end-point');

describe('Create End Point', () => {
  test('Success End Point Create By Promise', async () => {
    const endPoint = createEndPoint(requestMethod.POST, 201, mockPromiseEndPoint);

    const state = Math.random();

    const response = await endPoint(new Request({ method: requestMethod.POST, body: { state } }));

    expect(response.status).toEqual(201);
    expect(response.body.state).toEqual(state);
  });

  test('Success End Point Create By Function', async () => {
    const endPoint = createEndPoint(requestMethod.POST, 201, mockFunctionalEndPoint);

    const state = Math.random();

    const response = await endPoint(new Request({ method: requestMethod.POST, body: { state } }));

    expect(response.status).toEqual(201);
    expect(response.body.state).toEqual(state);
  });

  test('Success Redirect End Point Create By Function', async () => {
    const endPoint = createEndPoint(requestMethod.POST, 201, mockFunctionalEndPoint);

    const state = Math.random();
    const redirectUri = 'https://oauth2-core/auth';

    const response = await endPoint(
      new Request({ method: requestMethod.POST, body: { state, redirect_uri: redirectUri } }),
      { redirect: true },
    );

    expect(response.status).toEqual(302);

    const location = response.get('Location');
    expect(location).toBeTruthy();

    const uriAndQuery = location.split('?');
    const uri = uriAndQuery[0];
    const query = queryString.parse(uriAndQuery[1]);

    expect(uri).toEqual(redirectUri);
    expect(Number.parseFloat(query.state)).toEqual(state);
  });

  test('Success Throw Error End Point Create By Function', async () => {
    const endPoint = createEndPoint(requestMethod.POST, 201, mockFunctionalEndPoint);

    const state = Math.random();
    const error = new ServerError();

    const response = await endPoint(
      new Request({
        method: requestMethod.POST,
        body: { state },
      }),
      { throwError: error },
    );

    expect(response.status).toEqual(error.status);
    expect(response.body.error).toEqual(error.name);
    expect(response.body.error_description).toEqual(error.description);
    expect(response.body.error_uri).toEqual(error.uri);
  });

  test('Success Redirect when throw Error End Point Create By Function', async () => {
    const endPoint = createEndPoint(requestMethod.POST, 201, mockFunctionalEndPoint);

    const state = Math.random();
    const redirectUri = 'https://oauth2-core/auth';
    const error = new ServerError();

    const response = await endPoint(
      new Request({
        method: requestMethod.POST,
        body: { state, redirect_uri: redirectUri },
      }),
      { throwError: error, redirect: true },
    );

    expect(response.status).toEqual(302);

    const location = response.get('Location');
    expect(location).toBeTruthy();

    const uriAndQuery = location.split('?');
    const uri = uriAndQuery[0];
    const query = queryString.parse(uriAndQuery[1]);

    expect(uri).toEqual(redirectUri);
    expect(query.error).toEqual('server_error');
    expect(Number.parseFloat(query.state)).toEqual(state);
  });
});

/* eslint-enable no-undef */
