const Token = require('./token');
const TokenSubjectType = require('./subject-type');

class RefreshToken extends Token {
  constructor({
    id, clientId, username, issuer, expiresIn,
  }, scope) {
    super({
      id,
      issuer,
      subject: TokenSubjectType.REFRESH_TOKEN,
      expiresIn,
    }, scope);

    if (clientId) this.client_id = clientId;
    if (username) this.username = username;
  }
}

module.exports = RefreshToken;
