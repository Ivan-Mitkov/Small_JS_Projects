const url = "https://jsonplaceholder.typicode.com/todos";

//define fetch
fetch(url)
//https://developer.mozilla.org/en-US/docs/Web/API/Body/json
//A Promise that resolves to a JavaScript object. This object could be anything that can be represented by JSON — an object, an array, a string, a number.
  .then((data) => data.json())
  .then((newData) => console.log(newData))
  .catch((err) => console.log(err.message));
