const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

// List of words for game
let words = [
  "sigh",
  "tense",
  "airplane",
  "ball",
  "pies",
  "juice",
  "warlike",
  "bad",
  "north",
  "dependent",
  "steer",
  "silver",
  "highfalutin",
  "superficial",
  "quince",
  "eight",
  "feeble",
  "admit",
  "drag",
  "loving",
];

const getRandomWordsFromAPI = async () => {
  const res = await fetch(
    "https://random-word-api.herokuapp.com/word?number=50"
  );
  const randomWordsArray = await res.json();
  words = randomWordsArray;
  console.log(words);
  return words;
};

getRandomWordsFromAPI();
//Init word
let randomWord;

//Init score
let score = 0;

//Init time
let time = 15;

//init difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";
//Focus on text on start
text.focus();

//Start counting down
let timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[(Math.random() * words.length) | 0];
}

function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

function updateScore() {
  score++;
  scoreEl.innerText = score;
}

function gameOver() {
  endgameEl.innerHTML = `<h1>Time ran out</h1>
  <p>Your final score is ${score}</p>
  <button onclick="location.reload()">Reload</button>`;
  endgameEl.style.display = "flex";
}

function updateTime() {
  time--;
  timeEl.innerText = `${time}s`;
  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

addWordToDOM();

text.addEventListener("input", (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = "";
    //increase time left
    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 4;
    }
  }
});

//Settings
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});

//Setting select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  console.log(difficulty);
  localStorage.setItem("difficulty", difficulty);
});
