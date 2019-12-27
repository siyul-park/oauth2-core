const AuthorizationRequest = require('../../request/authorization-request');

const InvalidRequest = require('../../error/invalid-request');
const errorPool = require('../../error/pool');

function authorization(request) {
  if (!(request instanceof AuthorizationRequest)) throw errorPool.get(InvalidRequest);
  request.validate();


}

module.exports = authorization;
