const Token = require('./token');
const TokenSubjectType = require('./token-subject-type');

class AuthorizationCode extends Token {
  constructor(clientId, expirationPeriod, scope) {
    super({
      subject: TokenSubjectType.AUTHORIZATION_CODE,
      expirationPeriod,
    }, scope);

    this.clientId = clientId;
  }
}

module.exports = AuthorizationCode;
