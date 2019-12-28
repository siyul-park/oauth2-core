const scopePool = require('../scope/pool');

function validateScope(type, scopes, error) {
  const allScopes = scopePool.get(type);

  if (!scopes.every((scope) => allScopes.has(scope))) throw error;
}

module.exports = validateScope;
