const video = document.getElementById("video");
const play = document.getElementById("play");
const stopBtn = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");

const toggleVideoStatus = () => {
  // Print functions available in HTMLMediaElement
  // NOT connected to video player - just curious
  console.dir(video);
  const mediaFunctions = video.__proto__.__proto__;
  const functionsInMedia = Object.keys(mediaFunctions).filter((key) => {
    try {
      if (typeof mediaFunctions[key] == "function") {
        return mediaFunctions[key];
      }
    } catch (err) {}
  });
  console.log(functionsInMedia);
  //again video player
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
};
const updatePlayIcon = () => {
  if (video.paused) {
    play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
  } else {
    play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
  }
};
const updateProgress = () => {
  progress.value = (video.currentTime / video.duration) * 100; 
  //Get minutes
  let mins=Math.floor(video.currentTime/60)
  if(mins<10){
    mins=`0${mins}`
  }
  //Get seconds
  let sec=Math.floor(video.currentTime%60)
  if(sec<10){
    sec=`0${sec}`
  }

  timestamp.innerHTML=`${mins}:${sec}`
};
const setVideoProgress = () => {
  console.log(progress.value);
  video.currentTime=(+progress.value*video.duration)/100;
};
const stopVideo = () => {
  //there is no stop function in this API
  video.currentTime = 0;
  video.pause();
};

//Event listeners
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("pause", updatePlayIcon);
video.addEventListener("play", updatePlayIcon);
video.addEventListener("timeupdate", updateProgress);

play.addEventListener("click", toggleVideoStatus);
stopBtn.addEventListener("click", stopVideo);
progress.addEventListener("change", setVideoProgress);
