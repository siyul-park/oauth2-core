const Token = require('./token');
const TokenSubjectType = require('./subject-type');

class AuthorizationCode extends Token {
  constructor(clientId, expirationPeriod, scope, requestScope) {
    super({
      subject: TokenSubjectType.AUTHORIZATION_CODE,
      expirationPeriod,
    }, scope);

    this.clientId = clientId;
    this.requestScope = requestScope;
  }
}

module.exports = AuthorizationCode;
