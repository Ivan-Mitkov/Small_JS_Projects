const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");
const more = document.getElementById("more");

const apiURL = "https://api.lyrics.ovh";
const searchSongs = async (term) => {
  const res = await fetch(`${apiURL}/suggest/${term}`);
  const data = await res.json();
  // console.log(data);
  showData(data);
};

function showData(data) {
  // let output = "";
  // data.data.forEach((song) => {
  //   output += `
  //   <li>
  //       <span><strong>${song.artist.name}</strong> - ${song.title}</span>
  //       <button class="btn"
  //        data-artist="${song.artist.name}"
  //        data-songtitle="${song.title}"
  //        >Get Lyrics</button>
  //   </li>
  //   `;
  // });
  // result.innerHTML = `
  //   <ul class="songs">
  //       ${output}
  //   </ul>
  // `;

  result.innerHTML = `
  <ul class="songs">
        ${data.data
          .map((song) => {
            return `
    <li>
        <span><strong>${song.artist.name}</strong> - ${song.title}</span> 
        <button class="btn"
         data-artist="${song.artist.name}"
         data-songtitle="${song.title}"         
         >Get Lyrics</button>
    </li>
    `;
          })
          .join("")}
    </ul>
  `;

  //CHECK for PAGINATION

  if (data.next || data.prev) {
    makePages(data);
  } else {
    result.innerHTML = "";
  }
}
//PAGINATION

async function getMoreSongs(url) {
  console.log(url);

  //cors error go around with cors-anywhere
  const res = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  const data = await res.json();
  console.log(data);
  showData(data);
}
function makePages(data) {
  more.innerHTML = `
  ${
    data.prev
      ? `<button class="btn" onclick="getMoreSongs('${data.prev}')">Prev</button>`
      : ""
  }
  ${
    data.next
      ? `<button class="btn" onclick="getMoreSongs('${data.next}')">Next</button>`
      : ""
  }
  `;
}
// Get lyrics for song
async function getLyrics(artist, songTitle) {
  const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);
  const data = await res.json();

  if (data.error) {
    result.innerHTML = data.error;
  } else {
    //add new lines
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, "<br>");

    result.innerHTML = `
            <h2><strong>${artist}</strong> - ${songTitle}</h2>
            <span>${lyrics}</span>
        `;
  }
  //clear next and prev button
  more.innerHTML = "";
}
//EVENT listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.dir(e);
  console.dir(e.target);
  console.log(e.target[0].value);
  const searchTerm = search.value.trim();
  console.log(searchTerm);
  if (!searchTerm) {
    alert("Search is empty");
  } else {
    searchSongs(searchTerm);
  }
});

result.addEventListener("click", (e) => {
  const clickedEl = e.target;
  if (clickedEl.tagName === "BUTTON") {
    console.log("123");
    const artist = clickedEl.getAttribute("data-artist");
    const songTitle = clickedEl.getAttribute("data-songtitle");
    console.log(artist, songTitle);
    getLyrics(artist, songTitle);
  }
});
