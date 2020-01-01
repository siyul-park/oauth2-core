const Type = Object.freeze({
  AUTHORIZATION_CODE_GRAND: {
    GENERATE_AUTHORIZATION: {
      RESPONSE: Symbol('authorization code grand authorization response'),
      REQUIRE: Symbol('authorization code grand authorization require'),
    },
    GENERATE_ACCESS_TOKEN: {
      REQUIRE: Symbol('authorization code grand generate access token require'),
      RESPONSE: {
        PUBLIC_CLIENT: Symbol('authorization code grand generate access token by public client response'),
        CONFIDENTIAL_CLIENT: Symbol('authorization code grand generate access token by confidential client response'),
      },
    },
  },
});

module.exports = Type;
