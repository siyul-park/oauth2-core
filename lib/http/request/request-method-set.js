const requestMethod = require('./request-method');

const requestMethodSet = new Set(Object.values(requestMethod));

module.exports = requestMethodSet;
