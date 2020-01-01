const { InvalidScope } = require('../error/errors');

function validateScopeToken(parentScopeToken, childScopeToken) {
  if (parentScopeToken.size === 0 && childScopeToken === 0) return;

  // eslint-disable-next-line no-restricted-syntax
  for (const value of childScopeToken.values()) {
    if (!parentScopeToken.has(value)) throw InvalidScope.create();
  }
}

module.exports = validateScopeToken;
