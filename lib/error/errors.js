const Error = require('./error');
const InvalidParameters = require('./invalid-parameters');
const UnauthorizedClient = require('./unauthorized-client');
const TemporarilyUnavailable = require('./temporarily-unavailable');
const ServerError = require('./server-error');
const InvalidScope = require('./invalid-scope');
const MethodNotAllow = require('./method-not-allow');
const InvalidRequest = require('./invalid-request');
const UnsupportedResponseType = require('./unsupported-response-type');
const UnsupportedGrantType = require('./unsupported-grant-type');
const InvalidRedirectUri = require('./invalid-redirect-uri');
const InvalidToken = require('./invalid-token');
const AccessDenied = require('./access-denied');
const UnauthorizedUser = require('./unauthorized-user');

const createErrorFunction = require('./create-error-function');

InvalidParameters.create = createErrorFunction(InvalidParameters);
UnauthorizedClient.create = createErrorFunction(UnauthorizedClient);
TemporarilyUnavailable.create = createErrorFunction(TemporarilyUnavailable);
ServerError.create = createErrorFunction(ServerError);
InvalidScope.create = createErrorFunction(InvalidScope);
MethodNotAllow.create = createErrorFunction(MethodNotAllow);
InvalidRequest.create = createErrorFunction(InvalidRequest);
UnsupportedResponseType.create = createErrorFunction(UnsupportedResponseType);
UnsupportedGrantType.create = createErrorFunction(UnsupportedGrantType);
InvalidRedirectUri.create = createErrorFunction(InvalidRedirectUri);
AccessDenied.create = createErrorFunction(AccessDenied);
InvalidToken.create = createErrorFunction(InvalidToken);
UnauthorizedUser.create = createErrorFunction(UnauthorizedUser);

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
  UnsupportedGrantType,
  InvalidRedirectUri,
  AccessDenied,
  InvalidToken,
  UnauthorizedUser,
};
