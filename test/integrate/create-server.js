const oauth2 = require('../../lib');

const ActiveTokenDataAccessor = require('../mock/active-token-data-accessor');

const activeTokenDataAccessor = new ActiveTokenDataAccessor();

function createServer(clientDataAccessor) {
  return new oauth2.Server({
    issuer: 'oauth2-core-test',
    client: {
      dao: clientDataAccessor,
    },
    token: {
      secret: 'OAUTH2-CORE-TEST',
      activeToken: {
        dao: activeTokenDataAccessor,
      },
    },
  });
}

module.exports = createServer;
