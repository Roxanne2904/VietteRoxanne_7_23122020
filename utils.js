function currentValue(value) {
  if (value[value.length - 1] === "s") {
    value = value.substring(0, value.length - 1);
  }
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
//---
function displayRecipes(array, content) {
  content.innerHTML = array
    .map((recipe) => {
      return `<!-- BLOCK RECIPES 01 -->
      <li class="bgdRecipes__block">
        <!-- content img or bgd -->
        <div class="bgdRecipes__block__bgdImg"></div>
        <!-- content txt -->
        <div class="bgdRecipes__block__bgdText">
          <!-- title -->
          <div class="bgdRecipes__block__bgdText__contentTitle">
            <span class="bgdRecipes__block__bgdText__contentTitle__title"
              >${recipe.name}</span
            >
            <span class="bgdRecipes__block__bgdText__contentTitle__time"
              ><span
                class="
                  bgdRecipes__block__bgdText__contentTitle__time__clockIcone
                "
                ><i class="far fa-clock"></i></span
              ><span class="
              bgdRecipes__block__bgdText__contentTitle__time__nbs
            ">${recipe.time} min</span></span
            >
          </div>
          <div class="bgdRecipes__block__bgdText__contentDatasRecipes">
            <!-- ingredients -->
            <ul
            class="
              bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients
            "
          >${recipe.ingredients
            .map((ingredient) => {
              if (
                ingredient.quantity === undefined &&
                ingredient.unit === undefined
              ) {
                return `<li
                class="
                bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients
                "
                >
                <strong class="
                bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients__strong"
                >
                ${ingredient.ingredient}</strong>
                </li>`;
              } else if (
                ingredient.quantity != undefined &&
                ingredient.unit === undefined
              ) {
                return `<li
                class="
                bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients
                "
                >
                <strong class="
                bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients__strong"
                >
                ${ingredient.ingredient} :</strong> ${ingredient.quantity}
                </li>`;
              } else {
                return `<li
                class="
                bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients
                "
                >
                <strong class="
                bgdRecipes__block__bgdText__contentDatasRecipes__contentIngredients__ingredients__strong"
                >
                ${ingredient.ingredient} :</strong> ${ingredient.quantity} ${ingredient.unit}
                </li>`;
              }
            })
            .join("")}
          </ul>
            <!-- recipes -->
            <div
              class="
                bgdRecipes__block__bgdText__contentDatasRecipes__contentRecipes
              "
            >
              <span
                class="
                  bgdRecipes__block__bgdText__contentDatasRecipes__contentRecipes__recipes
                "
                >${recipe.description}</span
              >
            </div>
          </div>
        </div>
      </li>`;
    })
    .join("");
}
// ---
function displayKeywordsLists(list, content) {
  content.innerHTML = list
    .map(
      (ingredient) =>
        `<li class="form__fieldset__bgd__content__ul__li ingredients__li">${ingredient}</li>`
    )
    .join("");
}
