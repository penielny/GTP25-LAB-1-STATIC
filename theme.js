let theme = "light";
const moonIconRef = document.getElementById("moon_icon");
const sunIconref = document.getElementById("sun_icon");
const themeToggleButton = document.getElementById("themeToggle");
const bodyRef = document.getElementById("main_body");

const lightIconRef = document.getElementById("light_icon");
const darkIconRef = document.getElementById("dark_icon");

const heroTextRef = document.getElementById("heroText");
const textAreaRef = document.getElementById("textArea");

const allParagraphTextRef = document.getElementsByTagName("p")
const allInputLabelRef = document.getElementsByTagName("label")

const letterDensityTitleRef = document.getElementById("letterDensityTitle")
const showMoreButtonRef = document.getElementById("showMoreButton")

const progressBarRef = document.getElementsByClassName("progress")

themeToggleButton.addEventListener("click", () => {

  sunIconref.classList.toggle("hidden");
  moonIconRef.classList.toggle("hidden");

  if (theme === "light") {
    theme = "dark";
    bodyRef.classList.remove('light_bg');
    bodyRef.classList.add('dark_bg');

    themeToggleButton.classList.add("bg-[var(--color-neutral-700)]")
    themeToggleButton.classList.remove("bg-[var(--color-neutral-100)]")

    lightIconRef.classList.toggle("hidden");
    darkIconRef.classList.toggle("hidden");

    heroTextRef.classList.add("text-[var(--color-neutral-100)]")
    heroTextRef.classList.remove("text-[var(--color-neutral-900)]")

    for (let p of allParagraphTextRef) {
      p.classList.add("text-[var(--color-neutral-100)]");
      p.classList.remove("text-[var(--color-neutral-900)]");
    }

    for (let l of allInputLabelRef) {
      l.classList.add("text-[var(--color-neutral-100)]");
      l.classList.remove("text-[var(--color-neutral-900)]");
    }

    for (let pbar of progressBarRef) {
      pbar.classList.add("bg-[var(--color-neutral-800)]");
      pbar.classList.remove("bg-[var(--color-neutral-100)]");
    }

    textAreaRef.classList.add("bg-[var(--color-neutral-700)]")
    textAreaRef.classList.remove("bg-[var(--color-neutral-100)]")

    textAreaRef.classList.add("text-[var(--color-neutral-200)]")
    textAreaRef.classList.remove("text-[var(--color-neutral-700)]")

    textAreaRef.classList.remove("border-[var(--color-neutral-200)]")
    textAreaRef.classList.add("border-[var(--color-neutral-700)]")

    letterDensityTitleRef.classList.add("text-[var(--color-neutral-100)]")
    letterDensityTitleRef.classList.remove("text-[var(--color-neutral-900)]")

    showMoreButtonRef.classList.add("text-[var(--color-neutral-100)]")
    showMoreButtonRef.classList.remove("text-[var(--color-neutral-900)]")

  } else {
    theme = "light";
    bodyRef.classList.add('light_bg');
    bodyRef.classList.remove('dark_bg');

    themeToggleButton.classList.remove("bg-[var(--color-neutral-700)]")
    themeToggleButton.classList.add("bg-[var(--color-neutral-100)]")

    lightIconRef.classList.toggle("hidden");
    darkIconRef.classList.toggle("hidden");

    heroTextRef.classList.remove("text-[var(--color-neutral-100)]")
    heroTextRef.classList.add("text-[var(--color-neutral-900)]")

    for (let p of allParagraphTextRef) {
      p.classList.remove("text-[var(--color-neutral-100)]")
      p.classList.add("text-[var(--color-neutral-900)]")
    }
    for (let l of allInputLabelRef) {
      l.classList.remove("text-[var(--color-neutral-100)]")
      l.classList.add("text-[var(--color-neutral-900)]")
    }

    for (let pbar of progressBarRef) {
      pbar.classList.add("bg-[var(--color-neutral-100)]");
      pbar.classList.remove("bg-[var(--color-neutral-800)]");
    }

    textAreaRef.classList.add("bg-[var(--color-neutral-100)]")
    textAreaRef.classList.remove("bg-[var(--color-neutral-700)]")

    textAreaRef.classList.remove("text-[var(--color-neutral-200)]")
    textAreaRef.classList.add("text-[var(--color-neutral-700)]")

    textAreaRef.classList.add("border-[var(--color-neutral-200)]")
    textAreaRef.classList.remove("border-[var(--color-neutral-700)]")


    letterDensityTitleRef.classList.remove("text-[var(--color-neutral-100)]")
    letterDensityTitleRef.classList.add("text-[var(--color-neutral-900)]")

    showMoreButtonRef.classList.remove("text-[var(--color-neutral-100)]")
    showMoreButtonRef.classList.add("text-[var(--color-neutral-900)]")
  }
});