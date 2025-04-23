const { countCharacter, countSentence, countWord, getUniqueChars, letterDensity, padValue, readingTime } = require('./../util');

describe('Character Utility Functions', () => {

    describe('countCharacter', () => {
        describe('when excluding spaces', () => {
            it('returns correct length without spaces', () => {
                expect(countCharacter('Hello World', true)).toBe(10);
                expect(countCharacter('   ', true)).toBe(0);
                expect(countCharacter('  a b  ', true)).toBe(2);
            });
        });

        describe('when including spaces', () => {
            it('returns correct length with spaces', () => {
                expect(countCharacter('Hello World', false)).toBe(11);
                expect(countCharacter('   ', false)).toBe(3);
                expect(countCharacter('  a b  ', false)).toBe(7);
            });
        });
    });


})