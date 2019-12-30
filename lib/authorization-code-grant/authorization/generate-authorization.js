const validateAndGetClient = require('./validate-and-get-client');

const Authorization = require('./authorization');

async function generateAuthorization(request) {
  const client = await validateAndGetClient(request);

  return new Authorization(request, client);
}

module.exports = generateAuthorization;
