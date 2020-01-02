const getScopeToken = require('./get-scope-token');
const validateScopeToken = require('./validate-scope-token');

function validateScope(parentScope, childScope) {
  const parentScopeToken = getScopeToken(parentScope);
  const childScopeToken = getScopeToken(childScope);
  validateScopeToken(parentScopeToken, childScopeToken);
}

module.exports = validateScope;
