const ActiveTokenDataAccessor = require('../../lib/token/active-token/active-token-data-accessor');

class MockActiveTokenDataAccessor extends ActiveTokenDataAccessor {
  constructor() {
    super();

    this.tokens = new Map();
  }

  async insert(token) {
    this.tokens.set(token.id, token);
    return token;
  }

  async findById(id) {
    return this.tokens.get(id);
  }

  async deleteById(id) {
    this.tokens.delete(id);
  }

  async updateById(id, token) {
    this.tokens.set(token.id, token);
    return token;
  }

  async existById(id) {
    return this.tokens.has(id);
  }
}

module.exports = MockActiveTokenDataAccessor;
