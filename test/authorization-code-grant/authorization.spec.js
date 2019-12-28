const AuthorizationRequest = require('../../lib/request/authorization-request');
const responseType = require('../../lib/request/response-type');

const validate = require('../../lib/authorization-code-grant/authorization/validate');

// eslint-disable-next-line no-undef
describe('Authorization Code Grant', () => {
  // eslint-disable-next-line no-undef
  describe('Authorization Request', () => {
    // eslint-disable-next-line no-undef
    test('Validation Authorization Request Success', () => {
      const request = new AuthorizationRequest({ responseType: responseType.CODE, clientId: '' });

      validate(request);
    });
  });
});
