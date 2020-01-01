function getScopeToken(scope = '') {
  if (scope === '') return [];
  return scope.split(' ');
}

module.exports = getScopeToken;
