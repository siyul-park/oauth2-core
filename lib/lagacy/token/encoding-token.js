const jwt = require('jsonwebtoken');
const config = require('../config');

function encodingToken(token) {
  const secret = config.get('jwtSecret');

  const payload = { ...token };
  return jwt.sign(payload, secret, { algorithm: 'HS256' });
}

module.exports = encodingToken;
