const grantType = require('./grant-type');
const tokenType = require('./token-type');
const activeToken = require('./active-token');
const generateId = require('./generate-Id');

module.exports = {
  grantType,
  tokenType,
  generateId,
  ...activeToken,
};
