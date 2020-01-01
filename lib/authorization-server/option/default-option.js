const generateId = require('../../http/generate-Id');
const DefaultJobManager = require('../../job/default-job-manager');

const defaultOptions = {
  issuer: undefined,

  client: {
    dao: undefined,
  },

  authorization: {
    // eslint-disable-next-line no-unused-vars
    callback(_request) {
      return undefined;
    },
  },

  token: {
    authorizationCode: {
      expiresIn: 10 * 60,
    },
    accessToken: {
      expiresIn: 60 * 60,
    },
    refreshToken: {
      expiresIn: 30 * 24 * 60 * 60,
    },
    activeToken: {
      dao: undefined,
    },

    secret: undefined,
    generateId,
  },

  job: {
    manager: new DefaultJobManager(),
  },

  scopeToken: {
    accessToken: {
      create: 'accessToken:create',
    },
  },
};

module.exports = defaultOptions;
