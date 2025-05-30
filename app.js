/* Declearation of Refs */
const excludeSpaceToggle = document.getElementById('exclude_spaces')
const setCharacterLimitToggle = document.getElementById('char_limit')
const characterLimitInput = document.getElementById('set-limit-input')
const characterLimitInputContainer = document.getElementById('set-limit-input-container')

const errorLabelContainer = document.getElementById('char_limit_error_lable_container')
const charLimitLabel = document.getElementById('char_limit_label')

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
let limitValue = 10;
let textAreaFocus = false;


/* silently initialize an initail value for char limit to avoid 0 char limit. */
characterLimitInput.value = limitValue

/* listeners & Implimentations */

excludeSpaceToggle.addEventListener("change", (e) => {
    isExcludeSpace = Boolean(e.target.checked)
    totalCharacterCountRef.textContent = padValue(countCharacter(textAreaRef.value, isExcludeSpace))

})

textAreaRef.addEventListener("input", (e) => {
    let textValue = e.target.value
    if (isLimitState && e.target.value.length >= limitValue) {
        e.target.value = e.target.value.slice(0, limitValue);
        textValue = e.target.value
    }
    updatePageValues(textValue)
})

showMoreButtonRef.addEventListener("click", (e) => {
    showMoreButton = !showMoreButton
    updatePageValues(textAreaRef.value)
})

setCharacterLimitToggle.addEventListener('click', (e) => {
    isLimitState = Boolean(e.target.checked)

    if (isLimitState && textAreaRef.value.length > limitValue) {
        textAreaRef.value = textAreaRef.value.slice(0, limitValue);
    }

    updateSetLimitInputUi(textAreaRef.value)
    updatePageValues(textAreaRef.value)
})

characterLimitInput.addEventListener('input', (e) => {
    limitValue = parseInt(e.target.value, 10)
    if (isLimitState && textAreaRef.value.length > limitValue) {
        textAreaRef.value = textAreaRef.value.slice(0, limitValue);
    }

    updateTextAreaUiState(textAreaRef.value);
})


textAreaRef.addEventListener("focus", () => {
    textAreaFocus = true
    updateTextAreaUiState(textAreaRef.value)

});

textAreaRef.addEventListener("blur", () => {
    textAreaFocus = false
    updateTextAreaUiState(textAreaRef.value)
});



/* logic functions */

function updateTextAreaUiState(text) {

    const hasReachedLimit = isLimitState && text.length >= limitValue;

    if (hasReachedLimit && isLimitState) {
        if (errorLabelContainer.classList.contains('hidden')) {
            errorLabelContainer.classList.remove('hidden')
        }
        charLimitLabel.textContent = limitValue
    } else {
        if (!errorLabelContainer.classList.contains('hidden')) {
            errorLabelContainer.classList.add('hidden')
        }
    }

    if (textAreaFocus) {

        textAreaRef.style.boxShadow = hasReachedLimit
            ? "0 0 4px 1px #DA3701"
            : "0 0 4px 1px #C27CF8";
    } else {
        textAreaRef.style.boxShadow = hasReachedLimit
            ? "0 0 4px 1px #DA3701"
            : "none";
    }
}



function updateSetLimitInputUi() {

    if (isLimitState) {
        if (characterLimitInputContainer.classList.contains('hidden')) {
            characterLimitInputContainer.classList.remove('hidden')
        }
    } else {
        if (!characterLimitInputContainer.classList.contains('hidden')) {
            characterLimitInputContainer.classList.add('hidden')
        }
    }

}

function updatePageValues(text) {

    updateTextAreaUiState(text)
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

    let _density_data = []

    uniqueCharacters.forEach(char => {
        const { total, percentage } = letterDensity(text, char)
        _density_data.push({ total, percentage, char })
    })

    _density_data.sort((a, b) => b.total - a.total);

    /* list recreation/refresh */
    letterDensityContainerRef.innerHTML = ``;
    _density_data.slice(0, showMoreButton ? _density_data.length : 6).forEach(data => {
        const { total, percentage, char } = data
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
