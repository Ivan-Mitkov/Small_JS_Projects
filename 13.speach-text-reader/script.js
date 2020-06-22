const main = document.querySelector("main");
const voicesSelect = document.getElementById("voices");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const toggleBtn = document.getElementById("toggle");
const closeBtn = document.getElementById("close");

const data = [
  {
    image: "./img/drink.jpg",
    text: "I'm Thirsty",
  },
  {
    image: "./img/food.jpg",
    text: "I'm Hungry",
  },
  {
    image: "./img/tired.jpg",
    text: "I'm Tired",
  },
  {
    image: "./img/hurt.jpg",
    text: "I'm Hurt",
  },
  {
    image: "./img/happy.jpg",
    text: "I'm Happy",
  },
  {
    image: "./img/angry.jpg",
    text: "I'm Angry",
  },
  {
    image: "./img/sad.jpg",
    text: "I'm Sad",
  },
  {
    image: "./img/scared.jpg",
    text: "I'm Scared",
  },
  {
    image: "./img/outside.jpg",
    text: "I Want To Go Outside",
  },
  {
    image: "./img/home.jpg",
    text: "I Want To Go Home",
  },
  {
    image: "./img/school.jpg",
    text: "I Want To Go To School",
  },
  {
    image: "./img/grandma.jpg",
    text: "I Want To Go To Grandmas",
  },
];

const dataToDisplay = data.map(createBox);

function createBox(item) {
  const box = document.createElement("div");
  const { image, text } = item;
  box.classList.add("box");
  box.innerHTML = `
  <img src="${image}" alt="${text}" />
  <p class="info">${text}</p>`;
  //add speach event
  box.addEventListener("click", () => {
    setTextMessage(text);
    speakText();

    //add active effect
    box.classList.add("active");
    setTimeout(() => box.classList.remove("active", 800));
  });
  main.appendChild(box);
}

//https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API
//https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis

//Init Speech synth
const message = new SpeechSynthesisUtterance();
//Store voices
let voices = [];

function getVoices() {
  voices = speechSynthesis.getVoices();
  voices.map((v) => {
    // console.log(v);
    const option = document.createElement("option");
    option.value = v.name;
    option.innerText = `${v.name} ${v.lang}`;
    voicesSelect.appendChild(option);
  });
}

function setVoice(e) {
  message.voice = voices.find((v) => v.name === e.target.value);
}

//Set text
function setTextMessage(text) {
  message.text = text;
}

//Speak text
function speakText() {
  speechSynthesis.speak(message);
}

speechSynthesis.addEventListener("voiceschanged", getVoices);
toggleBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.toggle("show")
);
closeBtn.addEventListener("click", () =>
  document.getElementById("text-box").classList.remove("show")
);

voicesSelect.addEventListener("change", setVoice);

readBtn.addEventListener("click", () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();
