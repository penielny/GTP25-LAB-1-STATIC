
/**
 * @jest-environment jsdom
 */

const { describe } = require('node:test');
const { countCharacter, countSentence, countWord, getUniqueChars, letterDensity, padValue, readingTime } = require('./../util');

describe('Character Utility Functions', () => {

    describe('Character Count', () => {

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

        describe('edge cases', () => {

            it('handles empty strings', () => {
                expect(countCharacter('', false)).toBe(0);
                expect(countCharacter('', true)).toBe(0);
            });

            it('counts special characters correctly', () => {
                expect(countCharacter('@!$&*', false)).toBe(5);
                // exclude space
                expect(countCharacter('() ^#*', true)).toBe(5);
            });

            it('handles multiline strings', () => {
                expect(countCharacter('line1\nline2', false)).toBe(11);
                expect(countCharacter('line1\nline2', true)).toBe(11);
            });
        });
    });

    describe("Sentence Count", () => {

        it('return the number of sentences in a text', () => {
            const veryLongSentence = "Using const in tests is like putting a seatbelt on your variables. it prevents bugs from accidental reassignment. So yeah, prefer const unless you have a good reason not to."
            expect(countSentence(veryLongSentence)).toBe(3)
        })

        it('return zero for empty string', () => {
            const veryLongSentence = ""
            expect(countSentence(veryLongSentence)).toBe(0)
        });
        

    })

    describe("Count Words", () => {

        it('counting all available words in a text', () => {
            const testText = "Typing in an input field triggers a real-time update of the character count below it. This helps users stay within limits, like when composing a tweet or filling out a form with a maximum length. Accurate feedback is important for user experience and accessibility.";
            expect(countWord(testText)).toBe(44)
        })

    })

    describe("Unique Characters", () => {

        it('returns a list of all unique character in lowercase', () => {
            const testText = "Typing in an input field triggers a real-time update.";
            const expectValue = ['a', 'd', 'e', 'f', 'g', 'i', 'l', 'm', 'n', 'p', 'r', 's', 't', 'u', 'y'].sort()
            expect(getUniqueChars(testText).sort()).toEqual(expectValue)
        })

    })

    describe("Letter Density", () => {

        const testText = "Typing in an input";

        describe("Geting the letter density data for specific char", () => {

            it('return the letter density data for character t', () => {

                const expectedValue = { percentage: 11.11, total: 2 }
                // returns {percentage, total(frequency) }
                expect(letterDensity(testText, "t")).toEqual(expectedValue)

            })

            it('returns the letter density data for character i', () => {

                const expectedValue = { percentage: 16.67, total: 3 }
                // returns {percentage, total(frequency) }
                expect(letterDensity(testText, "i")).toEqual(expectedValue)

            })

            it('returns zero for empty text or empty char', () => {
                expect(letterDensity(testText,"")).toBe(0)
            });
        })


    })

    describe("Reading Time", () => {

        it('return time taking to read text', () => {
            // based on the function evry word takes 0.3 sec
            const readableText = "When comparing objects in JavaScript, you need to consider how objects are compared. By default, JavaScript objects are reference types, so they are compared by reference, not by their actual values."
            const timeTaken = (((countWord(readableText) * 0.3) / 60).toFixed(2) < 1.0) ? "< 1" : ((countWord(readableText) * 0.3)/60).toFixed(2)
            expect(readingTime(readableText)).toBe(timeTaken)
        });

        it('returns "< 1" for very short text', () => {
            const shortText = "Hello world";
            expect(readingTime(shortText)).toBe("< 1");
        });

        it('returns reading time over 1 minute for long text', () => {
            const longText = "This is a sentence that will be repeated multiple times to ensure we have enough words. ".repeat(200);
            const timeTaken = (((countWord(longText) * 0.3) / 60).toFixed(2) < 1.0) ? "< 1" : ((countWord(longText) * 0.3)/60).toFixed(2)
            expect(readingTime(longText)).toBe(timeTaken)
        });
        
        

    })

    describe("Padding Value", () => {

        it('returns the padded value as a string', () => {
            expect(padValue(5)).toBe("05");
        });
    
        it('returns the padded value for a two-digit number', () => {
            expect(padValue(15)).toBe("15");
        });
    
        it('pads strings properly', () => {
            expect(padValue("7")).toBe("07");
        });
    
    });
    

})


describe("Mock UI Interactions", () => {

    let refs;

    beforeEach(() => {
        // mock html
        document.body.innerHTML = `
            <textarea id="text_input"></textarea>
            <p id="notification"></p>
            <div>
                <input type="checkbox" id="exclude_spaces" /> 
                <label for="exclude_spaces">Exclude spaces</label>
            </div>
            <div>
                <input type="number" id="char_limit" value="10" />
            </div>
            <div>
                <p>Character count : <span id="char_count">0</span></p>
                <p>Word count : <span id="word_count">0</span></p>
                <p>Sentence count : <span id="sentence_count">0</span></p>
                <p>Read time : <span id="read_time">0</span> min</p>
            </div>
        `;

        refs = {
            textarea: document.getElementById("text_input"),
            charLimit: document.getElementById("char_limit"),
            notification: document.getElementById("notification"),
            charCount: document.getElementById("char_count"),
            wordCount: document.getElementById("word_count"),
            sentenceCount: document.getElementById("sentence_count"),
            readTime: document.getElementById("read_time"),
            excludeSpace: document.getElementById("exclude_spaces"),
        };
    });


    function updateUI() {
        const { textarea, excludeSpace, charLimit, sentenceCount, charCount, wordCount, readTime } = refs;
        // get text area value 
        let textValue = textarea.value;

        // get excude space value
        const isExcludeSpaces = Boolean(excludeSpace.checked)
        // verify limit
        const charLimitValue = parseInt(charLimit.value, 10)
        // make updates to the ui

        console.log(textValue, "textValue")
        // check if limit is reached consider space exclude toggle
        if (isExcludeSpaces ? textValue.replace(/ /g, "").length : textValue.length > parseInt(charLimitValue)) {
            notification.textContent = "you have exceed the set number of characters allowed"
        } else {
            notification.textContent = ""
        }


        // update count markup
        charCount.textContent = padValue(countCharacter(textValue, isExcludeSpaces))
        sentenceCount.textContent = padValue(countSentence(textValue))
        wordCount.textContent = padValue(countWord(textValue))
        readTime.textContent = readingTime(textValue)

    }


    describe("Character count", () => {

        it("Counts characters without space exclusion", () => {
            const { textarea, charCount } = refs;
            const text = "Hello"
            textarea.value = text

            textarea.dispatchEvent(new Event("input"))

            // update the html
            updateUI()

            expect(charCount.textContent).toBe("05")
        })

        it("Counts characters without space exclusion but text contains space", () => {
            const { textarea, charCount } = refs;
            const text = "Hello Jennef"
            textarea.value = text

            textarea.dispatchEvent(new Event("input"))

            // update the html
            updateUI()

            expect(charCount.textContent).toBe("12")
        })

        it('Counts character with space exclusion', () => {
            const { textarea, charCount, excludeSpace } = refs;

            const text = "hello welcome to the crash course"
            textarea.value = text

            textarea.dispatchEvent(new Event("input"))

            excludeSpace.checked = true

            excludeSpace.dispatchEvent(new Event("change"))

            updateUI()

            expect(charCount.textContent).toBe("28")

        });

    })


    describe("word count", () => {

        it('Counts number of words in a given text', () => {
            const { textarea, wordCount } = refs;

            const text = "How many words can you find in this text";

            textarea.value = text

            textarea.dispatchEvent(new Event("input"))

            updateUI()

            expect(wordCount.textContent).toBe("09")

        });

    })


    describe("read time", () => {

        it('return the minutes it take to read the given text', () => {
            const { textarea, readTime } = refs;

            const text = "how long will it take you to read this text if every word takes 0.3 seconds?"

            textarea.value = text

            textarea.dispatchEvent(new Event("input"))

            updateUI()

            const expectedValue = (((countWord(textarea.textContent) * 0.3) / 60).toFixed(2) < 1.0) ? "< 1" : `${(countWord(textarea.textContent) * 0.3).toFixed(2)}`

            expect(readTime.textContent).toBe(expectedValue)


        });

    })

    describe("Sentence count", () => {

        it('returns the number of sentence found in the text', () => {
            const { textarea, sentenceCount } = refs;
            const text = "The quick brown fox jumps over the lazy dog. This sentence is often used to test fonts and keyboard layouts because it contains every letter in the English alphabet. However, it's not the only pangram out there. Developers and designers often use similar phrases for quick previews. Beyond that, text samples like these can be useful when testing input fields, especially in real-time applications. They help expose edge cases, such as handling whitespace or exceeding character limits. Whether you're building a blog editor, a chat app, or a tweet composer, this kind of test input is essential."
            textarea.value = text

            textarea.dispatchEvent(new Event("input"))

            updateUI()

            expect(sentenceCount.textContent).toEqual("07")

        });


    })


    describe("Character Limit warnning", () => {

        it('Displays warning it length is exceeded', () => {

            const { textarea, charLimit, notification } = refs;

            let text = "hey i'm hoping this is more than 10 else this test will fail"

            charLimit.value = 10

            charLimit.dispatchEvent(new Event("input"))

            textarea.value = text

            textarea.dispatchEvent(new Event("input"))

            updateUI()

            expect(notification.textContent).toBe("you have exceed the set number of characters allowed")

        });

        it('removes warning it length is not exceeded', () => {

            const { textarea, charLimit, notification } = refs;

            let text = "hey i'm"

            charLimit.value = 10

            charLimit.dispatchEvent(new Event("input"))

            textarea.value = text

            textarea.dispatchEvent(new Event("input"))

            updateUI()

            expect(notification.textContent).toBe("")

        });


    })

})