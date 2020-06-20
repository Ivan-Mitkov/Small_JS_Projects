const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song titles mach actual titles and images
const songs = ["hey", "summer", "ukulele"];

// Keep track of index song
let songIndex = 2;

// Initially load song details into DOM
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}
const pauseSong = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  audio.pause();
};

const playSong = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");
  audio.play();
};

const prevSong = () => {
  songIndex = songIndex == 0 ? songs.length - 1 : songIndex - 1;
  loadSong(songs[songIndex]);
  playSong();
};
const nextSong = () => {
  songIndex = songIndex == songs.length - 1 ? 0 : songIndex + 1;
  loadSong(songs[songIndex]);
  playSong();
};

const updateProgress = (e) => {
  // console.dir(e.srcElement);
  const { duration, currentTime } = e.srcElement;
  // console.log("duration: ", duration, " currentTime: ", currentTime);
  const progressPercent = (currentTime / duration) * 100;
  // console.log(progressPercent);
  progress.style.width = `${progressPercent}%`;
};

function setProgress(e) {
  //get total width of the element
  const width = this.clientWidth;
  // console.log(width);
  //get where is clicked
  const clickX = e.offsetX;
  // console.log(clickX);
  //get total duration from audio API
  const duration = audio.duration;
  //set current time
  audio.currentTime = (clickX / width) * duration;
}
//Event listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
//Its interesting
progressContainer.addEventListener("click", setProgress);
//song ends
audio.addEventListener("ended", nextSong);
