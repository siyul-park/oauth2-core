const ActiveToken = require('./active-token');
const runInTime = require('../../time/run-in-time');

const jobPool = new Map();

class ActiveTokenManager {
  constructor(dataAccessor) {
    this.dataAccessor = dataAccessor;
  }

  async active(token, maximumAccessCount) {
    const activeToken = await this.dataAccessor.save(new ActiveToken(token, maximumAccessCount));

    if (token.exp) {
      jobPool.set(
        activeToken.id,
        runInTime(token.exp * 1000, () => this.deActive(activeToken.id)),
      );
    }
  }

  async use(id, error) {
    const token = await this.dataAccessor.findById(id);
    if (!token) throw error;

    token.accessCount += 1;
    if (token.maximumAccessCount && token.accessCount >= token.maximumAccessCount) {
      await this.deActive(id);
    } else {
      await this.dataAccessor.updateById(id, token);
    }
  }

  isActive(id) {
    return this.dataAccessor.existById(id);
  }

  async deActive(id) {
    if (await this.isActive(id)) {
      jobPool.delete(id);
      await this.dataAccessor.deleteById(id);
    }
  }
}

module.exports = ActiveTokenManager;
