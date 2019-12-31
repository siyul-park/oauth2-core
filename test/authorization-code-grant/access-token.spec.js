const setUp = require('../set-up');

const generateAccessToken = require('./generate-accesstoken');

const authorizationConfidential = require('./authorization-confidential');
const authorizationPublic = require('./authorization-public');

const { InvalidTokenError } = require('../../lib/error');
const errorPool = require('../../lib/error/pool');

// eslint-disable-next-line no-undef
describe('Authorization Code Grant', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    setUp();
  });

  // eslint-disable-next-line no-undef
  describe('Access Token Request', () => {
    // eslint-disable-next-line no-undef
    test('Access Token Request Success By Confidential', async () => {
      const authorization = await authorizationConfidential();
      const token = await generateAccessToken(authorization);

      // eslint-disable-next-line no-undef
      expect(token.accessToken).toEqual(expect.stringMatching(/[a-z0-9]+/));
      // eslint-disable-next-line no-undef
      expect(token.refreshToken).toEqual(expect.stringMatching(/[a-z0-9]+/));
    });

    // eslint-disable-next-line no-undef
    test('Access Token Request Success By Public', async () => {
      const authorization = await authorizationPublic();
      const token = await generateAccessToken(authorization);

      // eslint-disable-next-line no-undef
      expect(token.accessToken).toEqual(expect.stringMatching(/[a-z0-9]+/));
      // eslint-disable-next-line no-undef
      expect(token.refreshToken).toEqual(expect.stringMatching(/[a-z0-9]+/));
    });

    // eslint-disable-next-line no-undef
    test('Access Token Request Fail because code use twice', async () => {
      const authorization = await authorizationPublic();
      const token = await generateAccessToken(authorization);

      // eslint-disable-next-line no-undef
      expect.assertions(3);

      // eslint-disable-next-line no-undef
      expect(token.accessToken).toEqual(expect.stringMatching(/[a-z0-9]+/));
      // eslint-disable-next-line no-undef
      expect(token.refreshToken).toEqual(expect.stringMatching(/[a-z0-9]+/));

      try {
        await generateAccessToken(authorization);
        // eslint-disable-next-line no-undef
      } catch (e) {
        // eslint-disable-next-line no-undef
        expect(e).toEqual(errorPool.get(InvalidTokenError));
      }
    });
  });
});
