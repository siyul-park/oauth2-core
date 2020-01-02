const {
  Server,
  DefaultJobManager,
  DefaultActiveTokenDataAccessor,
  UserDataAccessor,
} = require('../../lib');

const activeTokenDataAccessor = new DefaultActiveTokenDataAccessor();
const jobManager = new DefaultJobManager();

function createServer(clientDataAccessor, userDataAccessor = new UserDataAccessor()) {
  return new Server({
    issuer: 'oauth2-core-test',
    client: {
      dao: clientDataAccessor,
    },
    user: {
      dao: userDataAccessor,
    },
    token: {
      secret: 'OAUTH2-CORE-TEST',
      activeToken: {
        dao: activeTokenDataAccessor,
      },
    },
    job: {
      manager: jobManager,
    },
  });
}

module.exports = createServer;
