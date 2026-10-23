// Bump RESUME_VERSION whenever TomStepp_Resume.pdf changes so browsers fetch the new copy.
const RESUME_VERSION = "20261022";
const RESUME_ID = "TomStepp_Resume";
const RESUME_URL = RESUME_ID + ".pdf?v=" + RESUME_VERSION;
const RESUME_TAB = RESUME_ID + "_" + RESUME_VERSION;

const carouselText = [
  { text: "I'm a senior software engineer on the Google Cloud Dataflow team", color: "black" },
  { text: "I work on large-scale, distributed software systems", color: "black" }
]

var theFormWasClicked = false;

$(document).ready(async function () {
  $("a.resume-link").attr({ href: RESUME_URL, target: RESUME_TAB });
  // The textbox is a textarea so long text wraps; keep Enter submitting like a search box.
  $("#textbox").on("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      openResume();
    }
  }).on("input", fitTextbox);
  $(window).on("resize", fitTextbox);
  carousel(carouselText, "#textbox")
});

async function typeSentence(sentence, eleRef, delay = 60) {
  const letters = sentence.split("");
  let i = 0;
  while (i < letters.length && !theFormWasClicked) {
    await waitForMs(delay);
    document.getElementById("textbox").value += letters[i];
    fitTextbox();
    i++;
  }
  return;
}

async function deleteSentence(eleRef, delay = 30) {
  let val = document.getElementById("textbox").value;
  let valsize = val.length;
  while (valsize > 0 && !theFormWasClicked) {
    await waitForMs(delay);
    document.getElementById("textbox").value = val.slice(0, -1);
    fitTextbox();
    val = document.getElementById("textbox").value;
    valsize = val.length;
  }
}

async function carousel(carouselList, eleRef) {
  let i = 0;
  //while(true) {
  while (!theFormWasClicked) {
    updateFontColor(eleRef, carouselList[i].color)
    await typeSentence(carouselList[i].text, eleRef);
    await waitForMs(1500);
    await deleteSentence(eleRef);
    await waitForMs(500);
    i++
    if (i >= carouselList.length) {
      i = 0;
    }
  }
}

function updateFontColor(eleRef, color) {
  $(eleRef).css('color', color);
}

// Grow or shrink the textbox to fit its text.
function fitTextbox() {
  const box = document.getElementById("textbox");
  box.style.height = "auto";
  box.style.height = (box.scrollHeight + box.offsetHeight - box.clientHeight) + "px";
}

function waitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function stopTypewriter() {
  theFormWasClicked = true;
  document.getElementById("textbox").value = "";
  fitTextbox();
  document.getElementById("textbox").style.color = "black";
}

async function startTypewriter() {
  theFormWasClicked = false;
  document.getElementById("textbox").value = "";
  document.getElementById("textbox").style.color = "black";
  carousel(carouselText, "#textbox")
}

async function openResume() {
  window.open(RESUME_URL, RESUME_TAB);
}
