/* Declearation of Refs */
const excludeSpaceToggle = document.getElementById('exclude_spaces')
const setCharacterLimitToggle = document.getElementById('char_limit')
// const characterLimitInput = document.getElementById()

const totalCharacterCountRef = document.getElementById('total_char_count')
const totalWordCountRef = document.getElementById('total_word_count')
const totalSentenceCountRef = document.getElementById('sentence_count')
const readTimeRef = document.getElementById('read_time')
const letterDensityContainerRef = document.getElementById('letter_density_list')
const showMoreButtonLabelRef = document.getElementById('showMoreButtonLabel')
const showMoreIconRef = document.getElementById('showMoreIcon')
const noCharPlaceholderRef = document.getElementById('no_char_placeholder')

/* varaibeles */
let isExcludeSpace = false;
let showMoreButton = false;
let isLimitState = false;
/* listeners & Implimentations */

excludeSpaceToggle.addEventListener("change", (e) => {
    isExcludeSpace = Boolean(e.target.checked)
    totalCharacterCountRef.textContent = padValue(countCharacter(textAreaRef.value, isExcludeSpace))

})

textAreaRef.addEventListener("input", (e) => {
    let textValue = e.target.value
    updatePageValues(textValue)
})

showMoreButtonRef.addEventListener("click", (e) => {
    showMoreButton = !showMoreButton
    updatePageValues(textAreaRef.value)
})



/* logic functions */

function updatePageValues(text) {
    totalCharacterCountRef.textContent = padValue(countCharacter(text, isExcludeSpace))
    totalWordCountRef.textContent = padValue(countWord(text))
    totalSentenceCountRef.textContent = padValue(countSentence(text))
    readTimeRef.textContent = readingTime(text)

    if (text.trim("") == "") {
        if (!letterDensityContainerRef.classList.contains("hidden")) {
            letterDensityContainerRef.classList.add('hidden')
        }
        if (!showMoreButtonRef.classList.contains("hidden")) {
            showMoreButtonRef.classList.add('hidden')
            showMoreButton = false
        }

        if (noCharPlaceholderRef.classList.contains('hidden')) {
            noCharPlaceholderRef.classList.remove('hidden')
        }
    }

    let uniqueCharacters = getUniqueChars(text)

    if (uniqueCharacters.length) {

        /* hide no character found text */
        if (!noCharPlaceholderRef.classList.contains('hidden')) {
            noCharPlaceholderRef.classList.add('hidden')
        }

        if (letterDensityContainerRef.classList.contains("hidden")) {
            letterDensityContainerRef.classList.remove('hidden')
        }

        if (uniqueCharacters.length > 5) {
            if (showMoreButtonRef.classList.contains("hidden")) {
                showMoreButtonRef.classList.remove('hidden')
            }

            if (showMoreButton) {
                showMoreButtonLabelRef.textContent = "See less"
                if (!showMoreIconRef.classList.contains('rotate-180') && showMoreIconRef.classList.contains('rotate-0')) {
                    showMoreIconRef.classList.add('rotate-180')
                    showMoreIconRef.classList.remove('rotate-0')
                }
            } else {
                showMoreButtonLabelRef.textContent = "See more"
                if (showMoreIconRef.classList.contains('rotate-180') && !showMoreIconRef.classList.contains('rotate-0')) {
                    showMoreIconRef.classList.remove('rotate-180')
                    showMoreIconRef.classList.add('rotate-0')
                }
            }
        }
    }
    /* list recreation/refresh */
    letterDensityContainerRef.innerHTML = ``;
    uniqueCharacters.slice(0, showMoreButton ? uniqueCharacters.length : 6).forEach(char => {
        const { total, percentage } = letterDensity(text, char)
        let htmltemplate = `<li class="flex flex-row items-center space-x-5">

            <div class='w-6'>
              <p class='uppercase text-preset-4 text-[var(--color-neutral-900)]'>${char}</p>
            </div>

            <div class="flex-1 h-[12px] rounded-xl overflow-hidden bg-[var(--color-neutral-100)] progress">
              <div style="width: ${percentage}%" class="h-full bg-[var(--color-purple-400)] rounded-xl"></div>
            </div>
            <div class="flex flex-row items-center space-x-1">
              <p>${total}</p>
              <p>(${percentage}%)</p>
            </div>
          </li>`;

        let currentListHtml = letterDensityContainerRef.innerHTML

        letterDensityContainerRef.innerHTML = currentListHtml + htmltemplate

    });


}

/* convert single digit to double digit eg. 1 => 01 */
function padValue(value) {
    let newTextValue = value
    if (typeof (value) == "number") {
        newTextValue = value.toString()
    }
    return newTextValue.padStart(2, "0")
}

function countCharacter(text, excludeSpace) {
    let counter = 0;
    text.split("").forEach(element => {
        if (excludeSpace && element === " ") return;
        counter += 1;
    });
    return counter;
}


function countWord(text) {
    if (text.trim() === "") return 0;
    return text.trim().split(/\s+/).length;
}


function countSentence(text) {
    if (text.trim() === "") return 0;
    return text.split(/[.!?]+/).filter(sentence => sentence.trim() !== "").length;
}


function readingTime(text) {
    // 0.3 seconds per word
    let timeAsMin = ((parseFloat(countWord(text)) * 0.3) / 60).toFixed(2)


    if (timeAsMin < 1.0) {
        return '< 1'
    }

    return timeAsMin
}

function getUniqueChars(text) {
    return [...new Set(
        text
            .toLowerCase()
            .replace(/[^a-z]/g, '')
    )];
}

function letterDensity(text, char) {
    if (!text || !char) return 0;

    const normalizedText = text.toLowerCase();
    const targetChar = char.toLowerCase();
    const totalLength = normalizedText.length;

    // Count how many times the char appears
    let count = 0;
    for (let i = 0; i < totalLength; i++) {
        if (normalizedText[i] === targetChar) count++;
    }

    // Calculate percentage
    const percentage = (count / totalLength) * 100;

    return { total: count, percentage: Number(percentage.toFixed(2)) };
}




