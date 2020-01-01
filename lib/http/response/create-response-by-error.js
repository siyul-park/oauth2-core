const ErrorResponse = require('./error-response');

function createResponseByError(error, state) {
  return new ErrorResponse({
    status: error.status || 500,
    body: {
      error: error.name,
      error_description: error.description,
      error_uri: error.uri,
      state,
    },
  });
}

module.exports = createResponseByError;
