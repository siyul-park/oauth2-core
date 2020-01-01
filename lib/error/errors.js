const Error = require('./error');
const InvalidParameters = require('./invalid-parameters');
const UnauthorizedClient = require('./unauthorized-client');
const TemporarilyUnavailable = require('./temporarily-unavailable');
const ServerError = require('./server-error');
const InvalidScope = require('./invalid-scope');
const MethodNotAllow = require('./method-not-allow');
const InvalidRequest = require('./invalid-request');
const UnsupportedResponseType = require('./unsupported-response-type');

const createErrorFunction = require('./create-error-function');

InvalidParameters.create = createErrorFunction(InvalidParameters);
UnauthorizedClient.create = createErrorFunction(UnauthorizedClient);
TemporarilyUnavailable.create = createErrorFunction(TemporarilyUnavailable);
ServerError.create = createErrorFunction(ServerError);
InvalidScope.create = createErrorFunction(InvalidScope);
MethodNotAllow.create = createErrorFunction(MethodNotAllow);
InvalidRequest.create = createErrorFunction(InvalidRequest);
UnsupportedResponseType.create = createErrorFunction(UnsupportedResponseType);

module.exports = {
  Error,
  InvalidParameters,
  UnauthorizedClient,
  TemporarilyUnavailable,
  ServerError,
  InvalidScope,
  MethodNotAllow,
  InvalidRequest,
  UnsupportedResponseType,
};
