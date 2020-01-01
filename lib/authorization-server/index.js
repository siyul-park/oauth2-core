const defaultOptions = require('./option/default-option');
const combineOptions = require('../option/combine-options');

const authorization = require('./authorization');
const token = require('./token');

class AuthorizationServer {
  constructor(options) {
    this.options = combineOptions(defaultOptions, options);

    this.authorization = authorization.create(this.options);
    this.token = token.create(this.options);
  }
}

module.exports = AuthorizationServer;
