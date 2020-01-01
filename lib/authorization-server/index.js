const defaultOptions = require('./option/default-option');
const combineOptions = require('../option/combine-options');

const authorization = require('./authorization');

class AuthorizationServer {
  constructor(options) {
    this.options = combineOptions(defaultOptions, options);

    this.authorization = authorization.create(this.options);
  }
}

module.exports = AuthorizationServer;
