const validateBody = require('./validate-body');
const validateHeaders = require('./validate-headers');

const validation = {
  body: validateBody,
  header: validateHeaders,
};

module.exports = validation;
