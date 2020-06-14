const url = "https://jsonplaceholder.typicode.com/posts";

const customPost = {
  title: "Hello World",
  body:
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam, est. Perferendis, aut, earum architecto esse magni tenetur laboriosam ad possimus molestiae, eligendi non facere placeat consectetur dicta sunt expedita voluptatum",
  userID: 1,
};

const customHeader = {
  "Content-Type": "application/json; charset=UTF-8",
};

//post comment
fetch(url, {
  method: "POST",
  headers: customHeader,
  body: JSON.stringify(customPost),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
