function validateRedirectUri(redirectUri, requestRedirectUri, error) {
  if (requestRedirectUri && redirectUri !== requestRedirectUri) throw error;
}

module.exports = validateRedirectUri;
