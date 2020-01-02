/* eslint-disable no-undef */
const {
  Client,
  User,
  Request,
  requestMethod,
  grantType,
} = require('../../lib');

const createServer = require('../util/create-server');
const ClientDataAccessor = require('../util/client-data-accessor');
const UserDataAccessor = require('../util/user-data-accessor');

describe('Generate Token By Password', () => {
  test('Generate Token Success By Password With Client Authorization', async () => {
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

  test('Generate Token Success By Password With Client Secret', async () => {
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
      body: {
        grant_type: grantType.PASSWORD,
        username: user.name,
        password: user.password,
        scope: ['test'],
        client_id: client.id,
        client_secret: client.secret,
      },
    }));

    expect(response.status).toEqual(201);
    expect(response.body.access_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.refresh_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.token_type).toEqual('bearer');
    expect(response.body.expires_in).toBeTruthy();
  });

  test('Generate Token Success By Password', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const userDataAccessor = new UserDataAccessor();

    const user = await userDataAccessor.insert(new User({
      name: 'test',
      password: 'test-password',
      scope: ['test'],
    }));

    const server = createServer(clientDataAccessor, userDataAccessor);

    const response = await server.token(new Request({
      method: requestMethod.POST,
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

  test('Generate Token Fail Because Password Not Correct', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const userDataAccessor = new UserDataAccessor();

    const user = await userDataAccessor.insert(new User({
      name: 'test',
      password: 'test-password',
      scope: ['test'],
    }));

    const server = createServer(clientDataAccessor, userDataAccessor);

    const response = await server.token(new Request({
      method: requestMethod.POST,
      body: {
        grant_type: grantType.PASSWORD,
        username: user.name,
        password: 'other',
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(403);
    expect(response.body.error).toEqual('access_denied');
  });

  test('Generate Token Fail Because Password Is Empty', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const userDataAccessor = new UserDataAccessor();

    const user = await userDataAccessor.insert(new User({
      name: 'test',
      password: 'test-password',
      scope: ['test'],
    }));

    const server = createServer(clientDataAccessor, userDataAccessor);

    const response = await server.token(new Request({
      method: requestMethod.POST,
      body: {
        grant_type: grantType.PASSWORD,
        username: user.name,
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(403);
    expect(response.body.error).toEqual('access_denied');
  });

  test('Generate Token Fail Because User Not Exist', async () => {
    const clientDataAccessor = new ClientDataAccessor();
    const userDataAccessor = new UserDataAccessor();

    const server = createServer(clientDataAccessor, userDataAccessor);

    const response = await server.token(new Request({
      method: requestMethod.POST,
      body: {
        grant_type: grantType.PASSWORD,
        username: 'test',
        password: 'other',
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(403);
    expect(response.body.error).toEqual('access_denied');
  });
});

/* eslint-enable no-undef */
