const {
  InvalidRequestError, UnsupportedTypeError, UnauthorizedClientError,
} = require('../../../error');
const errorPool = require('../../../error/pool');

const dataAccessorPool = require('../../../data-accessor/pool');
const DataAccessorType = require('../../../data-accessor/type');

const validateType = require('../../../validate/validate-type');
const validateRequired = require('../../../validate/validate-required');

const AccessTokenGrantType = require('../../../type/grant-type');
const TokenSubjectType = require('../../../token/subject-type');
const decodingAndUseToken = require('../../../token/decoding-and-use-token');

const getResponseScope = require('../scope/get-response-scope');

async function validateAndGetCode(request) {
  // eslint-disable-next-line max-len
  validateType(request.grantType, AccessTokenGrantType.AUTHORIZATION_CODE, errorPool.get(UnsupportedTypeError));

  const clientDataAccessor = dataAccessorPool.get(DataAccessorType.CLIENT);
  const client = await clientDataAccessor.findById(request.clientId);

  // eslint-disable-next-line max-len
  if (!client || request.clientSecret !== client.secret) throw errorPool.get(UnauthorizedClientError);

  validateRequired(request.code, errorPool.get(InvalidRequestError));

  // eslint-disable-next-line no-return-await
  return await decodingAndUseToken(request.code, {
    sub: TokenSubjectType.AUTHORIZATION_CODE,
    clientId: request.clientId,
    requestScope: getResponseScope(client.type),
  });
}

module.exports = validateAndGetCode;
