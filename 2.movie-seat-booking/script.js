const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

//get data from local storage and update ui
populateUI();

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //save to local storage
  //copy selected seats into arr map through it and retun new array of indexes from seats array
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));
  console.log(seatsIndex);
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("movieIndex", movieIndex);
  localStorage.setItem("moviePrice", moviePrice);
};
//movie select event
movieSelect.addEventListener("change", (e) => {
  // console.dir(e.target);
  //get index and value of selected
  setMovieData(e.target.selectedIndex, e.target.value);
  ticketPrice = +e.target.value;
  updateSelectedCount();
});
//Seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    //https://developer.mozilla.org/en-US/docs/Web/API/DOMTokenList
    //length value
    //add(token) remove(token) toggle(token)
    //item(index) contains(token) entries() keys() values() forEach()

    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
  // console.log(e.target.classList);
});

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  const selectedMovieIndex = localStorage.getItem("movieIndex");
  const selectedMoviePrice = localStorage.getItem("moviePrice");
  if (selectedSeats && selectedSeats.length > 0) {
    selectedSeats.forEach((ind) => seats[ind].classList.add("selected"));
  }
  if (selectedMovieIndex) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
  if (selectedMoviePrice) {
    ticketPrice = selectedMoviePrice;
  }
}

updateSelectedCount();
