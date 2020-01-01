const generateConfidentialClient = require('./generate/generate-confidential-client');
const generatePublicClient = require('./generate/generate-public-client');

const factory = {
  generateConfidential: generateConfidentialClient,
  generatePublic: generatePublicClient,
};

module.exports = factory;
