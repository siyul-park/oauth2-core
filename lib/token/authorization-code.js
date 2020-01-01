const Token = require('./token');
const TokenSubjectType = require('./subject-type');

class AuthorizationCode extends Token {
  constructor({
    id, clientId, issuer, expiresIn,
  }, { scope, requestScope }) {
    super({
      id,
      issuer,
      subject: TokenSubjectType.AUTHORIZATION_CODE,
      expiresIn,
    }, scope);

    this.client_id = clientId;
    this.requested_scope = requestScope;
  }
}

module.exports = AuthorizationCode;
