const Token = require('./token');
const TokenSubjectType = require('./subject-type');

class AuthorizationCode extends Token {
  constructor({ clientId, userId }, expirationPeriod, scope, requestScope) {
    super({
      subject: TokenSubjectType.AUTHORIZATION_CODE,
      expirationPeriod,
    }, scope);

    if (clientId) this.clientId = clientId;
    if (userId) this.userId = userId;
    this.requestScope = requestScope;
  }
}

module.exports = AuthorizationCode;
