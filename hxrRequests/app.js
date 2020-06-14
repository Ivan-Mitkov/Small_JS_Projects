const getData = (url, callback) => {
  //1. set up request
  const xhr = new XMLHttpRequest();
  //2. open connection
  xhr.open("GET", url, true);
  //set up response type
  xhr.responseType = "json";
  //onload() is newer than onreadystatechange
  xhr.onload = () => {
    const status = xhr.status;
    if (status == 200) {
      callback(null, xhr.response);
    } else {
      callback(status);
    }
  };
  //send request
  xhr.send();
};

getData("https://jsonplaceholder.typicode.com/posts", (err, data) => {
  if (err !== null) {
    console.log(err);
  } else {
    let txt = ` : ${JSON.stringify(data[0])}`;
    document.getElementsByTagName("h1")[0].append(txt);
  }
});
