const ActiveToken = require('../token/active-token');
const runInTime = require('../time/run-in-time');

const jobPool = new Map();

class ActiveTokenDataAccessor {
  async active(token, maximumAccessCount) {
    const activeToken = await this.save(new ActiveToken(token, maximumAccessCount));

    if (token.exp) {
      jobPool.set(
        activeToken.id,
        runInTime(token.exp * 1000, () => this.deActive(activeToken.id)),
      );
    }
  }

  async use(id, error) {
    const token = await this.findById(id);
    if (!token) throw error;

    token.accessCount += 1;
    if (token.maximumAccessCount && token.accessCount >= token.maximumAccessCount) {
      await this.deActive(id);
    } else {
      await this.updateById(id, token);
    }
  }

  isActive(id) {
    return this.existById(id);
  }

  async deActive(id) {
    if (await this.isActive(id)) {
      jobPool.delete(id);
      await this.deleteById(id);
    }
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  async save(_token) {
    return undefined;
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  async updateById(_id, _token) {
    return undefined;
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  async findById(_id) {
    return undefined;
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  async existById(_id) {
    return undefined;
  }

  // eslint-disable-next-line no-unused-vars,class-methods-use-this
  async deleteById(_id) {
    return undefined;
  }
}

module.exports = ActiveTokenDataAccessor;
