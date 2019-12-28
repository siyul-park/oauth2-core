const generateIdentifier = require('../../lib/client/generate/generate-identifier');

const register = require('./mock/register-client-data-accessor');

// eslint-disable-next-line no-undef
describe('Client', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    register();
  });

  // eslint-disable-next-line no-undef
  describe('Identifier', () => {
    // eslint-disable-next-line no-undef
    test('Generate Identifier', () => {
      const identifier = generateIdentifier();

      // eslint-disable-next-line no-undef
      expect(identifier).toHaveLength(32);
      // eslint-disable-next-line no-undef
      expect(identifier).toEqual(expect.stringMatching(/[a-z0-9]+/));
    });

    // eslint-disable-next-line no-undef
    test('Generate Identifier And Check Create Others', () => {
      const repeatTime = 10000;

      const identifiers = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < repeatTime; i++) {
        const identifier = generateIdentifier();

        // eslint-disable-next-line no-undef
        expect(
          identifiers.every((createdIdentifier) => createdIdentifier !== identifier),
        ).toBeTruthy();

        identifiers.push(identifier);
      }
    });
  });
});
