const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);
const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[(Math.random() * words.length) | 0];

const correctLetters = [];
const wrongLetters = [];

const displayWin = (word) => {
  if (word === selectedWord) {
    finalMessage.innerText = "Congratulations!You won!";
    popup.style.display = "flex";
  }
};
const displayWord = () => {
  const words = selectedWord
    .split("")
    .map(
      (x) =>
        `<span class="letter">${correctLetters.includes(x) ? x : ""}</span>`
    )
    .join("");
  wordEl.innerHTML = words;
  //replace new line element in words to form a word
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  // console.log(innerWord, wordEl.innerText);
  //message
  displayWin(innerWord);
};

function isKeyLetter(letterCode) {
  if (letterCode >= 65 && letterCode <= 90) {
    // console.log(letter);
    return true;
  }
  return false;
}

function updateWrongLettersEl() {
  // console.log("Update wrong");
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span> ${letter}</span>`)}`;
  updateFigure();
}

function updateFigure() {
  const errors = wrongLetters.length;
  figureParts.forEach((part, i) => {
    if (i < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  if (errors === figureParts.length) {
    finalMessage.innerText = "You lost!";
    popup.style.display = "flex";
  }
}

function showNotification() {
  notification.classList.add("show");
  setTimeout(() => notification.classList.remove("show"), 1000);
}

//Key down letter press
window.addEventListener("keydown", (e) => {
  // console.log(e.keyCode);
  //code of the letter
  const code = e.keyCode;
  if (isKeyLetter(code)) {
    //letter of the code
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

playAgainBtn.addEventListener("click", () => {
  //Empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  //hide popup
  popup.style.display = "none";
  //new random word
  selectedWord = words[(Math.random() * words.length) | 0];
  //hide wrong letters
  updateWrongLettersEl();
  //start again
  displayWord();
});
displayWord();
