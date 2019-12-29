const Type = Object.freeze({
  AUTHORIZATION_CODE_GRAND: {
    AUTHORIZATION_RESPONSE: Symbol('generate-authorization code grand generate-authorization response'),
    GENERATE_ACCESS_TOKEN_REQUIRE: Symbol('generate-authorization code grand generate access token require'),
  },
});

module.exports = Type;
