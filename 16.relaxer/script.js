const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

const breathAnimation = () => {
  text.innerText = "Breathe In";
  container.classList.add("grow");
  container.classList.remove("shrink");

  setTimeout(() => {
    text.innerText = "Hold";

    setTimeout(() => {
      container.classList.add("shrink");
      container.classList.remove("grow");

      text.innerText = "Breathe Out";
    }, holdTime);
  }, breatheTime);
};
breathAnimation();
setInterval(breathAnimation, totalTime);
