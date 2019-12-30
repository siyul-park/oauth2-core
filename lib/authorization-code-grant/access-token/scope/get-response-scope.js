const { ServerError } = require('../../../error');

const errorPool = require('../../../error/pool');
const ScopeType = require('../../../scope/type');
const scopePool = require('../../../scope/pool');

const ClientType = require('../../../client/client-type');

function getResponseScope(clientType) {
  // eslint-disable-next-line max-len
  if (clientType === ClientType.CONFIDENTIAL) return scopePool.get(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_ACCESS_TOKEN.RESPONSE.CONFIDENTIAL_CLIENT);
  // eslint-disable-next-line max-len
  if (clientType === ClientType.PUBLIC) return scopePool.get(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_ACCESS_TOKEN.RESPONSE.PUBLIC_CLIENT);

  return errorPool.get(ServerError);
}

module.exports = getResponseScope;
