const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

const searchMeal = (e) => {
  e.preventDefault();
  //clear single meal
  single_mealEl.innerHTML = "";
  const term = search.value;
  // console.log(term);
  //Check for empty term
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultHeading.innerHTML = `<h2>Search results for "${term}":</h2>`;
        if (data.meals === null) {
          resultHeading.innerHTML = `<p>There are no serach results. Try again.</p>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (meal) => `
          <div class="meal">
            <img src='${meal.strMealThumb}' alt='${meal.strMeal}'/>
            <div class='meal-info' data-mealID="${meal.idMeal}">
              <h3>${meal.strMeal}</h3>
            </div>
          </div>
          `
            )
            .join("");
        }
        //Clear search text
        search.value = "";
      });
  } else {
    alert("Please enter search value");
  }
};

const formatAPIData = (meal) => {
  const ingredients = [];
  const measures = [];
  for (let ing in meal) {
    if (ing.includes("Ingredient")) {
      if (meal[ing]) {
        ingredients.push(meal[ing]);
      }
      // console.log(meal[ing]);
    }
    if (ing.includes("Measure")) {
      if (meal[ing]) {
        measures.push(meal[ing]);
      }
      // console.log(meal[ing]);
    }
  }
  const ingredientsWithMeasures = ingredients.map(
    (ingr, i) => `${ingr} - ${measures[i]}`
  );
  // console.log(ingredientsWithMeasures);
  return ingredientsWithMeasures;
};
//Show single meal
const addMealToDOM = (meal) => {
  const ingr = formatAPIData(meal);
  console.log(ingr);
  single_mealEl.innerHTML = `<div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
  <div class="single-meal-info">
    ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
    ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
  </div>
  <div class="main">
    <p>${meal.strInstructions}</p>
    <h2>Ingredients</h2>
    <ul>
      ${ingr.map((ing) => `<li>${ing}</li>`).join("")}
    </ul>
  </div>
</div>`;
};

//FETCH single meal
const getMealById = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
};
const randomMeal = () => {
  //clear meals and headings
  mealsEl.innerHTML = "";
  resultHeading.innerHTML = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
};
function getMealElement(e) {
  console.log(e.path);

  return e.path.find((item) => {
    // console.log(item);
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
}
function getMealElementV2(e) {
  return e.target.tagName === "DIV" ? e.target : e.target.parentElement;
}

////////////////////
//Event listeners
submit.addEventListener("submit", searchMeal);
random.addEventListener("click", randomMeal);

mealsEl.addEventListener("click", (e) => {
  console.dir(e);
  const mealInfo = getMealElementV2(e);
  if (mealInfo) {
    //https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
    const mealID = mealInfo.getAttribute("data-mealId");
    console.log(mealID);
    getMealById(mealID);
  }
});
