function getScopeToken(scope = '') {
  if (scope instanceof Set) return scope;
  if (!(scope instanceof Array) && typeof scope !== 'string') return new Set();
  if (scope instanceof Array) return new Set(scope);
  if (scope === '') return new Set();

  return new Set(scope.split(' '));
}

module.exports = getScopeToken;
