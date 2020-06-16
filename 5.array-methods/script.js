const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();
  // console.log(data);
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: (Math.random() * 1000000) | 0,
  };
  // console.log(newUser);
  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(providedData = data) {
  //Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";
  providedData.forEach((p) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${p.name}</strong> ${formatMoney(p.money)}`;

    main.appendChild(element);
  });
}

function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}
const doubleWealth = () => {
  data = data.map((x) => {
    return {
      ...x,
      money: x.money * 2,
    };
  });
  updateDOM();
};
const sortWealth = () => {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
};

const showMillionaires = () => {
  data = data.filter((a) => a.money > 1000000);
  sortWealth();
  updateDOM();
};

const calcWealth = () => {
  // const wealth = data.map((a) => a.money).reduce((a, b) => a + b);
  const wealth = data.reduce((a, b) => a + b.money, 0);
  addWealth(wealth);
};

function addWealth(wealth) {
  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthEl);
}
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleWealth);
sortBtn.addEventListener("click", sortWealth);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calcWealth);
