let datas;
// ---
let isValid;
// ---
let uniqueDataIngredients = [];
let uniqueDataAppareils = [];
let uniqueDataUstensiles = [];
// ---
let matchingRecipesArray = [];
let matchingRecipesArrayTags = [];
let matchingElementsIngredient;
let matchingElementsAppareil;
let matchingElementsUstensile;
// ---
let tagsStock = [];
// ---
const ingredientsUl = document.getElementById("ingredients__ul");
const appareilsUl = document.getElementById("appareil__ul");
const ustensilesUl = document.getElementById("ustensiles__ul");
// ----------------------------------------
const tagsUL = document.getElementById("ul__tags");
// ----------------------------------------
const iconeIngredient = document.getElementById("label__ingredient");
const iconeAppareil = document.getElementById("label__appareil");
const iconeUstensiles = document.getElementById("label__ustensiles");
// ----------------------------------------
const mainInput = document.querySelector(".form__fieldset__bgdMain__inputMain");
// ----------------------------------------
const inputIngredients = document.querySelector("#ingredients");
const inputAppareils = document.querySelector("#appareil");
const inputUstensiles = document.querySelector("#ustensiles");
// ----------------------------------------
const form = document.querySelector("#myform");
const ulRecipes = document.querySelector(".bgdRecipes");
// ----------------------------------------
function recipesIsMatching(obj, value) {
  // ---
  let applianceIsMatchingValue = currentValue(obj.appliance).includes(value);
  // ---
  let descriptionIsMatchingValue = currentValue(obj.description).includes(
    value
  );
  // ---
  let nameIsMatchingValue = currentValue(obj.name).includes(value);
  // ---
  let ingredientIsMatchingValue = obj.ingredients
    .map((ingredient) => {
      return currentValue(ingredient.ingredient);
    })
    .some((ingredient) => {
      return ingredient.includes(value);
    }); // tout les ingredients d'une recette retourne un true ou false si il match avec la valeur de l'input;
  // ---
  let quantityIsMatchingValue = obj.ingredients
    .map((ingredient) => {
      if (ingredient.quantity != undefined) {
        return ingredient.quantity.toString();
      }
    })
    .some((quantity) => {
      if (quantity != undefined) {
        return quantity.includes(value);
      }
    });
  // ---
  let unitIsMatchingValue = obj.ingredients
    .map((ingredient) => {
      if (ingredient.unit != undefined) {
        return currentValue(ingredient.unit);
      }
    })
    .some((unit) => {
      if (unit != undefined) {
        return unit.includes(value);
      }
    });
  // ---
  let ustensilIsMatchingValue = obj.ustensils.some((ustensil) => {
    return currentValue(ustensil).includes(value);
  });
  // ---
  if (
    applianceIsMatchingValue === true ||
    descriptionIsMatchingValue === true ||
    nameIsMatchingValue === true ||
    obj.id.toString().includes(value) === true ||
    obj.servings.toString().includes(value) === true ||
    ingredientIsMatchingValue === true ||
    quantityIsMatchingValue === true ||
    unitIsMatchingValue === true ||
    ustensilIsMatchingValue === true
  ) {
    return true;
  }
}
// ---
function currentValue(value) {
  if (value[value.length - 1] === "s") {
    value = value.substring(0, value.length - 1);
  }
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
// LI des mots clefs;
function updateLiAppearance(list, content) {
  if (list.length <= 5) {
    for (let i = 0; i < content.children.length; i++) {
      content.children[i].style.width = "inherit";
      content.children[i].style.padding = "0px 20px 0 6px";
    }
  }
}
// La listes des inputs ingredients, ustensiles, et appareils;
const openTheList = (ulBlock, click) => {
  //liBlock)
  const inputs =
    ulBlock.parentElement.firstChild.nextElementSibling.firstChild
      .nextElementSibling;
  const inputBgd = ulBlock.parentElement.firstChild.nextElementSibling;
  const label =
    ulBlock.parentElement.firstChild.nextElementSibling.firstChild
      .nextElementSibling.nextElementSibling;
  const NoUpperCaseInputName = inputs.id;
  const UpperCaseInputName = inputs.dataset.value;
  // -----------------

  if (click === true) {
    // placeholder value
    if (inputs.placeholder === `Recherche un ${NoUpperCaseInputName}`) {
      inputs.setAttribute("placeholder", `${UpperCaseInputName}`);
      label.innerHTML = '<i class="fas fa-chevron-down"></i>';
    } else {
      inputs.setAttribute(
        "placeholder",
        `Recherche un ${NoUpperCaseInputName}`
      );
      label.innerHTML = ' <i class="fas fa-chevron-up"></i>';
    }
    inputBgd.style.padding = "";
    inputs.style.color = "";
    inputs.style.opacity = "";
    inputs.style.fontWeight = "";
    // ---
    ulBlock.classList.toggle("openUlBlocks");
    inputBgd.classList.toggle("openInputsBgd");
    inputs.classList.toggle("openInputs");
    ulBlock.parentElement.classList.toggle("openContent");
  } else {
    label.innerHTML = ' <i class="fas fa-chevron-up"></i>';
    // placeholder value
    // ---
    if (inputs.value === "") {
      inputs.setAttribute(
        "placeholder",
        `Recherche un ${NoUpperCaseInputName}`
      );
    }
    // ---

    ulBlock.classList.add("openUlBlocks");
    inputBgd.classList.add("openInputsBgd");
    inputBgd.style.padding = "20px 20px 10px 20px";
    inputs.classList.add("openInputs");
    inputs.style.opacity = "1";
    inputs.style.fontWeight = "600";
    ulBlock.parentElement.classList.add("openContent");
  }
};
// ---
// AFFICHAGE
// ---
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
  updateLiAppearance(list, content);
}
// ---
// METTRE A JOUR LES ELEMENTS DES LISTES
// ---
const isUpdatingSecondariesInputsElements = (
  uniqueDataList,
  content,
  type,
  arrayRecipes
) => {
  // 2)f. On met en place la fonction qui va filtrer;
  function keywordsIsMatchingWithRecipes(elt) {
    let currentElt = currentValue(elt);
    // ---
    if (type === "ingredient") {
      let ingredientFromRecipes = arrayRecipes
        .map((ingredient) => {
          return ingredient.ingredients.map((ingredient) => {
            return currentValue(ingredient.ingredient);
          });
        })
        .some((ingredient) => {
          return ingredient.includes(currentElt);
        });

      if (ingredientFromRecipes === true) {
        return true;
      }
    } else if (type === "appareil") {
      let appareilsFromRecipes = arrayRecipes
        .map((appareil) => {
          return currentValue(appareil.appliance);
        })
        .some((appareil) => {
          return appareil.includes(currentElt);
        });
      if (appareilsFromRecipes === true) {
        return true;
      }
    } else if (type === "ustensile") {
      let ustensilesFromRecipes = arrayRecipes
        .map((ustensil) => {
          return ustensil.ustensils.map((ustensil) => {
            return currentValue(ustensil);
          });
        })
        .some((ustensil) => {
          return ustensil.includes(currentElt);
        });
      if (ustensilesFromRecipes === true) {
        return true;
      }
    }
  }
  if (type === "ingredient") {
    matchingElementsIngredient = uniqueDataList.filter(
      keywordsIsMatchingWithRecipes
    );
    if (matchingElementsIngredient.length === 0) {
      return displayKeywordsLists(uniqueDataList, content);
    }
    return displayKeywordsLists(matchingElementsIngredient, content);
  } else if (type === "appareil") {
    matchingElementsAppareil = uniqueDataList.filter(
      keywordsIsMatchingWithRecipes
    );
    if (matchingElementsAppareil.length === 0) {
      return displayKeywordsLists(uniqueDataList, content);
    }
    return displayKeywordsLists(matchingElementsAppareil, content);
  } else if (type === "ustensile") {
    matchingElementsUstensile = uniqueDataList.filter(
      keywordsIsMatchingWithRecipes
    );
    if (matchingElementsUstensile.length === 0) {
      return displayKeywordsLists(uniqueDataList, content);
    }
    return displayKeywordsLists(matchingElementsUstensile, content);
  }
  // console.log(matchingElements);
  // 2)g. Une fois les bons elments filtrés on les affiche avec un innerHTML;
};
// --- Pour appeller "isUpdatingSecondariesInputsElements" sur les trois type de listes;
function callFunctionToUpdateAllKeywords(
  ListIngredient,
  ListAppareil,
  ListUstensile,
  array
) {
  isUpdatingSecondariesInputsElements(
    ListIngredient,
    ingredientsUl,
    "ingredient",
    array
  );
  isUpdatingSecondariesInputsElements(
    ListAppareil,
    appareilsUl,
    "appareil",
    array
  );
  isUpdatingSecondariesInputsElements(
    ListUstensile,
    ustensilesUl,
    "ustensile",
    array
  );
}
// ---
function lookAtTermsToDisplay(initialArray) {
  if (tagsStock.length != 0) {
    displayRecipes(matchingRecipesArrayWithTags, ulRecipes);
    callFunctionToUpdateAllKeywords(
      uniqueDataIngredients,
      uniqueDataAppareils,
      uniqueDataUstensiles,
      matchingRecipesArrayWithTags
    );
  } else {
    displayRecipes(initialArray, ulRecipes);
    callFunctionToUpdateAllKeywords(
      uniqueDataIngredients,
      uniqueDataAppareils,
      uniqueDataUstensiles,
      initialArray
    );
  }
}
// ---
// TAGS FUNCTIONS
// ---
function chooseTheRightCodeHtml(nbs, value) {
  return `<li class="form__fieldset__bgdTags__li${nbs} liTags">
  <span class="form__fieldset__bgdTags__li__tagName">${value}</span
  ><span
    role="button"
    tabindex="0"
    class="form__fieldset__bgdTags__li__icone"
    ><i class="far fa-times-circle"></i
  ></span>
</li>`;
}
// ---
