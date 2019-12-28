function getConfig(key) {
  // eslint-disable-next-line global-require
  return require('./config')[key];
}

module.exports = getConfig;
