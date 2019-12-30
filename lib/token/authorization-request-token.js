const Token = require('./token');
const TokenSubjectType = require('./token-subject-type');

class AuthorizationRequestToken extends Token {
  constructor(request, expirationPeriod, scope) {
    super({
      subject: TokenSubjectType.AUTHORIZATION_REQUEST_TOKEN,
      expirationPeriod,
    }, scope);

    this.request = request;
  }
}

module.exports = AuthorizationRequestToken;
