let datas;
// ---
let uniqueDataIngredients = [];
let uniqueDataAppareils = [];
let uniqueDataUstensiles = [];
// ---
let tagsStock = [];
let uniqueTagsStock;
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
const IsOpeningTheList = (ulBlock, click) => {
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
// TAGS FUNCTIONS
// ---
function AddTagAndChooseTheRightBgdColor(nbs, value) {
  return `<li class="form__fieldset__bgdTags__li${nbs}">
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
function isDisplayingTags(contentTags, tagsStock) {
  // ---
  uniqueTagsStock = tagsStock.filter((ele, pos) => {
    return tagsStock.indexOf(ele) == pos;
  });
  // ---
  if (uniqueTagsStock.length === 0) {
    contentTags.style.display = "none";
  } else {
    contentTags.style.display = "flex";
    // ---
    contentTags.innerHTML = uniqueTagsStock
      .map(
        (tag) => {
          let isAnAppareil = uniqueDataAppareils.includes(tag);
          let isAnUstensile = uniqueDataUstensiles.includes(tag);
          if (isAnAppareil === true) {
            return AddTagAndChooseTheRightBgdColor(2, tag);
          } else if (isAnUstensile === true) {
            return AddTagAndChooseTheRightBgdColor(3, tag);
          } else {
            return AddTagAndChooseTheRightBgdColor(1, tag);
          }
        }
        //     `<li class="form__fieldset__bgdTags__li${mapNumber}">
        //   <span class="form__fieldset__bgdTags__li__tagName">${tag}</span
        //   ><span
        //     role="button"
        //     tabindex="0"
        //     class="form__fieldset__bgdTags__li__icone"
        //     ><i class="far fa-times-circle"></i
        //   ></span>
        // </li>`
      )
      .join("");
  }
}
// ---
function isAddingATag(e, content) {
  let originalText = e.target.innerText;
  let value = currentValue(e.target.innerText);
  let stockage = {};
  // 1) On veut récupérer a chaque fois la bonne liste aveec les bons mots clefs;
  let currentList = [];
  for (let i = 0; i < content.children.length; i++) {
    let value = currentValue(content.children[i].innerText);
    currentList.push(value);
  }
  // ---
  stockage["keyW"] = value;
  // ---

  if (currentList.includes(stockage.keyW) === true) {
    tagsStock.push(originalText);
    isDisplayingTags(tagsUL, tagsStock);
  }
}
// ---
function isChoosingAnUlContent(content) {
  content.addEventListener("click", (e) => {
    isAddingATag(e, content);
  });
}
