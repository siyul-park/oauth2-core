const { InvalidRedirectUri } = require('../../error/errors');

function validateRedirectUri(redirectUri, requestRedirectUri) {
  if (requestRedirectUri && redirectUri !== requestRedirectUri) throw InvalidRedirectUri.create();
}

module.exports = validateRedirectUri;
