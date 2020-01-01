const oauth2 = require('../../lib');

function createServer(clientDataAccessor) {
  return new oauth2.Server({
    issuer: 'oauth2-core-test',
    client: {
      dao: clientDataAccessor,
    },
    token: {
      secret: 'OAUTH2-CORE-TEST',
    },
  });
}

module.exports = createServer;
