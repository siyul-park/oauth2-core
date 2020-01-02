const generateId = require('../../http/generate-Id');

const defaultOptions = {
  issuer: undefined,

  client: {
    dao: undefined,
  },

  user: {
    dao: undefined,
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
    manager: undefined,
  },

  scopeToken: {
    accessToken: {
      create: 'accessToken:create',
    },
  },
};

module.exports = defaultOptions;
