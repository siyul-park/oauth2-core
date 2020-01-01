const ActiveTokenDataAccessor = require('../../../lib/lagacy/data-accessor/active-token-data-accessor');

const activeTokens = new Map();

class MockActiveTokenDataAccessor extends ActiveTokenDataAccessor {
  // eslint-disable-next-line class-methods-use-this
  async save(token) {
    activeTokens.set(token.id, token);

    return token;
  }

  // eslint-disable-next-line class-methods-use-this
  async updateById(id, token) {
    activeTokens.set(id, token);

    return token;
  }

  // eslint-disable-next-line class-methods-use-this
  async findById(id) {
    return activeTokens.get(id);
  }

  // eslint-disable-next-line class-methods-use-this
  async existById(id) {
    return activeTokens.has(id);
  }

  // eslint-disable-next-line class-methods-use-this
  async deleteById(id) {
    return activeTokens.delete(id);
  }
}

module.exports = MockActiveTokenDataAccessor;
