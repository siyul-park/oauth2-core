function getRedirectUri(request, response) {
  const requestParams = { ...request.headers, ...request.query, ...request.body };

  if (!!requestParams.redirect_uri
    && (!response.body || (!!response.body && response.body.error !== 'invalid_redirect_url'))) {
    return requestParams.redirect_uri;
  }

  return null;
}

module.exports = getRedirectUri;
