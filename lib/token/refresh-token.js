const Token = require('./token');
const TokenSubjectType = require('./subject-type');

class RefreshToken extends Token {
  constructor({ clientId, userId }, expirationPeriod, scope) {
    super({
      subject: TokenSubjectType.REFRESH_TOKEN,
      expirationPeriod,
    }, scope);

    if (clientId) this.clientId = clientId;
    if (userId) this.userId = userId;
  }
}

module.exports = RefreshToken;
