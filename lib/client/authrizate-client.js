const { UnauthorizedClient } = require('../error/errors');

async function authorizeClient(client, secret, scope) {
  try {
    if (typeof client.authenticate === 'function') await client.authenticate(secret, scope);
  } catch (e) {
    if (e instanceof Error) throw e;
    throw UnauthorizedClient.create();
  }
}

module.exports = authorizeClient;
