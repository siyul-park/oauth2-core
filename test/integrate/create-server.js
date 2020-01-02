const oauth2 = require('../../lib');

const DefaultActiveTokenDataAccessor = require('../../lib/token/active-token/default-active-token-data-accessor');
const DefaultJobManager = require('../../lib/job/default-job-manager');

const UserDataAccessor = require('../mock/user-data-accessor');

const activeTokenDataAccessor = new DefaultActiveTokenDataAccessor();
const jobManager = new DefaultJobManager();

function createServer(clientDataAccessor, userDataAccessor = new UserDataAccessor()) {
  return new oauth2.Server({
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
