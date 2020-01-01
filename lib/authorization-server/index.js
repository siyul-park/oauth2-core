const defaultOptions = require('./option/default-option');
const combineOptions = require('../option/combine-options');

const authorization = require('./authorization');
const token = require('./token');
const ActiveTokenManager = require('../token/active-token/active-token-manager');

class AuthorizationServer {
  constructor(options) {
    this.options = combineOptions(defaultOptions, options);
    this.options.token.activeToken.manager = new ActiveTokenManager(
      this.options.token.activeToken.dao, this.options.job.manager,
    );

    this.authorize = authorization.create(this.options);
    this.token = token.create(this.options);
  }
}

module.exports = AuthorizationServer;
