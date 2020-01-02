const AuthorizationServer = require('./authorization-server');
const client = require('./client');
const error = require('./error');
const job = require('./job');
const resourceOwner = require('./resource-owner');
const token = require('./token');

module.exports = {
  Server: AuthorizationServer,
  ...client,
  ...error,
  ...job,
  ...resourceOwner,
  ...token,
};
