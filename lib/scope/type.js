const Type = Object.freeze({
  AUTHORIZATION_CODE_GRAND: {
    GENERATE_AUTHORIZATION_CAN_RESPONSE: Symbol('authorization code grand authorization response'),
    GENERATE_AUTHORIZATION_BY_TOKEN_REQUIRE: Symbol('authorization code grand authorization require'),
    GENERATE_ACCESS_TOKEN_REQUIRE: Symbol('authorization code grand generate access token require'),
  },
});

module.exports = Type;
