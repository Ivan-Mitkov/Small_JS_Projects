const url = "https://randomuser.me/api";

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

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    const user = data.results[0];
    console.log(user);
    //extract data
    addImage(user);
  })
  .catch((err) => console.log(err.message));
