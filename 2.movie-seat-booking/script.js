const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};
//movie select event
movieSelect.addEventListener("change", (e) => {
  // console.log(e.target.value);
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
