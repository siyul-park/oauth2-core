const config = require('../../config');

const AuthorizationRequestToken = require('../../token/authorization-request-token');
const AuthorizationResponse = require('../../response/authorization-response');
const AuthorizationCode = require('../../token/authorization-code');

const { ServerError } = require('../../error/index');
const errorPool = require('../../error/pool');

const Scope = require('../../scope/scope');

const activeTokenPool = require('../../token/active-token/pool');
const ActiveTokenType = require('../../token/active-token/type');

class Authorization {
  constructor(request, client) {
    this.request = request;
    this.client = client;

    this.processed = false;
  }

  async allow() {
    if (this.processed) throw errorPool.get(ServerError);

    const expirationPeriod = config.get('authorizationCodeExpirationPeriod');

    const code = new AuthorizationCode(
      this.request.clientId, expirationPeriod,
      [Scope.ACCESS_TOKEN.CREATE], this.request.scope,
    );

    const activeTokenManager = activeTokenPool.get(ActiveTokenType.AUTHORIZATION_CODE);
    await activeTokenManager.active(code, 1);

    const token = code.encoding();

    this.processed = true;

    return new AuthorizationResponse({
      code: token,
      state: this.request.state,
      redirectUri: this.request.redirectUri,
    });
  }

  deny() {
    if (this.processed) throw errorPool.get(ServerError);
    this.processed = true;
  }

  async generateToken(expirationPeriod) {
    if (this.processed) throw errorPool.get(ServerError);

    const token = new AuthorizationRequestToken(
      this.request, expirationPeriod,
      [Scope.AUTHORIZATION.CODE.CREATE],
    );

    const activeTokenManager = activeTokenPool.get(ActiveTokenType.AUTHORIZATION_CODE);
    await activeTokenManager.active(token, 1);

    this.processed = true;

    return token.encoding();
  }
}

module.exports = Authorization;
