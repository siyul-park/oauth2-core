const validateBody = require('./validate-body-generate-token');
const validateHeaders = require('./validate-headers-generate-token');

const validation = {
  body: validateBody,
  header: validateHeaders,
};

module.exports = validation;
