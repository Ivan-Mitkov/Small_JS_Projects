//1. set up request
const xhr = new XMLHttpRequest();
console.log(xhr.readyState);
console.log(xhr.status);

//2. create function to deal with the response
xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status == 200) {
    // document.write("All done");
    // console.log(xhr.readyState);
    // console.log(xhr.status);
    // console.log(xhr);
    const data = JSON.parse(this.responseText)[0];
    document.write(JSON.stringify(data));
  }
};

//3. open connection
xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");
//4. send request
xhr.send();
