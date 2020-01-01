const ActiveToken = require('./active-token');
const { InvalidToken } = require('../../error/errors');

class ActiveTokenManager {
  constructor(dataAccessor, jobManager) {
    this.dataAccessor = dataAccessor;
    this.jobManager = jobManager;
  }

  async active(token, life) {
    const activeToken = await this.dataAccessor.insert(new ActiveToken(token.jti, life));

    if (token.exp) {
      await this.jobManager.register(
        activeToken.id,
        () => this.deActive(activeToken.id),
        token.exp * 1000,
      );
    }
  }

  async use({ jti }) {
    const token = await this.dataAccessor.findById(jti);
    if (!token) throw InvalidToken.create();

    token.age += 1;
    if (token.life && token.age >= token.life) {
      await this.deActive(jti);
    } else {
      await this.dataAccessor.updateById(jti, token);
    }
  }

  isActive(id) {
    return this.dataAccessor.existById(id);
  }

  async deActive(id) {
    if (await this.isActive(id)) {
      await this.jobManager.delete(id);
      await this.dataAccessor.deleteById(id);
    }
  }
}

module.exports = ActiveTokenManager;
