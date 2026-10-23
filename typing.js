// Bump RESUME_VERSION whenever TomStepp_Resume.pdf changes so browsers fetch the new copy.
const RESUME_VERSION = "20261022";
const RESUME_ID = "TomStepp_Resume";
const RESUME_URL = RESUME_ID + ".pdf?v=" + RESUME_VERSION;
const RESUME_TAB = RESUME_ID + "_" + RESUME_VERSION;

const carouselText = [
  "I'm a senior software engineer on the Google Cloud Dataflow team",
  "I work on large-scale, distributed software systems"
];

let typewriterStopped = false;

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll("a.resume-link").forEach(function (link) {
    link.href = RESUME_URL;
    link.target = RESUME_TAB;
  });

  const box = textbox();
  // The textbox is a textarea so long text wraps; keep Enter submitting like a search box.
  box.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      openResume();
    }
  });
  box.addEventListener("input", fitTextbox);
  // Focus covers both clicking and tabbing into the box.
  box.addEventListener("focus", stopTypewriter);
  window.addEventListener("resize", fitTextbox);

  updateThemeButton();
  // Follow system theme changes unless the visitor picked a theme with the button.
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (savedTheme() === null) setTheme(e.matches ? "dark" : "light");
  });

  // Skip the animation for visitors who prefer reduced motion.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    box.placeholder = carouselText[0];
    return;
  }
  carousel(carouselText);
});

function textbox() {
  return document.getElementById("textbox");
}

// Type and delete each sentence in turn until the visitor focuses the textbox.
async function carousel(sentences) {
  for (let i = 0; !typewriterStopped; i = (i + 1) % sentences.length) {
    await typeSentence(sentences[i]);
    await waitForMs(1500);
    await deleteSentence();
    await waitForMs(500);
  }
}

async function typeSentence(sentence, delay = 60) {
  for (const letter of sentence) {
    await waitForMs(delay);
    if (typewriterStopped) return;
    textbox().value += letter;
    fitTextbox();
  }
}

async function deleteSentence(delay = 30) {
  while (textbox().value.length > 0) {
    await waitForMs(delay);
    if (typewriterStopped) return;
    textbox().value = textbox().value.slice(0, -1);
    fitTextbox();
  }
}

// Grow or shrink the textbox to fit its text.
function fitTextbox() {
  const box = textbox();
  box.style.height = "auto";
  box.style.height = (box.scrollHeight + box.offsetHeight - box.clientHeight) + "px";
}

function waitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Clear the typewriter text once, so later clicks keep whatever the visitor typed.
function stopTypewriter() {
  if (typewriterStopped) return;
  typewriterStopped = true;
  textbox().value = "";
  fitTextbox();
}

function toggleTheme() {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  setTheme(next);
  try {
    localStorage.setItem("theme", next);
  } catch (e) {}
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  updateThemeButton();
}

function savedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === "dark";
  document.querySelector(".theme-btn").setAttribute("aria-pressed", String(dark));
}

function openResume() {
  window.open(RESUME_URL, RESUME_TAB);
}
