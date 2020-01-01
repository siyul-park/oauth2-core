const ErrorResponse = require('./error-response');
const { Error, ServerError } = require('../../error/errors');

function createResponseByError(error, state) {
  if (error instanceof Error) {
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

  return createResponseByError(ServerError.create({ description: error.message }), state);
}

module.exports = createResponseByError;
