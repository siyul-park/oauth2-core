function validateScope(parentScopes, childScopes, error) {
  if (typeof childScopes.every === 'function' && typeof parentScopes.has === 'function') {
    if (!childScopes.every((scope) => parentScopes.has(scope))) throw error;
  } else if (typeof childScopes.every === 'function') {
    if (childScopes.every((scope) => scope !== parentScopes)) throw error;
  } else if (typeof parentScopes.has === 'function') {
    if (!parentScopes.has(childScopes)) throw error;
  } else if (typeof parentScopes.every === 'function') {
    if (parentScopes.every((scope) => scope !== childScopes)) throw error;
  } else if (childScopes !== parentScopes) throw error;
}

module.exports = validateScope;
