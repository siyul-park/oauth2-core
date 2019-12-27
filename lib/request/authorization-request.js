const Request = require('./request');
const responseType = require('./response-type');

const InvalidRequest = require('../error/invalid-request');
const errorPool = require('../error/pool');

const validateResponseType = require('./validate/validate-response-type');
const validateRequired = require('./validate/validate-required');

class AuthorizationRequest extends Request {
  constructor({clientId, redirectUri, scope, state}) {
    super();

    this.responseType = responseType.code;
    this.clientId = clientId;
    this.redirectUri = redirectUri;
    this.scope = scope;
    this.state = state;
  }

  validate() {
    validateRequired(this.responseType, errorPool.get(InvalidRequest));
    validateResponseType(this.responseType, responseType.code, errorPool.get(InvalidRequest));

    validateRequired(this.clientId, errorPool.get(InvalidRequest));
  }
}

module.exports = AuthorizationRequest;
