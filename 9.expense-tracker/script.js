const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransaction = JSON.parse(
  localStorage.getItem("transactions")
);

//global state for transactions
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransaction : [];
//add transaction
const addTransaction = (e) => {
  e.preventDefault();
  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("Please add text and amount");
  } else {
    const transaction = {
      id: generateId(),
      text: text.value,
      amount: +amount.value,
    };
    transactions.push(transaction);
    addTransactionToDOM(transaction);
    updateValues();
    updateLocalStorage();
    text.value = "";
    amount.value = "";
  }
};
//Add transactions to DOM

//Generate ID
const generateId = () => {
  return (Math.random() * 1000000) | 0;
};
const addTransactionToDOM = (transaction) => {
  //plus or minus
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");
  //add class based on plus or minus
  const plusOrMinusClass = transaction.amount < 0 ? "minus" : "plus";
  item.classList.add(plusOrMinusClass);
  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span><button class="delete-btn" onClick="removeTransaction(${
    transaction.id
  })">X</button>`;
  list.appendChild(item);
};

const removeTransaction = (id) => {
  transactions = transactions.filter((x) => x.id !== id);
  updateLocalStorage();
  init();
};

//Update income and expenses
const updateValues = () => {
  const amounts = transactions.map((x) => x.amount);
  const total = +amounts.reduce((x, y) => x + y, 0).toFixed(2);
  const income = +amounts
    .filter((x) => x > 0)
    .reduce((x, y) => x + y, 0)
    .toFixed(2);
  const expenses =
    +amounts.filter((x) => x < 0).reduce((x, y) => x + y, 0) * (-1).toFixed(2);
  // console.log(amounts, total, income, expenses);
  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expenses}`;
};
//Update local storage
const updateLocalStorage = () => {
  localStorage.setItem("transactions", JSON.stringify(transactions));
};
//Init
const init = () => {
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updateValues();
};
init();

//Event listeners
form.addEventListener("submit", addTransaction);
