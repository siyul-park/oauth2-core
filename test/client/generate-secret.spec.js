const generateSecrete = require('../../lib/client/generate/secret');

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
    test('Generate Secrete', () => {
      const secrete = generateSecrete();

      // eslint-disable-next-line no-undef
      expect(secrete).toHaveLength(32);
      // eslint-disable-next-line no-undef
      expect(secrete).toEqual(expect.stringMatching(/[a-z0-9]+/));
    });

    // eslint-disable-next-line no-undef
    test('Generate Secrete And Check Create Others', () => {
      const repeatTime = 10000;

      const secretes = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < repeatTime; i++) {
        const secrete = generateSecrete();

        // eslint-disable-next-line no-undef
        expect(
          secretes.every((createdSecrete) => createdSecrete !== secrete),
        ).toBeTruthy();

        secretes.push(secrete);
      }
    });
  });
});
