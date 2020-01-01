const jwt = require('jsonwebtoken');
const { InvalidToken } = require('../error/errors');

function decodingToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    throw InvalidToken.create();
  }
}

module.exports = decodingToken;
