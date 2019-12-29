const Token = require('./token');
const TokenSubjectType = require('./token-subject-type');

class AuthorizationRequestToken extends Token {
  constructor(request, expirationPeriod) {
    super({
      subject: TokenSubjectType.AUTHORIZATION_REQUEST_TOKEN,
      expirationPeriod,
    }, []);

    this.request = request;
  }
}

module.exports = AuthorizationRequestToken;
