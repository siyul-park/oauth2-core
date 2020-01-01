const accessTokenGenerator = require('../../../lib/lagacy/authorization-code-grant/access-token');
const AccessTokenRequest = require('../../../lib/lagacy/request/generate-access-token-request');
const AccessTokenGrantType = require('../../../lib/lagacy/type/grant-type');

const ClientType = require('../../../lib/lagacy/client/type');

const { ServerError } = require('../../../lib/lagacy/error');
const errorPool = require('../../../lib/lagacy/error/pool');

async function generateAccessToken({ authorization, client }) {
  if (client.type === ClientType.CONFIDENTIAL) {
    // eslint-disable-next-line no-return-await
    return await accessTokenGenerator.generate(
      new AccessTokenRequest({
        grantType: AccessTokenGrantType.AUTHORIZATION_CODE,
        code: authorization.code,
        clientId: client.id,
        clientSecret: client.secret,
      }),
    );
  } if (client.type === ClientType.PUBLIC) {
    // eslint-disable-next-line no-return-await
    return await accessTokenGenerator.generate(
      new AccessTokenRequest({
        grantType: AccessTokenGrantType.AUTHORIZATION_CODE,
        code: authorization.code,
        clientId: client.id,
      }),
    );
  }

  throw errorPool.get(ServerError);
}

module.exports = generateAccessToken;
