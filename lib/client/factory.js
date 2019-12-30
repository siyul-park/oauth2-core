const generateConfidentialClient = require('./generate/confidential-client');
const generatePublicClient = require('./generate/public-client');

const factory = {
  generateConfidential: generateConfidentialClient,
  generatePublic: generatePublicClient,
};

module.exports = factory;
