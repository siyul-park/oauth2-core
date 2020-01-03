/* eslint-disable no-undef */
const {
  Client,
  Request,
  requestMethod,
  grantType,
} = require('../../lib');

const createServer = require('../util/create-server');
const getAuthorizationCode = require('../util/get-authorization-code');
const generateTokenByCode = require('../util/generate-token-by-code');
const ClientDataAccessor = require('../util/client-data-accessor');

describe('Generate Token By Refresh Token', () => {
  test('Generate Token Success By Authorization', async () => {
    const redirectUri = 'https://oauth2-core/auth';

    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      secret: 'SECRET',
      scope: ['authorizationCode:create', 'accessToken:create', 'refreshToken:create', 'test'],
      redirectUri,
    }));

    const server = createServer(clientDataAccessor);
    const code = await getAuthorizationCode(server, client, 'test');

    // eslint-disable-next-line max-len
    const refreshToken = (await generateTokenByCode(server, client, code, redirectUri)).body.refresh_token;

    const response = await server.token(new Request({
      method: requestMethod.POST,
      headers: {
        Authorization: `Basic ${client.basic()}`,
      },
      body: {
        grant_type: grantType.REFRESH_TOKEN,
        refresh_token: refreshToken,
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(201);
    expect(response.body.access_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.token_type).toEqual('bearer');
    expect(response.body.expires_in).toBeTruthy();
  });

  test('Generate Token Success By Client Secret', async () => {
    const redirectUri = 'https://oauth2-core/auth';

    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      secret: 'SECRET',
      scope: ['authorizationCode:create', 'accessToken:create', 'refreshToken:create', 'test'],
      redirectUri,
    }));

    const server = createServer(clientDataAccessor);
    const code = await getAuthorizationCode(server, client, 'test');

    // eslint-disable-next-line max-len
    const refreshToken = (await generateTokenByCode(server, client, code, redirectUri)).body.refresh_token;

    const response = await server.token(new Request({
      method: requestMethod.POST,
      body: {
        grant_type: grantType.REFRESH_TOKEN,
        refresh_token: refreshToken,
        scope: ['test'],
        client_id: client.id,
        client_secret: client.secret,
      },
    }));

    expect(response.status).toEqual(201);
    expect(response.body.access_token).toEqual(expect.stringMatching(/[a-z0-9]+/));
    expect(response.body.token_type).toEqual('bearer');
    expect(response.body.expires_in).toBeTruthy();
  });

  test('Generate Token Fail Because Client Not Same', async () => {
    const redirectUri = 'https://oauth2-core/auth';

    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      secret: 'SECRET',
      scope: ['authorizationCode:create', 'accessToken:create', 'refreshToken:create', 'test'],
      redirectUri,
    }));

    const server = createServer(clientDataAccessor);
    const code = await getAuthorizationCode(server, client, 'test');

    // eslint-disable-next-line max-len
    const refreshToken = (await generateTokenByCode(server, client, code, redirectUri)).body.refresh_token;

    const otherClient = await clientDataAccessor.insert(new Client({
      secret: 'SECRET',
      scope: ['authorizationCode:create', 'accessToken:create', 'refreshToken:create', 'test'],
      redirectUri,
    }));

    const response = await server.token(new Request({
      method: requestMethod.POST,
      headers: {
        Authorization: `Basic ${otherClient.basic()}`,
      },
      body: {
        grant_type: grantType.REFRESH_TOKEN,
        refresh_token: refreshToken,
        scope: ['test'],
      },
    }));

    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual('unauthorized_client');
  });

  test('Generate Token Fail Because Client Not Same', async () => {
    const redirectUri = 'https://oauth2-core/auth';

    const clientDataAccessor = new ClientDataAccessor();
    const client = await clientDataAccessor.insert(new Client({
      secret: 'SECRET',
      scope: ['authorizationCode:create', 'accessToken:create', 'refreshToken:create', 'test'],
      redirectUri,
    }));

    const server = createServer(clientDataAccessor);
    const code = await getAuthorizationCode(server, client, 'test');

    // eslint-disable-next-line max-len
    const refreshToken = (await generateTokenByCode(server, client, code, redirectUri)).body.refresh_token;

    const response = await server.token(new Request({
      method: requestMethod.POST,
      headers: {
        Authorization: `Basic ${client.basic()}`,
      },
      body: {
        grant_type: grantType.REFRESH_TOKEN,
        refresh_token: refreshToken,
        scope: ['other'],
      },
    }));

    expect(response.status).toEqual(403);
    expect(response.body.error).toEqual('invalid_scope');
  });
});

/* eslint-enable no-undef */
