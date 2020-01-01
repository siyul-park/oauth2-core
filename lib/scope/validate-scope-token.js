const { InvalidScope } = require('../error/errors');

function validateScopeToken(parentScopeToken = new Set(), childScopeToken) {
  if (parentScopeToken.size === 0 && childScopeToken === 0) return;

  // eslint-disable-next-line no-restricted-syntax
  for (const value of parentScopeToken.values()) {
    if (!parentScopeToken.has(value)) throw InvalidScope.create();
  }
}

module.exports = validateScopeToken;
