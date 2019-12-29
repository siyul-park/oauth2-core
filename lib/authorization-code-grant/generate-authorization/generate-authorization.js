const validate = require('./validate');

const Authorization = require('./authorization');

async function generateAuthorization(request) {
  await validate(request);

  return new Authorization(request);
}

module.exports = generateAuthorization;
