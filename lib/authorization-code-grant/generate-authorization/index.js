const generateAuthorization = require('./generate-authorization');

const responseScope = require('./response-scope');
const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.AUTHORIZATION_RESPONSE, responseScope);

module.exports = generateAuthorization;
