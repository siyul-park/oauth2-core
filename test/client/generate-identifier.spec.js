const generateIdentifier = require('../../lib/client/generate/generate-identifier');

const setUp = require('../set-up');

// eslint-disable-next-line no-undef
describe('Client', () => {
  // eslint-disable-next-line no-undef
  beforeAll(() => {
    setUp();
  });

  // eslint-disable-next-line no-undef
  describe('Identifier', () => {
    // eslint-disable-next-line no-undef
    test('Generate Identifier', () => {
      const id = generateIdentifier();

      // eslint-disable-next-line no-undef
      expect(id).toHaveLength(32);
      // eslint-disable-next-line no-undef
      expect(id).toEqual(expect.stringMatching(/[a-z0-9]+/));
    });

    // eslint-disable-next-line no-undef
    test('Generate Identifier And Check Create Others', () => {
      const repeatTime = 10000;

      const ids = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < repeatTime; i++) {
        const id = generateIdentifier();

        // eslint-disable-next-line no-undef
        expect(
          ids.every((createdId) => createdId !== id),
        ).toBeTruthy();

        ids.push(id);
      }
    });
  });
});
