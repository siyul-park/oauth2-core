const AuthorizationResponse = require('../../response/authorization-response');
const config = require('../../config');
const AuthorizationCode = require('../../token/authorization-code');

const { ServerError } = require('../../error/index');
const errorPool = require('../../error/pool');

const AuthorizationRequestToken = require('../../token/authorization-request-token');

class Authorization {
  constructor(request) {
    this.request = request;

    this.processed = false;
  }

  allow() {
    if (this.processed) throw errorPool.get(ServerError);

    const expirationPeriod = config.get('authorizationCodeExpirationPeriod');

    const code = new AuthorizationCode(this.request.clientId, expirationPeriod, this.request.scope);
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

  generateToken(expirationPeriod) {
    if (this.processed) throw errorPool.get(ServerError);

    const token = new AuthorizationRequestToken(this.request, expirationPeriod);

    this.processed = true;

    return token.encoding();
  }
}

module.exports = Authorization;
