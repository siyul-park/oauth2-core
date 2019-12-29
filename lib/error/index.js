const AccessDeniedError = require('./access-denied');
const InvalidRequestError = require('./invalid-request');
const InvalidScopeError = require('./invalid-scope');
const InvalidTokenError = require('./invalid-token');
const ServerError = require('./server-error');
const TemporarilyUnavailableError = require('./temporarily-unavailable');
const UnauthorizedClientError = require('./unauthorized-client');
const UnsupportedTypeError = require('./unsupported-type');

module.exports = {
  AccessDeniedError,
  InvalidRequestError,
  InvalidScopeError,
  InvalidTokenError,
  ServerError,
  TemporarilyUnavailableError,
  UnauthorizedClientError,
  UnsupportedTypeError,
};
