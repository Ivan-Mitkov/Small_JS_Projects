const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");
const year = document.getElementById("year");
const loading = document.getElementById("loading");

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

year.innerText = currentYear + 1;
function updateCoundwon() {
  const currentTime = new Date();
  const diff = newYearTime - currentTime;
  //seconds /minutes/hours/24
  const d = (diff / 1000 / 60 / 60 / 24) | 0;
  const h = (diff / 1000 / 60 / 60) % 24 | 0;
  const m = (diff / 1000 / 60) % 60 | 0;
  const s = (diff / 1000) % 60 | 0;
  // console.log(d, h, m, s);
  days.innerText = d;
  hours.innerText = h < 10 ? `0${h}` : h;
  minutes.innerText = m < 10 ? `0${m}` : m;
  seconds.innerText = s < 10 ? `0${s}` : s;
}

setInterval(() => {
  updateCoundwon();
}, 1000);

//Show and remove spinner
setTimeout(() => {
  loading.remove();
  countdown.style.display='flex'
}, 1000);
