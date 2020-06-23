const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

//Keep track of current card
let currenActiveCard = 0;

//Store DOM cards
const cardsEl = [];

//Store card data
// const cardsData = [
//   {
//     question: "What must a variable begin with?",
//     answer: "A letter, $ or _",
//   },
//   {
//     question: "What is a variable?",
//     answer: "Container for a piece of data",
//   },
//   {
//     question: "Example of Case Sensitive Variable",
//     answer: "thisIsAVariable",
//   },
// ];
const cardsData = getCardData();
//Get cards from local storage
function getCardData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}
//Add cards to local storage
function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  //reload the page
  window.location.reload();
}
//Create single card
const createCard = (data, i) => {
  const card = document.createElement("div");
  card.classList.add("card");

  if (i === 0) {
    card.classList.add("active");
  }

  card.innerHTML = `
          <div class="inner-card">
          <div class="inner-card-front">
            <p>
              ${data.question}
            </p>
          </div>
          <div class="inner-card-back">
            <p>
              ${data.answer}
            </p>
          </div>
        </div>
  `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  // Add to DOM cards
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentText();
};
//Show number of cards
const updateCurrentText = () => {
  currentEl.innerText = `${currenActiveCard + 1}/${cardsEl.length}`;
};

//create all cards
const createAllCards = () => {
  return cardsData.map((data, i) => createCard(data, i));
};
createAllCards();

nextBtn.addEventListener("click", () => {
  //hide card by moving left
  cardsEl[currenActiveCard].className = "card left";
  //change index of active in array of cards
  currenActiveCard = currenActiveCard + 1;
  //check
  if (currenActiveCard > cardsEl.length - 1) {
    currenActiveCard = cardsEl.length - 1;
  }
  //add class to the new active
  cardsEl[currenActiveCard].className = "card active";
  updateCurrentText();
});
prevBtn.addEventListener("click", () => {
  //hide card by moving left
  cardsEl[currenActiveCard].className = "card right";
  //change index of active in array of cards
  currenActiveCard = currenActiveCard - 1;
  //check
  if (currenActiveCard < 0) {
    currenActiveCard = 0;
  }
  //add class to the new active
  cardsEl[currenActiveCard].className = "card active";
  updateCurrentText();
});

showBtn.addEventListener("click", () => {
  addContainer.classList.add("show");
});
hideBtn.addEventListener("click", () => {
  addContainer.classList.remove("show");
});
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  // console.log(question, answer)

  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    createCard(newCard);
    questionEl.value = "";
    answerEl.value = "";

    //hide add container
    addContainer.classList.remove("show");
    cardsData.push(newCard);
    setCardsData(cardsData);
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  cardsContainer.innerHTML = "";
  window.location.reload()
});
