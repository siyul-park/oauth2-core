const UserDataAccessor = require('../../lib/resource-owner/user-data-accessor');

const users = new Map();

class MockUserDataAccessor extends UserDataAccessor {
  // eslint-disable-next-line class-methods-use-this
  async findByName(name) {
    return users.get(name);
  }

  // eslint-disable-next-line class-methods-use-this
  async insert(user) {
    // eslint-disable-next-line no-param-reassign
    users.set(user.name, user);

    return user;
  }
}

module.exports = MockUserDataAccessor;
