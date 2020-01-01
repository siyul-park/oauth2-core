const Token = require('./token');
const TokenSubjectType = require('./subject-type');

class AccessToken extends Token {
  constructor({
    id, clientId, userId, issuer, expiresIn,
  }, scope) {
    super({
      id,
      issuer,
      subject: TokenSubjectType.ACCESS_TOKEN,
      expiresIn,
    }, scope);

    if (clientId) this.client_id = clientId;
    if (userId) this.user_id = userId;
  }
}

module.exports = AccessToken;
