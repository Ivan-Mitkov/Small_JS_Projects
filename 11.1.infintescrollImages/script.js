import { apiKeys } from "../apis.js";

const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
const unsplashApiKey = apiKeys.unsplash;
let initialLoad = true;
let count = 5;
// console.log(unsplashApiKey);
let url = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${count}`;

//array to be filled on every load
let photosArray = [];
//the array is ready and filled
let ready = false;
//with loaded images
let imagesLoaded = 0;
//so total images are
let totalImages = 0;

//check if all images are loaded
function imageLoaded() {
  // console.log("image loaded");
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    //hide loader
    loader.hidden = true;
    ready = true;
    count = 30;
    url = `https://api.unsplash.com/photos/random/?client_id=${unsplashApiKey}&count=${count}`;
  }
}
function displayPhotos() {
  //before display new images zero yhis new images
  imagesLoaded = 0;
  //new images === array
  totalImages = photosArray.length;
  // console.log("display photos");
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    item.setAttribute("href", photo.links.html);
    item.setAttribute("target", "_blank");
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    img.setAttribute("alt", photo.alt_description);
    img.setAttribute("title", photo.alt_description);

    img.addEventListener("load", imageLoaded);
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
async function getPhotos() {
  try {
    const respons = await fetch(url);
    //load iamges in arr
    photosArray = await respons.json();
    // console.log(photosArray);
    // console.log("get photos");
    displayPhotos();
  } catch (error) {
    // console.log(error);
    throw new Error(error);
  }
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    //get new photos only if we have reached the end of the page and all initial images are loaded

    ready = false;
    getPhotos();
  }
});

getPhotos();
