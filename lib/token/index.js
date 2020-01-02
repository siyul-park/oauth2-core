const grantType = require('./grant-type');
const tokenType = require('./token-type');
const activeToken = require('./active-token');

module.exports = {
  grantType,
  tokenType,
  ...activeToken,
};
