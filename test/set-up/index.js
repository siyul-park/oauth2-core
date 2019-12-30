const clientRegister = require('../mock/register');
const TokenRegister = require('../token/register');

function setUp() {
  clientRegister();
  TokenRegister();
}

module.exports = setUp;
