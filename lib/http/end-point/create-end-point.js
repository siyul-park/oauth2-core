const MethodNotAllow = require('../../error/method-not-allow');
const Response = require('../response/response');
const isMethodAllowed = require('../request/is-method-allowed');
const getRedirectUri = require('../request/get-redirect-uri');
const createResponseByError = require('../response/create-response-by-error');

const defaultOptions = require('./default-options');
const defaultValidations = require('./default-validations');

function createEndPoint(
  method,
  status,
  endPointFunction,
  validations,
) {
  const assignedValidations = { ...defaultValidations, ...validations };

  async function validate(request) {
    if (!isMethodAllowed(request.method, method)) throw new MethodNotAllow();

    if (typeof assignedValidations.headers === 'function') await assignedValidations.headers();
    if (typeof assignedValidations.query === 'function') await assignedValidations.query();
    if (typeof assignedValidations.body === 'function') await assignedValidations.body();
  }

  async function runEndPointFunction(request, options) {
    const requestParams = { ...request.headers, ...request.query, ...request.body };

    try {
      await validate(request);

      // eslint-disable-next-line max-len
      const result = await endPointFunction(requestParams, options);
      return new Response({ status, body: result });
    } catch (e) {
      if (options.errorResponse) return createResponseByError(e, requestParams.state);
      throw e;
    }
  }

  // eslint-disable-next-line func-names
  async function endPoint(request, options) {
    const assignedOptions = { ...defaultOptions, ...options };

    const response = await runEndPointFunction(request, assignedOptions);

    const redirectUri = getRedirectUri(request, response);
    if (assignedOptions.redirect && !!redirectUri) {
      return response.redirect(redirectUri);
    }
    return response;
  }

  endPoint.method = method;

  return endPoint;
}

module.exports = createEndPoint;
