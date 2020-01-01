const validateAndGetClient = require('../validate');

const GenerateAuthorization = require('../authorization');

async function generateAuthorization(request) {
  const client = await validateAndGetClient(request);

  return new GenerateAuthorization(request, client);
}

module.exports = generateAuthorization;
