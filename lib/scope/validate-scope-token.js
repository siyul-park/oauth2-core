const { InvalidScope } = require('../error/errors');

function validateScopeToken(parentScopeToken = [], childScopeToken) {
  if (parentScopeToken === childScopeToken) return;
  if (parentScopeToken.length === 0 && childScopeToken.length === 0) return;

  if (typeof childScopeToken.every === 'function' && typeof parentScopeToken.has === 'function') {
    if (!childScopeToken.every((scope) => parentScopeToken.has(scope))) throw InvalidScope.create();
  } else if (typeof childScopeToken.every === 'function' || typeof parentScopeToken.every === 'function') {
    // eslint-disable-next-line max-len
    if (childScopeToken.every((scope) => !parentScopeToken.every((parentToken) => scope !== parentToken))) throw InvalidScope.create();
  } else if (typeof parentScopeToken.has === 'function') {
    if (!parentScopeToken.has(childScopeToken)) throw InvalidScope.create();
  } else if (typeof parentScopeToken.every === 'function') {
    if (parentScopeToken.every((scope) => scope !== childScopeToken)) throw InvalidScope.create();
  } else if (childScopeToken !== parentScopeToken) throw InvalidScope.create();
}

module.exports = validateScopeToken;
