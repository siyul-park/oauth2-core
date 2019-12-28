const clientRegister = require('../client/mock/register-client-data-accessor');
const TokenRegister = require('../token/register');

function setUp() {
  clientRegister();
  TokenRegister();
}

module.exports = setUp;
