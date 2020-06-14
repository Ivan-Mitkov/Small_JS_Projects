//FUNCTIONS

function addImage(user) {
  //extract data
  const {
    name: { first: fname, last: lname },
    picture: { large: imageSrc },
  } = user;
  console.log(fname, lname);
  //create html element for image
  const list = document.createElement("li");
  const image = document.createElement("img");
  const p = document.createElement("p");

  image.src = imageSrc;
  p.innerText = `${fname} ${lname}`;
  //append to html
  const ul = document.getElementById("user").appendChild(list);
  list.appendChild(image);
  list.appendChild(p);
  ul.style.listStyle = "none";
}
function requestListener() {
  console.log(this);
  const data = JSON.parse(this.responseText);
  console.log(data);
  const user = data.results[0];
  console.log(user);
  addImage(user);
}

function requestError() {}

//XMLHttpRequest set up

const url = "https://randomuser.me/api";
const method = "GET";
//create new request
const xhr = new XMLHttpRequest();
console.log(xhr);

//open connection
xhr.open(method, url);

//define function when get data
xhr.onload = requestListener;

//handle errors
xhr.onerror = requestError;

//send request
xhr.send();
