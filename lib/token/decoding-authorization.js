function decodingAuthorization(authorization = '', type = '') {
  const tokens = authorization.split(' ');

  if (tokens.length !== 2) return;
  if (tokens[0].toLowerCase() !== type.toLowerCase()) return;

  const [id, secret] = atob(tokens[1]).split(':');

  // eslint-disable-next-line consistent-return
  return { id, secret };
}

module.exports = decodingAuthorization;
