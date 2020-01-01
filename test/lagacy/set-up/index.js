const MockRegister = require('../mock/register');
const TokenRegister = require('../token/register');

function setUp() {
  MockRegister();
  TokenRegister();
}

module.exports = setUp;
