const generatePublicClient = require('../../lib/client/generate/generate-public-client');

const setUp = require('../set-up');

const ClientType = require('../../lib/client/client-type');

// eslint-disable-next-line no-undef
describe('Client', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    setUp();
  });

  // eslint-disable-next-line no-undef
  describe('Public Client', () => {
    // eslint-disable-next-line no-undef
    test('Generate Public Client', async () => {
      const client = await generatePublicClient();

      // eslint-disable-next-line no-undef
      expect(client.id).toHaveLength(32);
      // eslint-disable-next-line no-undef
      expect(client.id).toEqual(expect.stringMatching(/[a-z0-9]+/));

      // eslint-disable-next-line no-undef
      expect(client.secret).toEqual(null);

      // eslint-disable-next-line no-undef
      expect(client.type).toEqual(ClientType.PUBLIC);
    });

    // eslint-disable-next-line no-undef
    test('Generate Public Client And Check Create Others', async () => {
      const repeatTime = 10000;

      const clients = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < repeatTime; i++) {
        // eslint-disable-next-line no-await-in-loop
        const client = await generatePublicClient();

        // eslint-disable-next-line no-undef
        expect(
          // eslint-disable-next-line max-len
          clients.every((createdClient) => createdClient.id !== client.id),
        ).toBeTruthy();

        clients.push(client);
      }
    });
  });
});
