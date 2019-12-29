const Token = require('./token');
const TokenSubjectType = require('./token-subject-type');

class AccessToken extends Token {
  constructor({ clientId, userId }, expirationPeriod, scope) {
    super({
      subject: TokenSubjectType.ACCESS_TOKEN,
      expirationPeriod,
    }, scope);

    if (clientId) this.clientId = clientId;
    if (userId) this.userId = userId;
  }
}

module.exports = AccessToken;
