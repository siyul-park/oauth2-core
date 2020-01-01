const { InvalidRedirectUri } = require('../../error/errors');

function validateRedirectUri(redirectUri, requestRedirectUri) {
  if (!!requestRedirectUri && typeof redirectUri === 'string') {
    if (redirectUri !== requestRedirectUri) throw InvalidRedirectUri.create();
  } else if (!!requestRedirectUri && redirectUri instanceof Array) {
    if (!redirectUri.every((uri) => redirectUri !== uri)) throw InvalidRedirectUri.create();
  }
}

module.exports = validateRedirectUri;
