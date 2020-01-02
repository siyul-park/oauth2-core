const MethodNotAllow = require('../../error/method-not-allow');
const Response = require('../response/response');
const isMethodAllowed = require('../request/is-method-allowed');
const getRedirectUri = require('../redirect-uri/get-redirect-uri');
const createResponseByError = require('../response/create-response-by-error');

const globalDefaultOptions = require('./default-options');
const defaultValidations = require('./default-validations');

const combineOptions = require('../../option/combine-options');

function createEndPoint(
  method,
  status,
  endPointFunction,
  validations,
  defaultOptions = undefined,
) {
  const assignedValidations = { ...defaultValidations, ...validations };
  const localDefaultOptions = combineOptions(globalDefaultOptions, defaultOptions);

  async function validate(request) {
    if (!isMethodAllowed(request.method, method)) throw new MethodNotAllow();

    if (typeof assignedValidations.headers === 'function') await assignedValidations.headers(request.headers);
    if (typeof assignedValidations.query === 'function') await assignedValidations.query(request.query);
    if (typeof assignedValidations.body === 'function') await assignedValidations.body(request.body);
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
    const assignedOptions = { ...localDefaultOptions, ...options, method };

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
