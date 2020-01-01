const jwt = require('jsonwebtoken');
const config = require('../config');

function decodingToken(token, error) {
  try {
    const secret = config.get('jwtSecret');

    return jwt.verify(token, secret);
  } catch (e) {
    // eslint-disable-next-line no-throw-literal
    throw { ...error, ...e };
  }
}

module.exports = decodingToken;
