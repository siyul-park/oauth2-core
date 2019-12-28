const config = {
  timeLength: 8,
  jwtSecret: undefined,
};

function get(key) {
  return config[key];
}

function set(key, value) {
  config[key] = value;
}

module.exports = { get, set };
