const config = {
  clientIdentifierTimeLength: 8,
  tokenIdentifierTimeLength: 4,

  jwtSecret: undefined,
  authorizationCodeExpirationPeriod: 60 * 1000,
};

function get(key) {
  return config[key];
}

function set(key, value) {
  config[key] = value;
}

module.exports = { get, set };
