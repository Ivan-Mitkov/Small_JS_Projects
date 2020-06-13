const ul = document.getElementById("food");
ul.addEventListener("click", showOrHide);

function showOrHide(e) {
  const target = e.target;

  if (target.tagName === "LI") {
    const showOrHideUl = target.querySelector("ul");

    if (showOrHideUl) {
      showOrHideUl.classList.toggle("hide");
      // console.log(showOrHideUl.classList);
    }
  }
}
