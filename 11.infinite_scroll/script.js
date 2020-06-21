const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

// Fetch posts from API
async function getPosts() {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await res.json();

  return data;
}

//Show post in DOM
const showPosts = async () => {
  // console.log("get posts");
  const posts = await getPosts();
  // console.log(posts);
  const postsToShow = posts.map((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
    </div>`;
    postsContainer.appendChild(postEl);
  });
  return postsToShow;
};
//Show initial posts
showPosts();

//Show loader and fetch more posts
const showLoading = () => {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page = page + 1;
      showPosts();
    }, 300);
  }, 500);
};

//Filter posts by search input
//FILTER ONLY POSTS IN THE DOM
const filterPosts = (e) => {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.indexOf(term) > -1 || body.indexOf(term) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
};

//add infinit scroll funcionality
window.addEventListener("scroll", () => {
  // console.dir(document.documentElement);
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  // console.log(scrollTop, scrollHeight, clientHeight);
  if (scrollTop + clientHeight >= scrollHeight) {
    // console.log("Fetch");
    //if scrollTop + clientHeight >= scrollHeight-som number fetches multiple times
    showLoading();
  }
});

filter.addEventListener("input", filterPosts);
