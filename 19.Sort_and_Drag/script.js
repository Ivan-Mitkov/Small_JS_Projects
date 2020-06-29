const draggableList = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Warren Buffett",
  "Bernard Arnault",
  "Carlos Slim Helu",
  "Amancio Ortega",
  "Larry Ellison",
  "Mark Zuckerberg",
  "Michael Bloomberg",
  "Larry Page",
];

const listItems = [];
let dragStartIndex;

createList();

//SWAP item
function swapItems(fromIndex, toIndex) {
  //get item from dom list
  const itemOne = listItems[fromIndex].querySelector(".draggable");
  const itemTwo = listItems[toIndex].querySelector(".draggable");
  //swap them in the DOM
  listItems[fromIndex].appendChild(itemTwo);
  listItems[toIndex].appendChild(itemOne);
}
///SWAP
//SCRUMBLE ARRAY !!!
function scrumbleArray(arr) {
  return arr
    .map((scrumbled) => {
      return { value: scrumbled, sort: Math.random() };
    })
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
}
////SCRUMBLE ARRAY
function createList() {
  const scrumbleArr = scrumbleArray([...richestPeople]);
  scrumbleArr.forEach((person, i) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", i);
    listItem.innerHTML = `<span class="number">${i + 1}</span>
    <div class="draggable" draggable="true">
    <p class="person-name">${person}</p>
    <i class="fas fa-grip-lines"></i>
    </div>
    `;
    listItems.push(listItem);
    //add to the dom
    draggableList.appendChild(listItem);
  });
  // console.log(listItems);
  addEventListeners();
}

//Add drag events
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItem = document.querySelectorAll(".draggable-list li");

  draggables.forEach((dr) => dr.addEventListener("dragstart", dragStart));
  dragListItem.forEach((dr) => {
    dr.addEventListener("dragover", dragOver);
    dr.addEventListener("drop", dragDrop);
    dr.addEventListener("dragenter", dragEnter);
    dr.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);

//Drag functions
function dragStart(e) {
  // console.log("Drag start", e.target);
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  // console.log(dragStartIndex);
}
function dragOver(e) {
  // console.log("Drag over", e.target);
  e.preventDefault();
}
function dragDrop(e) {
  // console.log("Drag drop", e.target);
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}
function dragEnter(e) {
  // console.log("Drag enter", e.target);
  this.classList.add("over");
}
function dragLeave(e) {
  // console.log("Drag leave", e.target);
  this.classList.remove("over");
}

function checkOrder() {
  listItems.forEach((item, i) => {
    const personName = item.querySelector(".draggable").innerText.trim();
    if (personName !== richestPeople[i]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}
