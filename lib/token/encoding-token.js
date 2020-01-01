const jwt = require('jsonwebtoken');

function encodingToken(token, secret) {
  const payload = { ...token };
  return jwt.sign(payload, secret, { algorithm: 'HS256' });
}

module.exports = encodingToken;
