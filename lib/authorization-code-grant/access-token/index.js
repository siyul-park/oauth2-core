const requestScope = require('./require-scope');
const scopePool = require('../../scope/pool');
const ScopeType = require('../../scope/type');

scopePool.set(ScopeType.AUTHORIZATION_CODE_GRAND.GENERATE_ACCESS_TOKEN_REQUIRE, requestScope);
