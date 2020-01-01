const generateId = require('../../http/generate-Id');

const defaultOptions = {
  issuer: undefined,

  client: {
    dao: undefined,
  },

  token: {
    authorizationCode: {
      expiresIn: 10 * 60,
    },
    secret: undefined,
    generateId,
  },

  scopeToken: {
    accessToken: {
      create: 'accessToken:create',
    },
  },
};

module.exports = defaultOptions;
