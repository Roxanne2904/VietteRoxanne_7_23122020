let datas;
// ---
// Pour créer "myMap"
let stockDatasToMap = [];
let stockWords = [];
// let RecipesMatchWithNames = [];
let RecipesMatchWithfullWord = [];
let matchingRecipesArrayWithTags;
// ---
let myMap;
// ---
let value;
let valueNotUniqueCharacter;
let currentMainValue;
let valueMatch;
// ---
// Pour le main input: "is valid" respect la condition des 3 caractères min;
let isValid;
// ---
// La liste des elements sans doublons;
let uniqueDataIngredients = [];
let uniqueDataAppareils = [];
let uniqueDataUstensiles = [];
// ---
// Recipes
let matchingRecipesArray = []; // Les recettes qui matchent avec le main input;
let matchingRecipesArrayTags = []; // Les recettes qui matchent avec les tags;
// Elements des listes
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
const btnSub = document.querySelector(".form__fieldset__bgdMain__submitMain");
const form = document.querySelector("#myform");
const ulRecipes = document.querySelector(".bgdRecipes");
// ----------------------------------------
function updateTheSearch(value) {
  if (value.length === 0) {
    displayRecipes(datas.recipes, ulRecipes);
    displayKeywordsLists(uniqueDataIngredients, ingredientsUl);
    displayKeywordsLists(uniqueDataAppareils, appareilsUl);
    displayKeywordsLists(uniqueDataUstensiles, ustensilesUl);
  }
}

// ---
function modifyValue(value) {
  if (value[value.length - 1] === "s") {
    value = value.substring(0, value.length - 1);
  }
  //
  if (value[value.length - 1] === "x") {
    value = value.substring(0, value.length - 1);
  }
  //
  value = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  value = value
    .split("")
    .filter((ele, pos, array) => {
      return array.indexOf(ele) === pos;
    })
    .join("")
    .toString();
  return value;
} //Unique character
// ---
function modifyValueNotUniqueCharacter(value) {
  if (value[value.length - 1] === "s") {
    value = value.substring(0, value.length - 1);
  }
  //
  if (value[value.length - 1] === "x") {
    value = value.substring(0, value.length - 1);
  }
  //
  if (
    value === "casserol" ||
    value === "casserolle" ||
    value === "caserol" ||
    value === "casseroll"
  ) {
    return "casserole";
  }
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}
// ---
function cleanEltFromTxtDescription(elt) {
  if (elt[elt.length - 1] === "." || elt[elt.length - 1] === ",") {
    elt = elt.substring(0, elt.length - 1);
  }

  if (elt[elt.length - 1] === ")") {
    elt = elt.substring(0, elt.length - 1);
  }
  if (elt[0] === "(") {
    elt = elt.substring(1);
  }
  if (elt[0] === "d" && elt[1] === "'") {
    elt = elt.substring(2);
  }
  if (elt[0] === "l" && elt[1] === "'") {
    elt = elt.substring(2);
  }
  if (elt[0] === "n" && elt[1] === "'") {
    elt = elt.substring(2);
  }
  return elt;
} //pour éviter le ")", les points "." etc... sur un mot découper dans un texte descriptif;
// ---
function removeSpaceWordsAndModifyValue(value) {
  value = value
    .split(" ")
    .map((elt) => {
      elt = modifyValueNotUniqueCharacter(elt);
      elt = cleanEltFromTxtDescription(elt);
      return (elt = elt.toString());
    })
    .join("");
  if (value === "casserol" || value === "casserolle" || value === "caserol") {
    return "casserole";
  }
  return modifyValue(value);
} // pour supprimer les espace entre les mots (avec les titres par exemples)

function removeSpaceWords(value) {
  value = value
    .split(" ")
    .map((elt) => {
      elt = modifyValueNotUniqueCharacter(elt);
      elt = cleanEltFromTxtDescription(elt);
      return (elt = elt.toString());
    })
    .join("");
  if (value === "casserol" || value === "casserolle" || value === "caserol") {
    return "casserole";
  }

  return value;
} // pour supprimer les espace entre les mots (avec les titres par exemples)
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
      label.innerHTML = '<i class="fas fa-chevron-up"></i>';
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
    label.innerHTML = '<i class="fas fa-chevron-up"></i>';
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
// event onclick sur les inputs secondaires;
const islaunchingOnclickEventToInputs = (icone, ulBlock, click) => {
  //liBlock
  icone.addEventListener("click", () => {
    openTheList(ulBlock, click); //liBlock);
  });
};
// ---
// islaunchingOnclickEventToInputs(iconeIngredient, ingredientsUl, true);
//   islaunchingOnclickEventToInputs(iconeAppareil, appareilsUl, true); //appareilsLi);
//   islaunchingOnclickEventToInputs(iconeUstensiles, ustensilesUl, true); //ustensilesLi);
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
    let currentElt = modifyValue(elt);
    // ---
    if (type === "ingredient") {
      let ingredientFromRecipes = arrayRecipes
        .map((ingredient) => {
          return ingredient.ingredients.map((ingredient) => {
            return modifyValue(ingredient.ingredient);
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
          return modifyValue(appareil.appliance);
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
            return modifyValue(ustensil);
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
  // console.log(tagsStock.length);
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
function filterRecipesWithTags(obj) {
  return tagsStock.every((ele) => {
    if (ele.type === "ingredient") {
      valueMatch = obj.ingredients.map((ingredient) =>
        removeSpaceWords(ingredient.ingredient)
      );
      if (valueMatch.includes(ele.keyW)) {
        return true;
      }
    } else if (ele.type === "appareil") {
      valueMatch = removeSpaceWords(obj.appliance);
      if (valueMatch.includes(ele.keyW) === true) {
        return true;
      }
    } else if (ele.type === "ustensile") {
      valueMatch = obj.ustensils.map((ustensil) => removeSpaceWords(ustensil));
      if (valueMatch.includes(ele.keyW) === true) {
        return true;
      }
    }
  });
}
// ---
function chooseGeneralsTermsToDisplay(mainValue, filterRecipesWithTags) {
  if (currentMainValue === "" && tagsStock.length === 0) {
    // console.log("il aucune valeur");
    matchingRecipesArrayWithTags = datas.recipes.filter(filterRecipesWithTags);
    // conditions d'affichages
    lookAtTermsToDisplay(datas.recipes);
  } else if (mainValue != "" && isValid === true) {
    // console.log("il y a une valeur dans le main input");
    matchingRecipesArrayWithTags = matchingRecipesArray.filter(
      filterRecipesWithTags
    );
    // conditions d'affichages
    lookAtTermsToDisplay(matchingRecipesArray);
  } else {
    // console.log("il n'y a PAS de valeur dans le main input");
    matchingRecipesArrayWithTags = datas.recipes.filter(filterRecipesWithTags);
    // conditions d'affichages
    lookAtTermsToDisplay(datas.recipes);
  }
}
// ---

// code pour mettre en place la map, du test jsben.ch;
let test = {
  recipes: [
    {
      name: "limonade de coco",
      description:
        "Commencer par préparer les ingrédients.Coupez la coco, puis mixer",
    },
    {
      name: "Poulet au curry",
      description:
        "Coupez le poulet, puis préparer le riz. Faites cuire le tout dans une cocotte",
    },
    {
      name: "Boulettes de viande épicé",
      description: "Façonnez les boulettes de viandes, puis faites les cuires",
    },
    {
      name: "Riz au lait",
      description:
        "Mettez le riz à cuire dans l'eau, puis ensuite, faire le cuire dans le lait",
    },
    {
      name: "Purée de pomme de terre douce",
      description: "Epluchez les pommes de terre, puis écraser les",
    },
    {
      name: "Soupe de poulet",
      description: "Coupez le poulet et faites le cuire",
    },
  ],
};
let stock01 = [];
let stock02 = [];
let stock03 = [];
let mapEx;
// ---
test.recipes.forEach((elt) => {
  let name = elt.name.split(" ");
  let description = elt.description.split(" ");
  let title = [elt.name];
  // ---
  name.forEach((elt) => {
    let fullTxt = modifyValueNotUniqueCharacter(elt);
    fullTxt = cleanEltFromTxtDescription(fullTxt);
    elt = removeSpaceWordsAndModifyValue(elt);
    if (elt.length >= 2) {
      return stock01.push([elt, fullTxt]);
    }
  });
  // ---
  description.forEach((elt) => {
    let fullTxt = modifyValueNotUniqueCharacter(elt);
    fullTxt = cleanEltFromTxtDescription(fullTxt);
    elt = modifyValue(elt);
    elt = cleanEltFromTxtDescription(elt);
    // console.log(elt);
    if (elt.length >= 2) {
      return stock01.push([elt, fullTxt]);
    }
  });
  // ---
  title.forEach((elt) => {
    name = name
      .map((elt) => {
        elt = modifyValueNotUniqueCharacter(elt);
        elt = cleanEltFromTxtDescription(elt);

        return (elt = elt.toString());
      })
      .join("");
    name = modifyValue(name);
    let fullTxt = modifyValueNotUniqueCharacter(elt);
    fullTxt = cleanEltFromTxtDescription(fullTxt);
    return stock01.push([name, fullTxt]);
  });
});
// ---
// On filtre pour éviter les doublons;
// ---
stock01 = stock01
  .filter((obj, index, array) => {
    return array.findIndex((t) => t[0] === obj[0]) === index;
  })
  .sort();
// ---
// console.log(stock01);
stock01.map((ele) => {
  let fullWord = modifyValueNotUniqueCharacter(ele[1]);
  ele = ele[0];
  stock02 = test.recipes.filter((obj) => {
    let title = removeSpaceWordsAndModifyValue(obj.name);
    let name;
    name = obj.name.split(" ").map((ele) => {
      return removeSpaceWordsAndModifyValue(ele);
    });
    // console.log(name);
    let description = modifyValueNotUniqueCharacter(obj.description);
    // ---
    if (
      title.includes(ele) ||
      description.includes(fullWord) ||
      name.includes(ele)
    ) {
      return true;
    }
  });
  stock03.push([ele, stock02]);
});
// ---
mapEx = new Map(stock03);
