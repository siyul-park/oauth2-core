const generateId = require('../../http/generate-Id');

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
