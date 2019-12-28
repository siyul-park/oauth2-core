const InvalidScope = require('../error/invalid-scope');

const errorPool = require('../error/pool');
const scopePool = require('../scope/pool');

function validateScope(type, scopes) {
  const allScopes = scopePool.get(type);

  if (!scopes.every((scope) => allScopes.has(scope))) throw errorPool.get(InvalidScope);
}

module.exports = validateScope;
