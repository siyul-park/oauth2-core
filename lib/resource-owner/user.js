const { UnauthorizedUser } = require('../error/errors');

class User {
  constructor(options = { name: null, password: null, scope: [] }) {
    this.name = options.name;
    this.password = options.password;
    this.scope = options.scope;
  }

  authenticate(request) {
    if (request.username !== this.name || request.password !== this.password) {
      throw UnauthorizedUser.create();
    }
  }
}

module.exports = User;
