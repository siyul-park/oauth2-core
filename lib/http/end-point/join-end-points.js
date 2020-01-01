const MethodNotAllow = require('../../error/method-not-allow');

const createResponseByError = require('../response/create-response-by-error');
const getRedirectUri = require('../redirect-uri/get-redirect-uri');

const defaultOptions = require('./default-options');

function joinEndPoints(endPoints = []) {
  const endPointMap = new Map();

  endPoints.forEach((endPoint) => {
    endPointMap.set(endPoint.method, endPoint);
  });

  function validate(request) {
    if (!endPointMap.has(request.method)) throw new MethodNotAllow();
  }

  async function runEndPointFunctions(request, options) {
    const requestParams = { ...request.headers, ...request.query, ...request.body };

    try {
      await validate(request);

      return await endPointMap.get(request.method)(request, options);
    } catch (e) {
      if (options.errorResponse) return createResponseByError(e, requestParams.state);
      throw e;
    }
  }

  // eslint-disable-next-line func-names
  return async function (request, options) {
    const assignedOptions = { ...defaultOptions, ...options };

    const response = await runEndPointFunctions(request, assignedOptions);

    const redirectUri = getRedirectUri(request, response);
    if (assignedOptions.redirect && !!redirectUri) {
      return response.redirect(redirectUri);
    }
    return response;
  };
}

module.exports = joinEndPoints;
