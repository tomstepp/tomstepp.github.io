const carouselText = [
  {text: "I'm a software engineer on the Google Cloud team", color: "black"},
  {text: "I work on large-scale, distributed software systems", color: "black"}
]

var theFormWasClicked = false;

$(document).ready(async function() {
  carousel(carouselText, "#textbox")
});

async function typeSentence(sentence, eleRef, delay = 70) {
  const letters = sentence.split("");
  let i = 0;
  while(i < letters.length && !theFormWasClicked) {
    await waitForMs(delay);
    document.getElementById("textbox").value += letters[i];
    i++;
  }
  return;
}

async function deleteSentence(eleRef, delay = 40) {
  let val = document.getElementById("textbox").value;
  let valsize = val.length;
  while(valsize > 0 && !theFormWasClicked) {
    await waitForMs(delay);
    document.getElementById("textbox").value = val.slice(0, -1);
    val = document.getElementById("textbox").value;
    valsize = val.length;
  }
}

async function carousel(carouselList, eleRef) {
    let i = 0;
    //while(true) {
    while(!theFormWasClicked) {
      updateFontColor(eleRef, carouselList[i].color)
      await typeSentence(carouselList[i].text, eleRef);
      await waitForMs(1500);
      await deleteSentence(eleRef);
      await waitForMs(500);
      i++
      if(i >= carouselList.length) {
        i = 0;
      }
    }
}

function updateFontColor(eleRef, color) {
  $(eleRef).css('color', color);
}

function waitForMs(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function stopTypewriter(){
  theFormWasClicked = true;
  document.getElementById("textbox").value = "";
  document.getElementById("textbox").style.color = "black";
}

async function startTypewriter(){
  theFormWasClicked = false;
  document.getElementById("textbox").value = "";
  document.getElementById("textbox").style.color = "black";
  carousel(carouselText, "#textbox")
}
