const generateConfidentialClient = require('../../lib/client/generate/generate-confidential-client');

// eslint-disable-next-line no-undef
describe('Client', () => {
  // eslint-disable-next-line no-undef
  describe('Confidential Client', () => {
    // eslint-disable-next-line no-undef
    test('Generate Confidential Client', () => {
      const client = generateConfidentialClient();

      // eslint-disable-next-line no-undef
      expect(client.identifier).toHaveLength(32);
      // eslint-disable-next-line no-undef
      expect(client.identifier).toEqual(expect.stringMatching(/[a-z0-9]+/));

      // eslint-disable-next-line no-undef
      expect(client.secret).toHaveLength(32);
      // eslint-disable-next-line no-undef
      expect(client.secret).toEqual(expect.stringMatching(/[a-z0-9]+/));
    });

    // eslint-disable-next-line no-undef
    test('Generate Confidential Client And Check Create Others', () => {
      const repeatTime = 10000;

      const clients = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < repeatTime; i++) {
        const client = generateConfidentialClient();

        // eslint-disable-next-line no-undef
        expect(
          // eslint-disable-next-line max-len
          clients.every((createdClient) => createdClient.identifier !== client.identifier && createdClient.secret !== client.secret),
        ).toBeTruthy();

        clients.push(client);
      }
    });
  });
});
