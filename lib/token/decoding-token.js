const jwt = require('jsonwebtoken');
const config = require('../config');

function decodingToken(token, error) {
  try {
    const secret = config.get('jwtSecret');

    return jwt.verify(token, secret);
  } catch (e) {
    throw error;
  }
}

module.exports = decodingToken;
