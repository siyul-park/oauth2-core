# OAuth2 Core  
Complete implementation of OAuth 2.0

OAuth is an open standard for delegation of access, which is used as a common means by which Internet users can give a website or application access to their information on another website without providing a password.

​    

OAuth2 Core supports the following flows.

- [Authorization Code Grant Flow](https://tools.ietf.org/html/rfc6749#section-4.1)
- [Implicit Grant Flow](https://tools.ietf.org/html/rfc6749#section-4.2)
- [Resource Owner Password Credentials Grant Flow](https://tools.ietf.org/html/rfc6749#section-4.3)
- [Client Credentials Grant Flow](https://tools.ietf.org/html/rfc6749#section-4.4) 

​    

And It also support refreshing an access token

- [Refreshing an Access Token](https://tools.ietf.org/html/rfc6749#section-6)

​    

## Installation

Install the library using [npm](http://npmjs.org/):

```bash
npm i oauth2-core
```

​    

## Create server

Before create server, you make server options. and create server.

```js
const options = {
  issuer: 'https://test.oauth2-core',
  client: {
    dao: clientDataAccessor,
  },
  user: {
    dao: userDataAccessor,
  },
  token: {
    secret: 'OAUTH2-CORE-TEST',
    activeToken: {
      dao: new DefaultActiveTokenDataAccessor(),
    },
  },
  job: {
    manager: new DefaultJobManager(),
  },
};

const server = new Server(options);
```

- `issuer` is used by the server to issue a token and to verify that the token has been issued by its server.
- `client.dao` is used to find the client for the server to authenticate.
- `user.dao` is used to find a user for the server to authenticate.
- `token.secret` is the secret key for the server to issue tokens.
- `token.activeToken.dao` is used to insert or delete tokens that the server is active.
- `job.manager` is used by the server to schedule and manage asynchronous jobs.

​    

### Default options

```js
const defaultOptions = {
  issuer: undefined,

  client: {
    dao: undefined,
  },

  user: {
    dao: undefined,
  },

  token: {
    authorizationCode: {
      expiresIn: 10 * 60,
    },
    accessToken: {
      expiresIn: 60 * 60,
    },
    refreshToken: {
      expiresIn: 30 * 24 * 60 * 60,
    },
    activeToken: {
      dao: undefined,
    },

    secret: undefined,
    generateId,
  },

  job: {
    manager: undefined,
  },

  scopeToken: {
    accessToken: {
      create: 'accessToken:create',
    },
  },
};
```

- Unspecified options are set as default options.

​    

### Client Data Accessor

```js
class ClientDataAccessor {
  async findById(_id) {
    return undefined;
  }
}
```

- You must implement `findById` properly by extends ` Client Data Accessor`.

#### Example

```js
const clients = new Map();

class MockClientDataAccessor extends ClientDataAccessor {
  async findById(id) {
    return clients.get(id);
  }

  async insert(client) {
    if (!client.id) client.id = generateId();

    clients.set(client.id, client);

    return client;
  }

  async deleteById(id) {
    clients.delete(id);
  }
}
```

- This is a very simple example used for testing.

​    

### Client

```js
class Client {
  constructor(options = {
    id: null, secret: null, scope: [], redirectUri: null,
  }) {
    this.id = options.id;
    this.secret = options.secret;
    this.scope = options.scope;
    this.redirectUri = options.redirectUri;
  }

  authenticate(secret) {
    if ((isExist(secret) || isExist(this.secret)) && secret !== this.secret) {
      throw UnauthorizedClient.create();
    }
  }

  base64() {
    return btoa(`${this.id}:${this.secret}`);
  }
}
```

- `Client` is defined as above and can be extended as needed.
- `scope` is the scope of ` scope` that this client has access to.

​    

### User Data Accessor

```js
class UserDataAccessor {
  async findByName(_name) {
    return undefined;
  }
}
```

- You must implement `findByName` properly by extends `UserDataAccessor`.

#### Example

```js
const users = new Map();

class MockUserDataAccessor extends UserDataAccessor {
  async findByName(name) {
    return users.get(name);
  }

  async insert(user) {
    users.set(user.name, user);

    return user;
  }
}
```

- This is a very simple example used for testing.

​    

### User

```js
class User {
  constructor(options = { name: null, password: null, scope: [] }) {
    this.name = options.name;
    this.password = options.password;
    this.scope = options.scope;
  }

  authenticate(password) {
    if ((isExist(password) || isExist(this.password)) && password !== this.password) {
      throw UnauthorizedUser.create();
    }
  }
}
```

- `User` is defined as above and can be extended as needed.

​    

### Active Token Data Accessor

```js
class ActiveTokenDataAccessor {
  async insert(_token) {
    return undefined;
  }

  async findById(_id) {
    return undefined;
  }

  async deleteById(_id) {
    return undefined;
  }

  async updateById(_id, _token) {
    return undefined;
  }

  async existById(_id) {
    return undefined;
  }
}
```

- You can implement all properly by extends `UserDataAccessor` To extend functionality.

​    

### Active Token

```js
class ActiveToken {
  constructor(id, life) {
    this.id = id;
    this.life = life;
    this.age = 0;
  }
}
```

- `ActiveToken` is defined as above and can be extended as needed.
- `life` is maximum count to access this token.
- `age` is access count.

​    

### Job Manager

```js
class JobManager {
  async register(_id, _handler, _timeout) {
    return undefined;
  }

  async delete(_id) {
    return undefined;
  }
}
```

- You can implement all properly by extends `JobManager` To extend functionality.
- `id` is job's id.
- `handler` is function to run current time.
- `timeout` is milliseconds to run `handler` in `timeout` milliseconds later.

​    

## Authorization Code Grant

​	The authorization code grant type is used to obtain both access tokens and refresh tokens and is optimized for confidential clients. - [rfc6749](https://tools.ietf.org/html/rfc6749#section-4.1)

### Authorization

#### Request

```js
const response = await server.authorize(new Request({
  method: requestMethod.GET,
  query: {
    response_type: responseType.CODE,
    client_id: client.id,
    state,
    scope,
  },
}));
```

#### Response

```js
response = {
  status: 200,
  body: {
  	code: 'code',
  	state,
  }
};
```

​    

### Access Token

#### Request

##### By basic authorization

```js
const response = await server.token(new Request({
  method: requestMethod.POST,
  headers: {
    Authorization: `Basic ${client.base64()}`,
  },
  body: {
    grant_type: grantType.AUTHORIZATION_CODE,
    code,
    redirect_uri: redirectUri,
    client_id: client.id,
  },
}));
```

##### by client secret

```js
const response = await server.token(new Request({
  method: requestMethod.POST,
  body: {
    grant_type: grantType.AUTHORIZATION_CODE,
    code,
    redirect_uri: redirectUri,
    client_id: client.id,
    client_secret: client.secret,
  },
}));
```

#### Response

```js
response = {
  status: 201,
  body: {
  	access_token 'access_token',
  	refresh_token: 'refresh_token',
  	token_type: 'example',
  	expires_in: 3600,
  }
};
```

​    

## Implicit Grant

​	The implicit grant type is used to obtain access tokens (it does not support the issuance of refresh tokens) and is optimized for public clients known to operate a particular redirection URI.  These clients are typically implemented in a browser using a scripting language such as JavaScript.  - [rfc6749](https://tools.ietf.org/html/rfc6749#section-4.2)

### Use Redirect 

#### Authorization Request

```js
const response = await server.authorize(new Request({
  method: requestMethod.GET,
  query: {
    response_type: responseType.TOKEN,
    client_id: client.id,
    state,
    scope,
    redirect_uri: client.redirectUri,
  },
}));

```

#### Response

```js
response = {
  status: 302,
  headers: {
    Location: 'https://example.auth2-core/auth?access_token=access_token&token_type=example&expires_in=3600&scope=scopestate=state'
  }
};
```

​    

### Not Use Redirect

#### Authorization Request

```js
const response = await server.authorize(new Request({
  method: requestMethod.GET,
  query: {
    response_type: responseType.TOKEN,
    client_id: client.id,
    state,
    scope,
  },
}));

```

#### Response

```js
response = {
  status: 300,
  body: {
  	access_token 'access_token',
  	token_type: 'example',
  	expires_in: 3600,
    state,
    scope,
  }
};
```

​        

## Resource Owner Password Credentials Grant

​	The resource owner password credentials grant type is suitable in cases where the resource owner has a trust relationship with the client, such as the device operating system or a highly privileged application.  The authorization server should take special care when enabling this grant type and only allow it when other flows are not viable.  - [rfc6749](https://tools.iet3.org/html/rfc6749#section-4.4)

### Request

#### By basic authorization

```js
const response = await server.token(new Request({
  method: requestMethod.POST,
  headers: {
    Authorization: `Basic ${client.base64()}`,
  },
  body: {
    grant_type: grantType.PASSWORD,
    username: user.name,
    password: user.password,
    scope,
  },
}));
```

#### by client secret

```js
const response = await server.token(new Request({
  method: requestMethod.POST,
  body: {
    grant_type: grantType.PASSWORD,
    username: user.name,
    password: user.password,
    scope
    client_id: client.id,
    client_secret: client.secret,
  },
}));
```

### Response

```js
response = {
  status: 201,
  body: {
  	access_token 'access_token',
  	refresh_token: 'refresh_token',
  	token_type: 'example',
  	expires_in: 3600,
  }
};
```

​    

## Client Credentials Grant

​	The client can request an access token using only its client credentials (or other supported means of authentication) when the client is requesting access to the protected resources under its control, or those of another resource owner that have been previously arranged with the authorization server.  - [rfc6749](https://tools.ietf.org/html/rfc6749#section-4.4)

### Request

#### By basic authorization

```js
const response = await server.token(new Request({
  method: requestMethod.POST,
  headers: {
    Authorization: `Basic ${client.base64()}`,
  },
  body: {
    grant_type: grantType.CLIENT_CREDENTIALS,
    scope: ['test'],
  },
}));
```

#### by client secret

```js
const response = await server.token(new Request({
  method: requestMethod.POST,
  body: {
    grant_type: grantType.CLIENT_CREDENTIALS,
    scope: ['test'],
    client_id: client.id,
    client_secret: client.secret,
  },
}));
```

### Response

```js
response = {
  status: 201,
  body: {
  	access_token 'access_token',
  	token_type: 'example',
  	expires_in: 3600,
  }
};
```

​    

## Refreshing an Access Token

​	The client can request an access token using only issued refresh token.

### Request

#### By basic authorization

```js
await server.token(new Request({
  method: requestMethod.POST,
  headers: {
    Authorization: `Basic ${client.base64()}`,
  },
  body: {
    grant_type: grantType.REFRESH_TOKEN,
    refresh_token: refreshToken,
    scope: ['test'],
  },
}));
```

#### by client secret

```js
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
```

### Response

```js
response = {
  status: 201,
  body: {
  	access_token 'access_token',
  	token_type: 'example',
  	expires_in: 3600,
  }
};
```

