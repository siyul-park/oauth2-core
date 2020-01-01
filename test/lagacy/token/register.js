const config = require('../../../lib/lagacy/config');

function register() {
  config.set('jwtSecret', 'TeSt1234567');
}

module.exports = register;
