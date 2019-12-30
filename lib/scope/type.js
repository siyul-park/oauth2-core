const Type = Object.freeze({
  AUTHORIZATION_CODE_GRAND: {
    AUTHORIZATION_RESPONSE: Symbol('authorization code grand authorization response'),
    GENERATE_ACCESS_TOKEN_REQUIRE: Symbol('authorization code grand generate access token require'),
  },
});

module.exports = Type;
