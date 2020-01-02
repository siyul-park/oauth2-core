const { UnauthorizedUser } = require('../error/errors');
const isExist = require('../validation/is-exist');

class User {
  constructor(options = { name: null, password: null, scope: [] }) {
    this.name = options.name;
    this.password = options.password;
    this.scope = options.scope;
  }

  authenticate(password) {
    if ((isExist(password) || isExist(this.password)) && password !== this.password) {
      throw UnauthorizedUser.create();
    }
  }
}

module.exports = User;
